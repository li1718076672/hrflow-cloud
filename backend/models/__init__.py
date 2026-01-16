from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .company import Company
from .user import User
from .employee import Employee
from .salary import SalaryRecord
from .tax_deduction import TaxDeduction