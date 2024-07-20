import { API_URL, EXECUTE_CODE_API } from "@/config";
import axios from "axios";

export const ApiManager = axios.create({
    baseURL: API_URL,
    responseType: 'json',
})

export const ApiExecuteCode = axios.create({
    baseURL: EXECUTE_CODE_API,
    responseType: 'json',
})