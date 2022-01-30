import { getInput, setFailed, notice, startGroup, endGroup } from '@actions/core';
import { API } from './api';

async function run() {
  try {
    const email = getInput('email') || ''
    const password = getInput('password') || ''
    let token = getInput('token') || ''
    if (!token && !email && !password) {
      setFailed('You must provide either a token or email and password')
    }

    const multiple = Math.max(Math.min(+getInput('multiple') ?? 50, 50), 1)

    if (!token) {
      startGroup('Login')
      const loginData = await API.Login(email, password)
      if (!loginData) {
        throw setFailed('Login failed')
      }
      token = loginData.token
      endGroup()
    }

    const checkinData = await API.Checkin(token, multiple)
    if (!checkinData) {
      throw setFailed('Checkin failed')
    }
    notice(checkinData.checkin)
  } catch (e) {
    const error = e as Error;
    setFailed(error);
  }
}

run();