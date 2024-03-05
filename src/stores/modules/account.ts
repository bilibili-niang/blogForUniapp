import {defineStore} from 'pinia'

export const account = defineStore(
    'accountStore',
    {
        state: () => {
            return {
                account: {
                    name: 'userName',
                    age: 10
                }
            }
        },
        actions: {
            login(account: Object) {
                console.log(account)
            },
            setAccountInfo() {
            }
        }
    })
