from flask import Flask, jsonify, send_from_directory
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('pokemon.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/pokemon', methods=['GET'])
def get_pokemon():
    conn = get_db_connection()
    pokemons = conn.execute('SELECT * FROM pokemon').fetchall()
    conn.close()
    return jsonify([dict(pokemon) for pokemon in pokemons])

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/style.css')
def style():
    return send_from_directory('static', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('static/js', 'script.js')

if __name__ == '__main__':
    app.run(debug=True)
