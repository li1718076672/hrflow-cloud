from datetime import datetime
from app.models import db

class SalaryRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    month_year = db.Column(db.String(7), nullable=False)  # YYYY-MM

    basic_salary = db.Column(db.Float, default=0.0)
    overtime_pay_g1 = db.Column(db.Float, default=0.0)
    overtime_pay_g2 = db.Column(db.Float, default=0.0)
    overtime_pay_g3 = db.Column(db.Float, default=0.0)
    allowance = db.Column(db.Float, default=0.0)
    tech_allowance = db.Column(db.Float, default=0.0)
    meal_allowance = db.Column(db.Float, default=0.0)
    housing_allowance = db.Column(db.Float, default=0.0)
    full_attendance_bonus = db.Column(db.Float, default=0.0)
    performance_bonus = db.Column(db.Float, default=0.0)

    total_earnings = db.Column(db.Float, default=0.0)

    social_security = db.Column(db.Float, default=0.0)
    housing_fund = db.Column(db.Float, default=0.0)
    tax = db.Column(db.Float, default=0.0)
    other_deductions = db.Column(db.Float, default=0.0)

    total_deductions = db.Column(db.Float, default=0.0)
    net_salary = db.Column(db.Float, default=0.0)

    is_sent = db.Column(db.Boolean, default=False)
    sent_at = db.Column(db.DateTime, nullable=True)
    send_error = db.Column(db.String(200), nullable=True)

    __table_args__ = (db.UniqueConstraint('employee_id', 'month_year'),)