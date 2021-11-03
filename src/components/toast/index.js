import './index.scss';

let Toast = {
    /**
     * 显示toast
     * @param {string} message 显示的信息
     */
    show: function show(message) {
        const _this = this;

        // 如果组件存在，则不进行弹出，防止出现多个组件
        if (document.getElementById('rejiejay-toast')) {
            return false;
        }
        
        var node = document.createElement("div");
        
        let node_content = `
            <div class='toast-content'>
                <div class='toast-loader'>
                    <div class='loader--audioWave'></div>
                </div>
            </div>
        `;

        if (message) {
            node_content = `
                <div class='toast-content'>
                    <div class='toast-message'>${message}</div>
                </div>
            `;
        }

        node.setAttribute('class', 'rejiejay-toast flex-center');
        node.setAttribute('id', 'rejiejay-toast');
        node.innerHTML = node_content;
        document.body.appendChild(node);

        if (message) {
            document.getElementById('rejiejay-toast').onclick = function () {
                _this.destroy();
            }
        }
    }, 

    /**
     * 销毁toast
     */
    destroy: function destroy() {
        if (document.getElementById('rejiejay-toast')) {
            document.body.removeChild(document.getElementById('rejiejay-toast'));
        }
    }
}

export default Toast
