import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    // 可选：保存到服务器
    fetch('/api/user/lang', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang }),
      credentials: 'include'
    })
  }

  return (
    <div style={{ position: 'absolute', top: 16, right: 16 }}>
      <Button size="small" type={i18n.language === 'zh' ? 'primary' : 'default'} onClick={() => changeLang('zh')}>
        中文
      </Button>
      <Button size="small" type={i18n.language === 'en' ? 'primary' : 'default'} onClick={() => changeLang('en')} style={{ marginLeft: 8 }}>
        English
      </Button>
    </div>
  )
}