import fetch from 'node-fetch';
import { setFailed } from '@actions/core';

async function http<T = any>(url: string, body?: any) {
  const { ret, msg, data } = await fetch(new URL(url, 'https://dler.cloud/').toString(), {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => res.json() as Promise<DlerCloud.Response<T>>);
  if (ret === 200) {
    return data;
  }
  throw setFailed(msg);
}

export const API = {
  Login: async function (email: string, passwd: string) {
    return await http<DlerCloud.LoginResponse>('/api/login', { email, passwd });
  },
  Logout: async function (access_token: string) {
    return await http('/api/logout', { access_token })
  },
  Checkin: async function (access_token: string, multiple?: number) {
    return await http<DlerCloud.CheckinResponse>('/api/checkin', { access_token, multiple });
  }
}
