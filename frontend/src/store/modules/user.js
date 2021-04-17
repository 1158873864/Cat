import { bindAppId, getAppId, login, logout, unbindAppId } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    appId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_APPID: (state, appId) => {
    state.appId = appId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password).then(response => {
        commit('SET_NAME', response.data.name)
        // 暂时用username当作前端token
        commit('SET_TOKEN', username)
        setToken(username)
        // 存AppID
        getAppId().then(appId => {
          commit('SET_APPID', appId)
        })
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // bind AppId
  bindAppId({ commit }, appId) {
    return new Promise((resolve, reject) => {
      bindAppId(appId).then(() => {
        commit('SET_APPID', appId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // bind AppId
  unbindAppId({ commit }, appId) {
    return new Promise((resolve, reject) => {
      unbindAppId(appId).then(() => {
        commit('SET_APPID', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

