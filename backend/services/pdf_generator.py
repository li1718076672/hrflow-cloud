from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import os

def generate_salary_pdf(salary_record, employee_data, company_name, month_year):
    template_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'pdf_templates')
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template('salary_slip.html')

    html_string = template.render(
        salary=salary_record,
        emp=employee_data,
        company_name=company_name,
        month_year=month_year
    )

    return HTML(string=html_string).write_pdf()