// 框架类
import React, { Component } from 'react';
// 请求类
import { getToken } from './../../api/microsoft/index';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 根据Url的名称获取笔记本的分区
 */
class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        /**
         * 本地测试 (postman手动赋值)
         */
        this.access_token = "EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAbHxySpDQGxWtl2+0WOPl0F4X72SFEQBBjUG9HLexj2iqlzoTHxEyazBAYq6hOb8vId3jm9er74rWHDGJHM06rrEFFlr78nrhfzI2IGmtTEzA863/h+NQo71ZvUtZasHNPvWXJevnDjTL/bAkZ5ffXPUdq/VFJA604jd894ifsu76t1NnpItmCHw7+7ZOT6jjWWh8e4kh1sF+7YyMldW6iZs1b4xuvj9WBYbjumduuUThzD3Jdjn6jcibqxdo3WtBCuaBRnS6A1q+aN/UDXmUDNfXtA3seHYnjcbXyuTj0YoK9ng6GcAiY5XkT9bYTomcw+p1MN7EqZkRSFKd5bcxDADZgAACPZSRpX0E84IQAJWURnk+sOmwBP5TFFFnFacTDd7OtXHwyaHTxX1a2iN/UrzajhbLu9ZjTKOJUxaMyqKxgDWus0ej/DWd5kkxzhIY1r/pZKHq3O+O7lTiyjiF/4TAtHOIJSy9E8zQKK5nRZirTINUfJbV9fX/BNjZtL7GyhrU58dCHaAYOCZsIQpZ+J86+fzGvIW5XiOSobIazpFrKpiW8wWT1Ruk1KSHJcGzp4juwOOoamfAQQ504dv0Vln252K0bV6XcxAUXnI1QcXsIYWE9aQA9roLs0VJWsz8vJ93UOrj7IEtPi2zuoSRcOh/NvPZKrOBVhQd0AcULZl0QxRnAN03TBBMUIgdlRzw7tTvNjCWdskfkcYnORO0FSdm/MpVejwF9zfM6IVDghLnylRxL1TYP6JA4st/IaGbwWTtbifxFBZ9Hupsn9e33+G4K8nKq5P5sS3xvSyB65pYjpvGx80r4+Ep8ekhdHIvdjYSB6pyFJG6Yfs8pDxxT0rIMumUWoSAM4GLJLg9g8iu9vWSiKqtTI1IvuY2MUCdk4PQrDarvosWGjTp2ELluGcSnjRh9OffqTCxJ+xzi0VWF2KcH4s9uKu/cGURitK6H78IP0qy/9T4lcQR1vQtK0hmDwmA27np0IrUcOWoehmt9OHZDUKrT88kBVDkRRbvWmDo4ajmLGDn9/1Mw2RBuxptNJnpsDtFkw/LMRqlgZbBPNUPEiWbbnbxKVx7a7NoRMvguhHXv+yhkkl6R/yYQomBmrY+hUgPpllq8XvyJ99Ag==";
    }

    componentDidMount() {
        const _this = this;

        /**
         * 【第一步】 获取Token
         */
        let getAccessToken = () => {
            // 判断是不是本地环境
            if (window.location.hostname === 'localhost') {
                // 本地环境的情况下, 直接跳转到第二步
                window.sessionStorage.setItem('microsoft_access_token', this.access_token);
                return isPagesExpire();
            }

            // 生产环境下, 获取一次token
            getToken()
            .then(res => {
                window.sessionStorage.setItem('microsoft_access_token', res);
                _this.access_token = res;

                isPagesExpire(); // 第二步

            }, error => {
                if (confirm(error + '是否跳转到授权页?')) {
                    window.location.href = 'microsoft/authorize.html';
                }
            });
        }

        /**
         * 【第二步】 查询数据库缓存 contentUrl 及 parentSection id 是否过期
         */
        let isPagesExpire = () => {
        }

        /**
         * 【第三步】 查询所有分区
         */
        let getAccessToken = () => {

        }
    }

    render() {
        return (
            <div className="microsoft">
            </div>
        );
    }
}

export default english;
