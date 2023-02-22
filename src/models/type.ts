import {IBrand} from './brand';

export interface IType {
  id: number;
  name: string;
  childBrands: IBrand[];
}