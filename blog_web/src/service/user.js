import axios from 'axios'
import store from 'store'
import { observable } from "mobx"

store.addPlugin(require("store/plugins/expire"))

export default class UserService {
    @observable loggedin = false
    @observable errMsg = ""

    login(email, password) {
        console.log(email, password)
        axios.post(
            "/api/user/login/",
            {"email": email, "password": password}
        ).then(
            function(response) {
                console.log(response.data)
                console.log(response.status)
                store.set("token", response.data.token, (new Date()).getTime() + (8 * 3600));
                this.loggedin = true
            }.bind(this)
        ).catch(
            function(error) {
                this.errMsg = "登录失败"
                // console.log(error);
            }.bind(this)
        )
    }

    reg(name, email, password) {
        console.log(name, email);
        axios.post(
            "/api/user/reg/",
            {name: name, email: email, password: password}
        ).then(
            response => {
                console.log(response.data)
                console.log(response.status)
                store.set("token", response.data.user, (new Date()).getTime() + (8 * 3600 * 1000))
                this.loggedin = true
            }
        ).catch(
            error => {
                this.errMsg = "注册失败"
                // console.log(error)
            }
        )
    }
}