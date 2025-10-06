from flask import Flask, render_template, request
app = Flask(__name__)

# 2. Definição das Rotas do Site
# Cada função corresponde a uma página do seu site.

@app.route('/')
def index():
    # Esta rota vai renderizar o seu index.html (página "Sobre")
    return render_template('index.html')

@app.route('/projetos')
def projetos():
    # Esta rota vai renderizar o seu projetos.html
    return render_template('projetos.html')

@app.route('/contato')
def contato():
    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)