import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'antd'

import { inject, parse_qs } from '../utils'
import PostService from '../service/pub'
import { observer } from  'mobx-react'

import 'antd/lib/list/style'

const service = new PostService()

@inject({service})
@observer
export default class L extends React.Component {
    constructor(props) {
        super(props)
        let search = (! props.location.search) ? "?page=1&size=3" : props.location.search;
        props.service.list(search)
    }

    handleChange(page, pageSize) {
        let search = "?page=" + page + "&size=" + pageSize
        this.props.service.list(search) 
    }

    get_url(current) {
        let obj = parse_qs(this.props.location.search)
        let {size=3} = obj
        return "/list?page=" + current + "&size=" + size
    }

    itemRender(current, type, originalElement) {
        if (current === 0) return originalElement

        if (type === 'page') {
            return <Link to={this.get_url(current)}>{current}</Link>
        }

        if (type === 'prev') {
            return <Link to={this.get_url(current)} className='ant-pagination-item-link'></Link>
        }

        if (type === 'next'){
            return <Link to={this.get_url(current)} className='ant-pagination-item-link'></Link>
        }
        return originalElement
    }

    render() {
        let data = this.props.service.posts
        let pagination = this.props.service.pagination
        if (data.length) {
            return <List 
                bordered={false}
                dataSource={data}
                renderItem={item => <List.Item>
                    {/* <Link to={"/post/" + item.post_id}>{item.post_title}</Link> */}
                    <List.Item.Meta title={<Link to={"/post/" + item.post_id}>
                            {item.post_title}
                        </Link>}
                    />
                </List.Item>}
                pagination={{
                    current: pagination.page,
                    pageSize: pagination.size,
                    total: pagination.count,
                    onChange: this.handleChange.bind(this),
                    itemRender: this.itemRender.bind(this)
                }}
            />
        } else {
            return <div></div>
        }
    }
}