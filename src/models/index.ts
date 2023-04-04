import {CLIENT_ROUTES} from '@/config';
import React from 'react';

export type LocationState = { from: CLIENT_ROUTES } | null;

export interface SelectOptions {
  key: string;
  label: React.ReactNode | string;
  value: string;
}