import React, {Component} from 'react';
import { connect } from 'react-redux';

class PCside extends Component {
    constructor (props, context) {
        super(props, context);
    }
    render() {
        return <div>
            <h1 onClick={function(){
                console.log(this.context.router)
                this.context.router.push('/mobile');
            }.bind(this)}>!!!!!!!!!!!!!!!!!!!</h1>
        </div>
    }
}

PCside.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state, ownProps) => ({});
export default PCside = connect(
    mapStateToProps
)(PCside)