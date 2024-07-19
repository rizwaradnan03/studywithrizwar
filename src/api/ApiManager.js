import { API_URL } from "@/config";
import axios from "axios";

export const ApiManager = axios.create({
    baseURL: API_URL,
    responseType: 'json'
})