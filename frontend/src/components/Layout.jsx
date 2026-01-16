import { Layout as AntLayout, Menu } from 'antd'
import { UserOutlined, DashboardOutlined, SolutionOutlined, BankOutlined, SettingOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { LangSwitcher } from './LangSwitcher'
import { useTranslation } from 'react-i18next'

const { Header, Sider, Content } = AntLayout

export const MainLayout = ({ children }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">{t('dashboard.title')}</Link> },
    { key: '/employees', icon: <UserOutlined />, label: <Link to="/employees">{t('menu.employees')}</Link> },
    { key: '/attendance', icon: <SolutionOutlined />, label: <Link to="/attendance">{t('menu.attendance')}</Link> },
    { key: '/salary', icon: <BankOutlined />, label: <Link to="/salary">{t('menu.salary')}</Link> },
    { key: '/settings', icon: <SettingOutlined />, label: <Link to="/settings">{t('menu.settings')}</Link> },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <LangSwitcher />
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" style={{ color: '#fff', padding: '16px', fontSize: '18px', textAlign: 'center' }}>
          HRFlow
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <AntLayout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}