// 每个仓库必须暴露出state，mutations，actions

export const state = () => {
    return {
        userInfo: {
            token: "",
            user: {}
        }
    }
}

// 修改state中的数据
export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data
    },
    clearInfo(state) {
        state.userInfo.token=''
        state.userInfo.user={}

    }
}

// 异步修改仓库的数据
export const actions = {
    // 处理登录的方法，actions的第一个参数是store对象，第二个参数是传入的参数
    login(store, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: data
        })
            .then(res => {
                console.log(store);
                store.commit('setUserInfo', res.data)

            })
    }
}