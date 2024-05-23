import { defineStore } from 'pinia'

export const globalStore = defineStore(
  'globalStore',
  {
    state: () => {
      return {
        activePage: '2'
      }
    },
    actions: {
      changePage(value: string) {
        this.activePage = value
      }
    }
  })
