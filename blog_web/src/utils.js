import React from 'react'

// 下面是装饰器的演变过程
/*
class Reg extends React.Component {
    render() {
        return <_Reg service={service} />;
    }
}

const Reg = class extends React.Component {
    render() {
        return <_Reg service={service} />;
    }
}

function inject(Comp) {
    return class extends React.Component {
        render() {
            return <Comp service={service} />;
        } 
    }
}

function inject(service, Comp) {
    return class extends React.Component {
        render() {
            return <Comp service={service} />;
        } 
    }
}

function inject(obj, Comp) {
    return class extends React.Component {
        render() {
            return <Comp {...obj} />;
        } 
    }
}

function inject(obj) {
    function wrapper(Comp) {
        return class extends React.Component {
            render() {
                return <Comp {...obj} />;
            } 
        }
    }
    return wrapper
}


function inject(obj) {
    return Comp => {
        return class extends React.Component {
            render() {
                return <Comp {...obj} />;
            } 
        }
    }
}


const inject = obj => {
    return Comp => {
        return class extends React.Component {
            render() {
                return <Comp {...obj} />;
            } 
        }
    }
}


const inject = obj => Comp => {
        return class extends React.Component {
            render() {
                return <Comp {...obj} />;
            } 
        }
    }


const inject = obj => Comp => {
    return (props) => <Comp {...obj} />
}


const inject = obj => Comp => props => <Comp {...obj} />
*/


const inject = obj => Comp => props => <Comp {...obj} {...props} />;

// let url = "?id=5&page=1&size=20&id=&age=20&name=abc&name=汤姆=&测试=1"
function parse_qs(qs, re=/(\w+)=([^&]+)/) {
    let obj = {}
    if (qs.startsWith("?")) qs = qs.substr(1)
    qs.split("&").forEach(element => {
        let match = re.exec(element);
        // console.log(match)
        if (match) obj[match[1]] = match[2]
    })
    return obj
}

export { inject, parse_qs };
