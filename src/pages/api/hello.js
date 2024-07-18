import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Data yang akan dimasukkan secara langsung
  const data = {
    email: 'rizwarbyan123@gmail.com',
    password: 'byandanshufi321',
    name: 'rizwar',
    role_id: '1',
    login_type: 'Default'
  };

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create the new user
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role_id: data.role_id,
      login_type: data.login_type
    },
  });

  res.status(201).json({message: 'sukses'});
}
