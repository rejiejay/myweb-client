// 框架类
import React, { Component } from 'react';
// 组件类
import ReusemeHeader from './reuseme-header';
// 样式类
import './index.scss';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class reuseme extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        /**
         * 简历的数据
         * 这里的数据为什么要和首页的数据分开?
         * 因为两个地方是不同的数据, 这里的数据是展示全部数据的
         */
        let reusemeList = [
            {
                id: 'flgx', // 数据唯一标识
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/banner.png',
                title: '金车管家',
                content: '“金车管家”是使用Vue框架，以及Java Spring Boot服务的前后端分离项目，面向“保险销售人员、保险代理人员或其他车务、保险相关从业人员”的展业工具，帮助其管理现有客户、拓展新客户，创造客户接触机会，给客户提供加油、洗车、保养等高品质优惠服务，给业务经理分成。',
            }, {
                id: 'picccarwash',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-car-wash/banner.png',
                title: '深圳人保财险PICC洗车项目',
                content: '人保洗车项目是使用Play框架编写的全栈的Java Web的项目, 与另一套Java服务集成后台管理端，可随时导入新增门店，客户端全深圳城市的人保洗车门店情况；通过目的门店站搜索、筛选，微信定位、可以快速定位到要查询的门店，一键导航洗车门店。',
            }, {
                id: 'pingandealere',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/banner.png',
                title: '深圳平安财险车商小程序',
                content: '车商小程序是在平安科技体系下的一个小程序项目，汇集多家汽车经销商，提供维修保养、新车试驾、保险询价等线上服务。',
            }, {
                id: 'picccharger',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/banner.png',
                title: '充电桩新能源项目',
                content: '充电桩是使用Vue框架，后台是Java和C#提供服务的前后端分离项目，该项目对接中国人保,中石化,特来电等多家公司的服务。可以快速定位到要查询的充电桩，一键启动充电。',
            }, {
                id: 'ycpd',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/banner.png',
                title: '养车频道车主端',
                content: '养车频道车主端是使用Vue前端框架, 后台为C#以及JAVA的平台项目，平台近四百家商户，以及几十家合作伙伴，为超过10万名车主提供过服务。',
            }, {
                id: 'divingtime',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/divingtime/banner.png',
                title: '潜游时光商城',
                content: '潜游时光商城是使用了jquery与React Dva多种前端技术，后台为Java服务前后端分离的电商网站。网站兼容PC端以及移动端。',
            }, {
                id: 'divingtimeuserinfor',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/very_sorry.png',
                title: '潜游时光用户信息收集',
                content: '潜游时光用户信息收集是承担了业务流程优化的一个项目。项目使得客服人员工作量大幅度下降。优化用户体验，同时为网站积累用户以及数据量便于以后拓展使用。',
            },
        ];

        /**
         * 跳转到作品详情
         */
        let jumpToReusemeRetails = id => window.location.href = `./?id=${id}#/reuseme/details`;
        
        return (
            <React.Fragment>
                <ReusemeHeader title="作品列表" />

                <div className="list-resume">

                    
                    {reusemeList.map((val, key) => (
                        <div className="list-item" key={key}>
                            <div className="list-item-container" onClick={() => jumpToReusemeRetails(val.id)}>

                                {/* 图片 */}
                                <div className="list-item-img" 
                                    style={{
                                        /* 长和高的比例为 345:150 计算， 实际高清图为 690:300 */
                                        width: `${clientWidth - 30}px`, 
                                        height: `${Math.floor( (clientWidth - 30) * 150 / 345 ) }px`
                                    }}>
                                    <img alt="item" src={val.imgsrc} />
                                </div>

                                {/* 描述 */}
                                <div className="list-item-describe">
                                    <div className="item-describe-title">{val.title}</div>
                                    <div className="item-describe-content">{val.content}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                        
                </div>

            </React.Fragment>
        )
    }
}

export default reuseme;
