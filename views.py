# 1. Importe 'Blueprint' e as outras funções necessárias do Flask
from flask import Blueprint, render_template, request
# 2. Crie uma instância do Blueprint
main_routes = Blueprint('main_routes', __name__)

# 3. Use o Blueprint para criar as rotas (em vez de @app.route)
@main_routes.route('/')
def index():
    return render_template('index.html')

@main_routes.route('/projetos')
def projetos():
    return render_template('projetos.html')

@main_routes.route('/contato')
def contato():
    return render_template('contato.html')