import { Form, Input, Select, Switch, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'

const { Option } = Select

export const TaxDeductionForm = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log('提交专项扣除:', values)
    // TODO: 调用 API /api/salary/tax-deduction
  }

  return (
    <Card title={t('salary.taxDeduction.title')}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label={t('salary.taxDeduction.children')} name="child_education_count">
          <Input type="number" min="0" placeholder={t('salary.taxDeduction.childrenHint')} />
        </Form.Item>

        <Form.Item label={t('salary.taxDeduction.continuingEdu')} name="continuing_edu_type">
          <Select placeholder={t('salary.taxDeduction.select')}>
            <Option value="degree">{t('salary.taxDeduction.degree')}</Option>
            <Option value="cert">{t('salary.taxDeduction.cert')}</Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('salary.taxDeduction.housingLoan')} name="housing_loan_interest" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label={t('salary.taxDeduction.rentCity')} name="housing_rent_city">
          <Select placeholder={t('salary.taxDeduction.selectCity')}>
            <Option value="tier1">{t('salary.taxDeduction.tier1')}</Option>
            <Option value="tier2">{t('salary.taxDeduction.tier2')}</Option>
            <Option value="tier3">{t('salary.taxDeduction.tier3')}</Option>
          </Select>
        </Form.Item>

        <Form.Item label={t('salary.taxDeduction.supportElderly')} name="support_elderly" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) =>
            getFieldValue('support_elderly') ? (
              <Form.Item label={t('salary.taxDeduction.type')} name="support_elderly_type">
                <Select>
                  <Option value="only_child">{t('salary.taxDeduction.onlyChild')}</Option>
                  <Option value="shared">{t('salary.taxDeduction.shared')}</Option>
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('common.save')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}