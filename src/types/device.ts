export type IDevice = {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
}

export type DeviceInfo = {
  title: string;
  description: string;
  deviceId?: number;
}

export type GetDevicesRequest = {
  brandId: number;
  typeId: number;
  query: string;
  limit: number;
  page: number;
}

export type UpdateDeviceRequest = {
  info: DeviceInfo[],
  name: string;
  price: string;
  deviceId: number;
}