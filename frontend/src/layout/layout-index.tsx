import {useState} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Outlet, useNavigate} from "react-router-dom";
import "./layout-index.css";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export const LayoutIndex = () => {

    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>} onClick={() => navigate("/test")}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>} onClick={() => navigate("/history")}>
                        History
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{margin: '2vh 2vw'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};