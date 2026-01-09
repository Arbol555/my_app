from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, send_from_directory, render_template, session, redirect, url_for
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os
from captcha.image import ImageCaptcha
import random
import string
from time import time
from supabase_client import descargar_pdf_supabase
from datetime import datetime, date
from urllib.parse import urlencode

app = Flask(__name__)
app.secret_key = '1234'  # Reemplazalo por algo m?seguro para producci??
# Carpeta donde se guardar?los PDFs descargados y el CAPTCHA
PDF_FOLDER = os.path.join(os.getcwd(), "static")
os.makedirs(PDF_FOLDER, exist_ok=True)


# Lista de patrones de fondo
PATRONES = [
    "static/patrones/patron1.png",
    "static/patrones/patron2.png",
    "static/patrones/patron3.png",
    "static/patrones/patron4.png"
]

FUENTES = [
    'static/fonts/Roboto-Regular.ttf',
    'static/fonts/Roboto-Bold.ttf',
    'static/fonts/Roboto-Italic.ttf',
    'static/fonts/Roboto-BoldItalic.ttf'
]

# Funci??ara generar CAPTCHA
def generar_captcha():
    captcha_text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    session['captcha'] = captcha_text

    width, height = 200, 60
    background_color = (255, 255, 255)
    text_color = (0, 0, 0)

    image = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(image)

    # Cargar patr?? aplicar configuraci??spec?ca
    patron_path = random.choice(PATRONES)
    patron_original = Image.open(patron_path).convert("RGBA")
    nombre_patron = os.path.basename(patron_path)

    if "2" in nombre_patron:
        escala = 0.32
        desfase_x = 16
        desfase_y = 0
    elif "1" in nombre_patron:
        escala = 0.318
        desfase_x = 17
        desfase_y = 70
    elif "3" in nombre_patron:
        escala = 0.34
        desfase_x = 9
        desfase_y = 8
    elif "4" in nombre_patron:
        escala = 0.32
        desfase_x = 37
        desfase_y = 47

    patron = patron_original.resize(
        (int(patron_original.width * escala), int(patron_original.height * escala)),
        Image.LANCZOS
    )
    tile_w, tile_h = patron.size
    for y in range(-desfase_y, height, tile_h):
        for x in range(-desfase_x, width, tile_w):
            image.paste(patron, (x, y), patron)

    # Posici??ertical del texto
    y_pos = random.randint(1, 20)

    # Espaciado fijo
    espaciado = random.choice([25, 35, 45])
    total_ancho = espaciado * len(captcha_text)
    if total_ancho > width * 0.90:
        espaciado = int(width * 0.90 / len(captcha_text))

    # Posici??nicial horizontal
    x = random.randint(0, 10)
    for letra in captcha_text:
        fuente_path = random.choice(FUENTES)
        fuente = ImageFont.truetype(fuente_path, 38)

        # Medir ancho real de la letra
        bbox = fuente.getbbox(letra)
        ancho_letra = bbox[2] - bbox[0]

        draw.text((x, y_pos), letra, font=fuente, fill=text_color)

        # Sumar ancho real + un espacio m?mo entre letras (evita que se peguen)
        x += ancho_letra + random.randint(3, 15)

    image.save(os.path.join(PDF_FOLDER, 'captcha.png'))

from flask import send_from_directory, render_template

@app.route('/serviciosenlineaweb/<int:id>')
@app.route('/ServiciosEnLineaWeb/<int:id>')
def serviciosenlineaweb_id(id):
    documento = request.args.get("documento")

    # CASE B: no documento → redirect with only id
    if not documento:
        return redirect(
            url_for("contenidos_embebido") + "?" + urlencode({"id": id})
        )

    # CASE A: documento present → lookup and enrich URL
    from supabase_client import obtener_por_documento
    codigo, fecha = obtener_por_documento(documento)

    # If documento not found, still allow manual flow
    if not codigo or not fecha:
        return redirect(
            url_for("contenidos_embebido") + "?" + urlencode({
                "id": id,
                "documento": documento,
                "tipoDocAValidar": "000"
            })
        )

    # Full happy path
    params = {
        "id": id,
        "codigoVerificador": codigo,
        "documento": documento,
        "fechaVigencia": fecha,
        "tipoDocAValidar": "000"
    }

    return redirect(
        url_for("contenidos_embebido") + "?" + urlencode(params)
    )
    
@app.route('/ServiciosEnLineaWeb/contenidosEmbebido')
def contenidos_embebido():
    generar_captcha()

    id_param = request.args.get('id')
    mostrar_iframe = (id_param == '8945')

    # --- construir query-string SIN el parámetro id ---
    params = {k: v for k, v in request.args.items() if k != 'id'}
    qs = urlencode(params)                       # '' si no hay otros params

    return render_template(
        'contenidosEmbebido.html',
        mostrar_iframe=mostrar_iframe,
        qs=qs                                     # lo pasamos al template
    )
    
    
@app.route('/recargar_captcha')
def recargar_captcha():
    generar_captcha()
    return '', 204  # No devuelve HTML, solo regenera

@app.route('/ServiciosEnLineaWeb/iframeContenido')
def iframe_contenido():
    documento = request.args.get("documento", "")

    codigo = request.args.get("codigoVerificador", "")
    fecha = request.args.get("fechaVigencia", "")

    if documento and (not codigo or not fecha):
        from supabase_client import obtener_por_documento
        codigo_db, fecha_db = obtener_por_documento(documento)

        if codigo_db and fecha_db:
            params = {
                "documento": documento,
                "codigoVerificador": codigo_db,
                "fechaVigencia": fecha_db
            }
            return redirect(
                url_for("iframe_contenido") + "?" + urlencode(params)
            )

    return render_template("validarDocumento.html")


@app.route('/descargar')
def descargar_pdf():
    codigo   = request.args.get('codigoVerificador')
    documento= request.args.get('documento')
    fecha    = request.args.get('fechaVigencia')
    captcha_input = request.args.get('captcha', '').upper()

    # Validar CAPTCHA
    if captcha_input != session.get('captcha', ''):
        return "Error: CAPTCHA inválido", 403

    # ↓ Devuelve el nombre real del archivo guardado en disco
    nuevo_nombre, error = descargar_pdf_supabase(codigo, documento)
    if error:
        return f"Error: {error}", 404

    # ---- Nombre de descarga deseado ----
    hoy = date.today().strftime('%Y%m%d')          # AAAAMMDD
    nombre_salida = f"HistoriaLaboral_{documento}_{hoy}.pdf"

    # Flask ≥ 2.2  → usa download_name
    return send_from_directory(
        PDF_FOLDER,
        nuevo_nombre,
        as_attachment=True,
        download_name=nombre_salida
    )

if __name__ == '__main__':
    app.run(debug=True)