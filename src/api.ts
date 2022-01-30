import fetch from 'node-fetch';
import { info } from '@actions/core';

async function request<T = any>(url: string, params?: any) {
  const body = JSON.stringify(params);
  info(`[request] ${url} ${body}`);
  const { ret, msg, data } = await fetch(
    new URL(url, 'https://dler.cloud/').toString(),
    {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  ).then((res) => res.json() as Promise<DlerCloud.Response<T>>);
  if (ret === 200) {
    return data;
  }
  throw Error(msg);
}

export const API = {
  Login: async function (email: string, passwd: string) {
    return await request<DlerCloud.LoginResponse>('/api/v1/login', {
      email,
      passwd,
    });
  },
  Logout: async function (access_token: string) {
    return await request<void>('/api/v1/logout', { access_token });
  },
  Checkin: async function (access_token: string, multiple?: number) {
    return await request<DlerCloud.CheckinResponse>('/api/v1/checkin', {
      access_token,
      multiple,
    });
  },
};
