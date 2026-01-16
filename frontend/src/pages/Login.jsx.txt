import { useState } from 'react'
import { Form, Input, Button, Card, message } from 'antd'
import { useTranslation } from 'react-i18next'
import api from '../utils/axios'
import { saveAuthData } from '../store/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', values)
      if (res.data.success) {
        saveAuthData(res.data)
        message.success(t('login.loginSuccess'))
        navigate('/dashboard')
      }
    } catch (err) {
      message.error(t('login.invalidCredentials'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: '100px auto' }}>
      <Card title={<h2>{t('login.title')}</h2>} bordered={false}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" label={t('login.username')} rules={[{ required: true }]}>
            <Input placeholder={t('login.username')} />
          </Form.Item>
          <Form.Item name="password" label={t('login.password')} rules={[{ required: true }]}>
            <Input.Password placeholder={t('login.password')} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {t('login.submit')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}