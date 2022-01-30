import {
  getInput,
  setFailed,
  startGroup,
  endGroup,
  info,
  setSecret,
  setOutput,
} from '@actions/core';
import { API } from './api';

async function run() {
  const email = getInput('email') || '';
  const password = getInput('password') || '';
  let token = getInput('token') || '';
  const multiple = Math.max(Math.min(+getInput('multiple') ?? 50, 50), 1);

  try {
    if (!token && !email && !password) {
      throw Error(
        '必须提供 DlerCloud 的 Token 或登录 DlerCloud 的电子邮件和密码'
      );
    }

    if (!token) {
      startGroup('登录');
      const user = await API.Login(email, password);
      token = user.token;
      setSecret(token);
      info(`登录成功, Token: ${token}`);
      info(`套餐: ${user.plan}`);
      info(`到期时间: ${user.plan_time}`);
      info(`已用流量: ${user.used}`);
      info(`剩余流量: ${user.unused}`);
      endGroup();
    } else {
      setSecret(token);
    }

    startGroup('签到');
    const log = await API.Checkin(token, multiple);
    info(log.checkin);
    info(`剩余流量: ${log.unused}`);
    Object.keys(log).forEach((key) => {
      setOutput(key, log[key]);
    })
    endGroup();
  } catch (e) {
    const error = e as Error;
    setFailed(error.message);
  }

  try {
    if (!getInput('token')) {
      startGroup('注销 Token');
      await API.Logout(token);
      info('Token 注销成功');
      endGroup();
    }
  } catch (e) {
    const error = e as Error;
    setFailed(error.message);
  }
}

run();
