//Configuration for axios
import axios from "axios";

//Response by TypeORM default
export interface ResponseTypeORM {
  generatedMaps?: Array<any>;
  affected: number;
  raw: Array<any>;
}

//Configuration for axios
export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
});
