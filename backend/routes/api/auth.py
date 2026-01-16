from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import User

auth_bp = Blueprint('auth_api', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role,
                'company_id': user.company_id,
                'preferred_lang': user.preferred_lang or 'zh'
            }
        })
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401