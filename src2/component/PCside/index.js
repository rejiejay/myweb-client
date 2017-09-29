import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavHeard from './NavHeard/index.js';
import Swiper from './Swiper/index.js';

class PCside extends Component {
    render() {
        return <div>
            <NavHeard/>
            <Swiper/>
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