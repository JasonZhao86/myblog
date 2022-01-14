import React from 'react'
import { observer } from 'mobx-react'
import { inject } from '../utils'
import PostService from '../service/pub'
import { Card, message } from 'antd'

import "antd/lib/card/style"
import "antd/lib/message/style"


let service = new PostService()

@inject({service})
@observer
export default class Post extends React.Component {
    constructor(props) {
        super(props)
        let { id=-1 }= props.match.params
        props.service.getpost(id)
    }

    render() {
        let s = this.props.service
        if (s.msg) {
            message.error(
                s.msg,
                3,
                () => setTimeout(() => s.msg = "", 1000)
            )
        }

        let post = s.post
        if (post.title) {
            return <Card title={post.title} bordered={false} style={{ width: 600 }}>
                <p>作者：{post.author}</p>
                <p>发布时间：{new Date(post.postdate * 1000).toLocaleDateString()}</p>
                <p>{post.content}</p>
            </Card>
        } else return <div></div>
    }
}