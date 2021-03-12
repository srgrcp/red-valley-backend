import { ApiError, ApiResponse } from "./types";

export const newResponse = (data: any, error?: ApiError | null): ApiResponse => {
    return { data, error }
}