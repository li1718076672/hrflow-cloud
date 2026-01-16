import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from flask import current_app

def send_salary_slip_email(to_email, to_name, pdf_data, month_year):
    msg = MIMEMultipart()
    msg['From'] = current_app.config['MAIL_FROM']
    msg['To'] = to_email
    msg['Subject'] = f"【{month_year}】您的工资条已发布 - HRFlow Cloud"

    body = f"""
尊敬的 {to_name}：

您好！

您 {month_year} 的工资条已生成，请查收附件。

如有疑问，请联系人事部门。

—— HRFlow Cloud 自动系统
    """.strip()

    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    part = MIMEApplication(pdf_data, Name=f"工资条_{month_year}.pdf")
    part['Content-Disposition'] = f'attachment; filename="salary_{month_year}.pdf"'
    msg.attach(part)

    try:
        server = smtplib.SMTP(current_app.config['MAIL_SERVER'], current_app.config['MAIL_PORT'])
        server.starttls()
        server.login(current_app.config['MAIL_USERNAME'], current_app.config['MAIL_PASSWORD'])
        server.send_message(msg)
        server.quit()
        return True, None
    except Exception as e:
        return False, str(e)