import { PrismaClient } from "@prisma/client";

//prisma client
export const prisma = new PrismaClient();

//api url
export const API_URL = "http://localhost:3000/api"

//execute code api
export const EXECUTE_CODE_API = "https://emkc.org/api/v2/piston"

//company
export const COMPANY_NAME = "Study With Rizwar"