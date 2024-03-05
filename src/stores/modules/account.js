import { defineStore } from 'pinia';
export const account = defineStore('accountStore', {
    state: () => {
        return {
            account: {
                name: 'userName',
                age: 10
            }
        };
    },
    actions: {
        login(account) {
            console.log(account);
        },
        setAccountInfo() {
        }
    }
});
//# sourceMappingURL=account.js.map