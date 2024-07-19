import { PrismaClient } from "@prisma/client";

//prisma client
export const prisma = new PrismaClient();

export const API_URL = "http://localhost:3000/api"

//company
export const COMPANY_NAME = "Study With Rizwar"