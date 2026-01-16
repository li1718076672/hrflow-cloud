from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, db

user_bp = Blueprint('user_api', __name__, url_prefix='/api/user')

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user = User.query.get(get_jwt_identity())
    return jsonify({
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'company_id': user.company_id,
        'preferred_lang': user.preferred_lang or 'zh'
    })

@user_bp.route('/lang', methods=['POST'])
@jwt_required()
def set_lang():
    user = User.query.get(get_jwt_identity())
    lang = request.json.get('lang', 'zh')
    if lang in ['zh', 'en']:
        user.preferred_lang = lang
        db.session.commit()
        return jsonify({'success': True})
    return jsonify({'error': 'Invalid language'}), 400