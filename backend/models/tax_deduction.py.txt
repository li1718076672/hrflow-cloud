from datetime import datetime
from app.models import db

class TaxDeduction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)

    child_education_count = db.Column(db.Integer, default=0)
    continuing_edu_type = db.Column(db.String(10))  # degree, cert
    housing_loan_interest = db.Column(db.Boolean, default=False)
    housing_rent_city = db.Column(db.String(10))   # tier1, tier2, tier3
    support_elderly = db.Column(db.Boolean, default=False)
    support_elderly_type = db.Column(db.String(10)) # only_child, shared

    updated_at = db.Column(db.DateTime, default=datetime.utcnow)