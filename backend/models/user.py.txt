from app.models import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), default='employee')  # admin, manager, employee
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    preferred_lang = db.Column(db.String(2), default='zh')

    company = db.relationship('Company', backref='users')
    employee = db.relationship('Employee', uselist=False, backref='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)