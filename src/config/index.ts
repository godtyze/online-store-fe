export const BASE_API_URL = 'http://localhost:7000/api';

export const enum API_ROUTES {
  user = '/user',
  type = '/type',
  brand = '/brand',
  device = '/device'
}

export const enum CLIENT_ROUTES {
  main = '/',
  registration = 'registration',
  login = 'login',
  device = 'device/:id',
  profile = 'profile',
  cart = 'cart',
  notFound = '*'
}