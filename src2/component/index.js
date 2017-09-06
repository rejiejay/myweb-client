import React, {Component} from 'react';

class Toplayer extends Component {
    render() {
        return <div>
            {this.props.children}
        </div>
    }
}
export default Toplayer