import { HttpClient } from '@actions/http-client';

const client = new HttpClient('dlercloud-checkin-action')

export const API = {
  Login: async function (email: string, passwd: string) {
    const { result } = await client.postJson<DlerCloud.Response<DlerCloud.LoginResponse>>('https://dler.cloud/api/v1/login', {
      email, passwd
    })
    return result?.data
  },
  Logout: async function (access_token: string) {
    await client.postJson<DlerCloud.Response<any>>('https://dler.cloud/api/v1/logout', {
      access_token
    })
  },
  Checkin: async function (access_token: string, multiple?: number) {
    const { result } = await client.postJson<DlerCloud.Response<DlerCloud.CheckinResponse>>('https://dler.cloud/api/v1/checkin', {
      access_token, multiple
    })
    return result?.data
  }
}
