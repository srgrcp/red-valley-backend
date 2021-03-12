export enum ApiError {
    incompleteSignupData = 'incompleteSignupData',
    serverError = 'serverError'
}

export type ApiResponse = {
    error: ApiError | undefined | null
    data: any
}
