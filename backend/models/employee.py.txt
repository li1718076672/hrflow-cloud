from app.models import db

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    employee_id = db.Column(db.String(20), unique=True)
    department = db.Column(db.String(50))
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    basic_salary = db.Column(db.Float, default=8000.0)
    performance_rate = db.Column(db.Float, default=1.0)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

    allowance = db.Column(db.Float, default=500.0)
    tech_allowance = db.Column(db.Float, default=300.0)
    meal_allowance = db.Column(db.Float, default=300.0)
    housing_allowance = db.Column(db.Float, default=1000.0)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))