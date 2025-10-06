from flask import Flask, render_template
from views import main_routes

# Cria a instância da aplicação Flask
app = Flask(__name__)

app.register_blueprint(main_routes)

# Permite executar o arquivo diretamente com 'python app.py'
if __name__ == '__main__':
    app.run(debug=True)