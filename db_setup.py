import sqlite3

conn = sqlite3.connect('base.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE documentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo_verificador TEXT NOT NULL,
        documento TEXT NOT NULL,
        fecha_vigencia TEXT NOT NULL,
        archivo_pdf TEXT NOT NULL
    )
''')

# Insertar ejemplo
cursor.execute('''
    INSERT INTO documentos (codigo_verificador, documento, fecha_vigencia, archivo_pdf)
    VALUES (?, ?, ?, ?)
''', ('123456789012', '87654321', '2025-07-29', 'ejemplo.pdf'))

conn.commit()
conn.close()

print("Base de datos creada.")
