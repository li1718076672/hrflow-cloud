import { Card, Row, Col, Statistic } from 'antd'
import { DollarCircleOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('dashboard.welcome', { name: 'Admin' })}</h1>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card><Statistic title={t('dashboard.totalEmployees')} value={128} prefix={<TeamOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title={t('dashboard.todayAttendance')} value="96%" prefix={<CheckCircleOutlined />} /></Card>
        </Col>
        <Col span={8}>
          <Card><Statistic title={t('dashboard.monthlyPayroll')} value="¥328,000" prefix={<DollarCircleOutlined />} /></Card>
        </Col>
      </Row>
    </div>
  )
}