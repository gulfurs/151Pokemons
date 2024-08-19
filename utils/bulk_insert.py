import sqlite3
import csv

def get_db_connection():
    conn = sqlite3.connect('pokemon.db')
    conn.row_factory = sqlite3.Row
    return conn

def bulk_insert_pokemon(conn, csv_file):
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        pokemon_list = [
            (int(row['#']), row['Name'], row['Type 1'], row['Type 2'], int(row['Total']), int(row['HP']),
             int(row['Attack']), int(row['Defense']), int(row['Sp. Atk']), int(row['Sp. Def']), int(row['Speed']))
            for row in reader
        ]

    with conn:
        conn.executemany('''
            INSERT INTO pokemon (id, name, type1, type2, total, hp, attack, defense, sp_atk, sp_def, speed)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', pokemon_list)

def main():
    conn = get_db_connection()
    bulk_insert_pokemon(conn, 'pokemon.csv')
    conn.close()

if __name__ == '__main__':
    main()
