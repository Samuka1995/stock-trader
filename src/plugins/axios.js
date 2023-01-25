import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://stocks-trader-474f7-default-rtdb.firebaseio.com/'
        })
    }
})