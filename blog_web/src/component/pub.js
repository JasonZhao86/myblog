import { observer } from 'mobx-react'
import { Form, Input, Button, message } from 'antd'
import React from 'react'

import PostService from '../service/pub'
import { inject } from '../utils'

import 'antd/lib/form/style'
import 'antd/lib/input/style'
import 'antd/lib/button/style'
import 'antd/lib/message/style'


const FormItem = Form.Item
const {TextArea} = Input
const service = new PostService()


@inject({service})
@observer
export default class Pub extends React.Component {
    handleSubmit(event) {
        event.preventDefault()
        let fm = event.target
        if (fm[0].value && fm[1].value) {
            this.props.service.pub(fm[0].value, fm[1].value)
        } else {
            message.error("标题和内容不能为空")
        }
    }

    render() {
        if (this.props.service.msg) {
            message.info(
                this.props.service.msg,
                3,
                () => setTimeout(() => this.props.service.msg = "", 1000)
            )
        }

        return <Form layout='vertical' onSubmit={this.handleSubmit.bind(this)}>
            <FormItem label="标题" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                <Input placeholder="标题" />
            </FormItem>
            <FormItem label="内容" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                <TextArea rows={15} />
            </FormItem>
            <FormItem wrapperCol={{ span: 18, offset: 4}}>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        </Form>
    }
}