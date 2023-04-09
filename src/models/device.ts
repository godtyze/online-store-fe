export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
  stock: number;
  info?: DeviceInfo[];
}

export interface DeviceInfo {
  title: string;
  description: string;
  deviceId?: number;
}

export interface GetDevicesRequest {
  brandId: number;
  typeId: number;
  query: string;
  limit: number;
  page: number;
}

export interface GetDevicesResponse {
  count: number;
  rows: IDevice[];
}

export interface UpdateDeviceRequest {
  info: DeviceInfo[],
  name: string;
  price: string;
  deviceId: number;
}