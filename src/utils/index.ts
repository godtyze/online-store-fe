import {CLIENT_ROUTES} from '@/config';
import {LocationState} from '@/models';

interface ApiErrorResponse {
  status: number | string;
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
  if (!error) return null;
  return isApiError(error) ? error.data.message : 'Что-то пошло не так, попробуйте еще раз.'
}

export function getPath(state: LocationState): string {
  return state ? state.from : CLIENT_ROUTES.main;
}