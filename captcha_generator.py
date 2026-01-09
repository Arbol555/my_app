from captcha.image import ImageCaptcha
import random
import string

def generar_captcha():
    captcha_text = ''.join(random.choices(string.ascii_uppercase, k=5))
    session['captcha'] = captcha_text

    width, height = 200, 60
    background_color = (255, 255, 255)
    text_color = (0, 0, 0)
    noise_color = (0, 0, 0)

    fuentes = [
        'static/fonts/Roboto-Regular.ttf',
        'static/fonts/Roboto-Bold.ttf',
        'static/fonts/Roboto-Italic.ttf',
        'static/fonts/Roboto-BoldItalic.ttf'
    ]

    image = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(image)

    simbolos = ['.', ',', '-']

    # Dibujar símbolos con rotación
    for _ in range(250):
        simbolo = random.choice(simbolos)
        size = random.randint(8, 12)
        fuente_path = random.choice(fuentes)
        fuente = ImageFont.truetype(fuente_path, size)
        angle = random.randint(0, 360)

        # Crear imagen temporal con símbolo
        temp_img = Image.new('RGBA', (size*2, size*2), (0, 0, 0, 0))
        temp_draw = ImageDraw.Draw(temp_img)
        temp_draw.text((size/2, size/2), simbolo, font=fuente, fill=noise_color, anchor="mm")

        # Rotar y pegar sobre imagen principal
        rotated = temp_img.rotate(angle, expand=1)
        x = random.randint(0, width)
        y = random.randint(0, height)
        image.paste(rotated, (x, y), rotated)

    # Dibujar texto del CAPTCHA (sin rotación)
    x = 10
    y = 10
    for letra in captcha_text:
        fuente_path = random.choice(fuentes)
        fuente = ImageFont.truetype(fuente_path, 32)
        draw.text((x, y), letra, font=fuente, fill=text_color)
        x += 35

    image = image.filter(ImageFilter.GaussianBlur(0.2))
    captcha_path = os.path.join(PDF_FOLDER, 'captcha.png')
    with open(captcha_path, 'wb') as f:
        image.save(f, format='PNG')
        f.flush()
        os.fsync(f.fileno())
