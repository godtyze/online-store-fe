interface ApiErrorResponse {
  status: number;
  data: {
    message: string;
  }
}

export function isApiError(error: unknown): error is ApiErrorResponse {
  return typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string';
}

export function getErrorMessage(error: unknown): string | null {
  return isApiError(error) ? error.data.message : null;
}