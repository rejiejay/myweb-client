import React, {Component} from 'react';
import { connect } from 'dva';

import './index.less';
import convertTime from './../../../utils/convertTime';

class IndexRecord extends Component {
    constructor(props) {
        super(props);

        let newDate = new Date();

        console.log(convertTime);
        console.log(newDate.getDate());
        console.log(newDate.getDay());

        this.state = {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
        }
    }

    render() {
        if (this.props.selectedTabs !== 'record') {
            return (<div></div>)
        }

        return (
            <div className="record">
                <div className="record">
                2018/3月/2周/星期一
                </div>
            </div>
        )
    }
}

export default connect()(IndexRecord);
