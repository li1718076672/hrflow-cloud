from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Employee, SalaryRecord, TaxDeduction
from services.salary_calculator import calculate_monthly_salary
from services.pdf_generator import generate_salary_pdf
from services.email_service import send_salary_slip_email

salary_bp = Blueprint('salary_api', __name__, url_prefix='/api/salary')

@salary_bp.route('/calculate', methods=['POST'])
@jwt_required()
def calculate_salary():
    data = request.get_json()
    year = data['year']
    month = data['month']

    user_id = get_jwt_identity()
    employees = Employee.query.filter_by(company_id=User.query.get(user_id).company_id).all()
    results = []

    for emp in employees:
        try:
            record = calculate_monthly_salary(emp.id, year, month)
            results.append({'employee_id': emp.id, 'status': 'success'})
        except Exception as e:
            results.append({'employee_id': emp.id, 'status': 'error', 'msg': str(e)})

    return jsonify({'results': results})