import axios from 'axios'
import { observable } from 'mobx'
import store from 'store'


export default class PostService {
    constructor() {
        this.axios = axios.create({
            "baseURL": "/api/post"
        })
    }

    @observable msg = ""
    @observable posts = []
    @observable pagination = {page: 1, size: 20, pages: 0, count: 0}
    @observable post = {}

    getJWT() {
        return store.get("token", null)
    }

    pub(title, content) {
        this.axios.post(
            "pub/",
            {title, content},
            {headers: {'jwt': this.getJWT()}}
        ).then(
            response => {
                console.log(response.data)
                console.log(response.status)
                this.msg = "文章发布成功"
            }
        ).catch(
            error => {
                console.log(error)
                this.msg = "文章发布失败"
            }
        )
    }

    list(search){
        console.log(search)
        this.axios.get(search).then(
            response => {
                console.log(response.data)
                console.log(response.status)
                this.posts = response.data.posts
                this.pagination = response.data.pagination
            }
        ).catch(
            error => {
                console.log(error)
                this.msg = "文章列表获取失败"
            }
        )
    }

    getpost(id) {
        // 因为后端路径末尾匹配有斜线，所以这里必须加上斜线，否则后端会返回404
        this.axios.get(id + "/").then(
            response => {
                console.log(response.data)
                console.log(response.status)
                this.post = response.data.post
            }
        ).catch(
            error => {
                // console.log(error)
                this.msg = "文章详情获取失败"
            }
        )
    }
}