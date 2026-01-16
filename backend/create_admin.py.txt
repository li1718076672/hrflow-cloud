from backend.app import create_app, db
from backend.models import User, Company

app = create_app()

with app.app_context():
    if not Company.query.first():
        co = Company(name="Demo Company")
        db.session.add(co)
        db.session.flush()

        admin = User(username="admin", role="admin", company_id=co.id)
        admin.set_password("123456")
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin created: admin / 123456")