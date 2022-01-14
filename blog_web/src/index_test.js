import { observer } from 'mobx-react';
import { observable } from 'mobx';
import React from 'react';
import ReactDom from 'react-dom';


class Service {
    @observable ret = -100
    ret = null
    handle() {
        console.log("pending");
        new Promise(
            (resolve, reject) => {
                setTimeout(() => resolve('ok'), 5000);
            }
        ).then(
            value => this.ret = Math.random() * 1000
        )
    }
}


@observer
class Root extends React.Component {
    // state = {ret: null};

    handleClick(event) {
        //异步不能直接使用返回值
        this.props.service.handle();    
    }

    render() {
        console.log("*******************");
        return (
            <div>
                <button onClick={this.handleClick.bind(this)}>触发handleClick函数</button>
                <br />
                <span style={{color: 'red'}}>{new Date().getTime()} Service的handle函数返回值是：{this.props.service.ret}</span>
            </div>
        );
    }
}


ReactDom.render(<Root service={new Service()}/>, document.getElementById("root"));