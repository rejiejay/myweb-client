// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// 组件类
import ReusemeHeader from './reuseme-header';
import loadPageVar from './../../utils/loadPageVar';
// 样式类
import './details.scss';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;
// 简历键值对数据
let reusemekeyvaldata = {
    // 智慧监控管理系统
    cdimms: [
        {
            title: '智慧监控管理系统',
            content: '“智慧监控管理系统”是使用Vue框架，以及Java Spring Boot服务的前后端分离项目，是中国人保财险一套智能的监管系统。提供了车行，支公司和团队的监控功能，并且支持表单以及统计进行智能分析和预测，给车行服务人员提供方便的工具。帮助其管理现有车商，支公司，团队、拓展新业务，创造业务的机会。',
        }, {
            title: '车行监控',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/cdimms/content001.png)',
        }, {
            title: '支公司监管',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/cdimms/content002.png)',
        }, {
            title: '统计分析',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/cdimms/content003.png)',
        }, {
            title: '支公司管理',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/cdimms/content004.png)',
        },
    ],
    // 金车管家
    flgx: [
        {
            title: '金车管家',
            content: '“金车管家”是使用Vue框架，以及Java Spring Boot服务的前后端分离项目，面向“保险销售人员、保险代理人员或其他车务、保险相关从业人员”的展业工具，帮助其管理现有客户、拓展新客户，创造客户接触机会，给客户提供加油、洗车、保养等高品质优惠服务，给业务经理分成。',
        }, {
            title: '首页预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content001.png)',
        }, {
            title: '个人中心预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content002.png)',
        }, {
            title: '活动列表预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content003.png)',
        }, {
            title: '客户详情预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content004.png)',
        }, {
            title: '添加客户预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content005.png)',
        }, {
            title: '数据看板预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content006.png)',
        }, {
            title: '购买套餐预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/content007.png)',
        },
    ],
    // 深圳人保财险PICC洗车项目
    picccarwash: [
        {
            title: '深圳人保财险PICC洗车项目',
            content: '人保洗车项目是使用Play框架编写的全栈的Java Web的项目, 与另一套Java服务集成后台管理端，可随时导入新增门店，客户端全深圳城市的人保洗车门店情况；通过目的门店站搜索、筛选，微信定位、可以快速定位到要查询的门店，一键导航洗车门店。',
        }, {
            title: '列表预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-car-wash/list.jpg)',
        }, {
            title: '商家详情预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-car-wash/details.jpg)',
        }, {
            title: '后台管理预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-car-wash/background.png)',
        },
    ],
    // 深圳平安财险车商小程序
    pingandealere: [
        {
            title: '深圳平安财险车商小程序',
            content: '车商小程序是在平安科技体系下的一个小程序项目，汇集多家汽车经销商，提供维修保养、新车试驾、保险询价等线上服务。',
        }, {
            title: '首页预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content001.png)',
        }, {
            title: '个人中心预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content002.png)',
        }, {
            title: '摇一摇预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content003.png)',
        }, {
            title: '转发预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content004.png)',
        }, {
            title: '列表预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content005.png)',
        }, {
            title: '停车预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/content006.png)',
        },
    ],
    // 充电桩新能源项目
    picccharger: [
        {
            title: '充电桩新能源项目',
            content: '充电桩是使用Vue框架，后台是Java和C#提供服务的前后端分离项目，该项目对接中国人保,中石化,特来电等多家公司的服务。可以快速定位到要查询的充电桩，一键启动充电。',
        }, {
            title: '充电站列表预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content001.png)',
        }, {
            title: '充电站详情预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content002.png)',
        }, {
            title: '充电结束预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content003.png)',
        }, {
            title: '充电中预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content004.png)',
        }, {
            title: '微信充值预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content005.png)',
        }, {
            title: '充电记录预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/content006.png)',
        },
    ],
    // 养车频道车主端
    ycpd: [
        {
            title: '养车频道车主端',
            content: '充电桩是使用Vue框架，后台是Java和C#提供服务的前后端分离项目，该项目对接中国人保,中石化,特来电等多家公司的服务。可以快速定位到要查询的充电桩，一键启动充电。',
        }, {
            title: '车主首页预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content001.png)',
        }, {
            title: '车主中心预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content002.png)',
        }, {
            title: '卡券预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content003.png)',
        }, {
            title: '车辆信息预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content004.png)',
        }, {
            title: '违章查询预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content005.png)',
        }, {
            title: '商家列表预览',
            content: '![content](https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/content006.png)',
        },
    ],
    // 潜游时光商城
    divingtime: [
        {
            title: '潜游时光商城',
            content: '潜游时光商城是使用了jquery与React Dva多种前端技术，后台为Java服务前后端分离的电商网站。网站兼容PC端以及移动端。',
        },
    ],
    // 潜游时光用户信息收集
    divingtimeuserinfor: [
        {
            title: '潜游时光用户信息收集',
            content: '潜游时光用户信息收集是承担了业务流程优化的一个项目。项目使得客服人员工作量大幅度下降。优化用户体验，同时为网站积累用户以及数据量便于以后拓展使用。',
        },
    ],
}

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                // {
                //     title: '',
                //     content: '',
                // },
            ],
        };
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {
        // 初始化简历数据的“键(key)”值
        let datakeyName = loadPageVar('id');

        if (datakeyName) {
            // 初始化页面数据
            let pageData = reusemekeyvaldata[datakeyName];
    
            // 复制进 state 里
            if (pageData) {
                this.setState({
                    list: pageData
                });
            }
        }
    }

    render() {
        
        return (
            <React.Fragment>
                <ReusemeHeader title="作品详情" />

                <div className="resume-details" style={{minHeight: `${clientHeight - 50}px`}}>
                
                    {this.state.list.map((item, key) => (
                        <div className="resume-details-item" key={key}>
                            <div className="details-item-container">
                                <div className="details-item-title">{item.title}</div>
                                <div className="details-item-main ReactMarkdown">
                                    <ReactMarkdown source={item.content} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default details;
