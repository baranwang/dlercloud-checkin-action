import { getInput, setFailed, notice, startGroup, endGroup, info, setSecret } from '@actions/core';
import { API } from './api';

async function run() {
  try {
    const email = getInput('email') || ''
    const password = getInput('password') || ''
    let token = getInput('token') || ''
    if (!token && !email && !password) {
      setFailed('必须提供 DlerCloud 的 Token 或登录 DlerCloud 的电子邮件和密码')
    }

    const multiple = Math.max(Math.min(+getInput('multiple') ?? 50, 50), 1)

    if (!token) {
      startGroup('登录')
      const loginData = await API.Login(email, password)
      if (!loginData) {
        throw setFailed('登录失败')
      }
      token = loginData.token
      setSecret(token)
      info(`登录成功, Token: ${token}`)
      info(`套餐: ${loginData.plan}`)
      info(`到期时间: ${loginData.plan_time}`)
      info(`已用流量: ${loginData.used}`)
      info(`剩余流量: ${loginData.unused}`)
      endGroup()
    }

    startGroup('签到')
    const checkinData = await API.Checkin(token, multiple)
    if (!checkinData) {
      throw setFailed('签到失败')
    }
    notice(checkinData.checkin)
    info(`剩余流量: ${checkinData.unused}`)
    endGroup()
  } catch (e) {
    const error = e as Error;
    setFailed(error);
  }
}

run();