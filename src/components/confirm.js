import React, {Component} from 'react';

let Confirm = ({isShow, changeState}) => {
    if (isShow) {
        return <div className='confirm'>
            <div className='confirm-content'>
                <div className='confirm-message'>你确定要删除吗?</div>
                <div className='confirm-operate'>
                    <div className='confirm-ok' onClick={() => {
                        changeState('OK');
                    }}>确定</div>
                    <div className='confirm-no' onClick={() => {
                        changeState('NO');
                    }}>取消</div>
                </div>
            </div>
        </div>
    }
    return <div></div>
}

export default Confirm;
