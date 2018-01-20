import * as React from 'react';

interface BundleProps {
    load: any
    children: any
};

class Bundle extends React.Component<BundleProps> {
    state = {
      // short for "module" but that's a keyword in js, so "mod"
      // "module" 的简称，但这是在JS的关键字，所以写成 "mod"
      mod: null
    }
  
    componentWillMount() {
        this.load(this.props)
    }
  
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
  
    load(props) {
        this.setState({
            mod: null
        })

        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                // 兼容的写法 
                // import('./something')
                // import loadSomething from 'bundle-loader?lazy!./Something'
                mod: mod.default ? mod.default : mod
            })
        })
    }
  
    render() {
        return this.props.children(this.state.mod)
    }
}
  
export default Bundle
