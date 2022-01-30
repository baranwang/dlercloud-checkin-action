declare namespace DlerCloud {
  interface Response<T> {
    ret: number,
    msg: string
    data: T;
  }

  interface LoginResponse {
    token: string
    id: number
    plan: string
    plan_time: string
    money: string
    aff_money: string
    today_used: string
    used: string
    unused: string
    traffic: string
    integral: string
  }

  interface CheckinResponse {
    checkin: string
    today_used: string
    used: string
    unused: string
    traffic: string
  }
}