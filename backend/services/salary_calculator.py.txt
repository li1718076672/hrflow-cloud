from models import Employee, SalaryRecord, TaxDeduction, db
from decimal import Decimal

TAX_RATES = [
    (0, 3000, 0.03, 0),
    (3000, 12000, 0.10, 210),
    (12000, 25000, 0.20, 1410),
    (25000, 35000, 0.25, 2660),
    (35000, 55000, 0.30, 4410),
    (55000, 80000, 0.35, 7160),
    (80000, float('inf'), 0.45, 15160),
]

def calculate_individual_income_tax(income, deductions):
    deductions_total = Decimal('0')
    if deductions:
        deductions_total += Decimal(str(deductions.get('child_education_count', 0))) * 1000
        if deductions.get('continuing_edu_type') == 'degree':
            deductions_total += 400
        elif deductions.get('continuing_edu_type') == 'cert':
            deductions_total += Decimal('3600') / 12
        if deductions.get('housing_loan_interest'):
            deductions_total += 1000
        rent_map = {'tier1': 1500, 'tier2': 1100, 'tier3': 800}
        deductions_total += rent_map.get(deductions.get('housing_rent_city'), 0)
        if deductions.get('support_elderly'):
            deductions_total += 2000 if deductions.get('support_elderly_type') == 'only_child' else 1000

    taxable_income = max(Decimal(str(income)) - 5000 - deductions_total, Decimal('0'))

    for min_val, max_val, rate, quick in TAX_RATES:
        if taxable_income <= max_val:
            tax = taxable_income * Decimal(str(rate)) - Decimal(str(quick))
            return max(float(tax), 0.0)
    return 0.0

def calculate_monthly_salary(employee_id, year, month):
    emp = Employee.query.get_or_404(employee_id)
    base = emp.basic_salary
    perf_bonus = base * emp.performance_rate
    total_earning = base + perf_bonus

    tax_deduct = TaxDeduction.query.filter_by(employee_id=employee_id).first()
    deductions = {
        'child_education_count': getattr(tax_deduct, 'child_education_count', 0) if tax_deduct else 0,
        'continuing_edu_type': getattr(tax_deduct, 'continuing_edu_type', None),
        'housing_loan_interest': getattr(tax_deduct, 'housing_loan_interest', False),
        'housing_rent_city': getattr(tax_deduct, 'housing_rent_city', None),
        'support_elderly': getattr(tax_deduct, 'support_elderly', False),
        'support_elderly_type': getattr(tax_deduct, 'support_elderly_type', None),
    }

    tax = calculate_individual_income_tax(total_earning, deductions)
    net = total_earning - tax - (base * 0.105) - (base * 0.12)  # 社保+公积金估算

    record = SalaryRecord(
        employee_id=employee_id,
        month_year=f"{year}-{month:02d}",
        basic_salary=base,
        performance_bonus=perf_bonus,
        total_earnings=total_earning,
        tax=tax,
        social_security=base * 0.105,
        housing_fund=base * 0.12,
        total_deductions=tax + base * 0.105 + base * 0.12,
        net_salary=net
    )
    db.session.add(record)
    db.session.commit()
    return record