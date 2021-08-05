import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

import createMultiTabState from 'vuex-multi-tab-state'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

// needs the __"allowJs": true__ flag in tsconfig.json to work
// TODO: properly type the Vuex modules...
import app from './modules/app.js'
import data from './modules/data.js'

var ls = new SecureLS({ isCompression: false })

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  modules: {
    app,
    data
  },
  // plugins: [
  //   createMultiTabState({
  //     key: 'rc-tabs',
  //     statesPaths: ['explore', 'list', 'tools', 'user.userOptions', 'user.currentUser'], // name/s of the states to be synchronized with dot notation. If the param is not provided, the whole state of your app will be in sync. Defaults to []
  //   }),
  //   createPersistedState({
  //     key: 'rc',
  //     paths: ['user.GoTrueAuth'],
  //     storage: {
  //       getItem: (key) => ls.get(key),
  //       setItem: (key, value) => ls.set(key, value),
  //       removeItem: (key) => ls.remove(key),
  //     },
  //   }),
  // ],
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}
