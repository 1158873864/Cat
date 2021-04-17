import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: `/login?username=${username}&password=${password}`,
    method: 'POST'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'POST'
  })
}

export function getAppId() {
  return request({
    url: '/user/appid',
    method: 'GET'
  })
}

export function bindAppId(appId) {
  return request({
    url: `/user/appid?appid=${appId}`,
    method: 'POST'
  })
}

export function unbindAppId(appId) {
  return request({
    url: `/user/appid?appid=${appId}`,
    method: 'DELETE'
  })
}
