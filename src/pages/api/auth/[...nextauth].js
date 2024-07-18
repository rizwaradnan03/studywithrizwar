import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
  secret: process.env.SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: { email },
          include: {
            role: true,
          },
        });

        if (!user) {
          throw new Error("No user found with the given email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        const roleAccessPath = await prisma.role_access_path.findMany({
          where: {
            role_id: user.role.id,
          },
        });

        return {
          email: user.email,
          name: user.name,
          role: user.role.name,
          role_access_paths: roleAccessPath,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log({ token, user, account, profile });
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.role_access_paths = user.role_access_paths;
      }

      // Handle Google Provider
      if (account?.provider === "google") {
        let userFromDB = await prisma.user.findUnique({
          where: { email: token.email },
          include: { role: true },
        });

        if (!userFromDB) {
          // Create new user if not found
          userFromDB = await prisma.user.create({
            data: {
              email: token.email,
              name: token.name,
              login_type: "Google",
              role_id: "2",
            },
          });
        }

        const roleAccessPath = await prisma.role_access_path.findMany({
          where: { role_id: "2" },
        });

        token.id = userFromDB.id;
        token.name = userFromDB.name;
        token.role = userFromDB.role.name;
        token.role_access_paths = roleAccessPath;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.role_access_paths = token.role_access_paths;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('url', url)
      console.log('base url', baseUrl)
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
