# supabase_client.py
import os
import datetime
import requests
from dotenv import load_dotenv
from supabase import create_client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def descargar_pdf_supabase(codigo_verificador, documento):
    bucket = "docs"
    nombre_archivo = f"{codigo_verificador}.pdf"
    
    # Intentar generar la URL firmada temporal
    try:
        res = supabase.storage.from_(bucket).create_signed_url(nombre_archivo, 60)
        url = res.get("signedURL")
        if not url:
            return None, "No se pudo generar la URL firmada"
    except Exception as e:
        return None, f"Error al generar URL firmada: {e}"

    # Descargar el PDF
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return None, "El archivo no se pudo descargar desde Supabase"
        
        # Crear nombre nuevo
        fecha_actual = datetime.datetime.now().strftime("%Y%m%d")
        nuevo_nombre = f"HistoriaLaboral_{documento}_{fecha_actual}.pdf"
        ruta_local = os.path.join("static", nuevo_nombre)

        with open(ruta_local, "wb") as f:
            f.write(response.content)

        return nuevo_nombre, None
    except Exception as e:
        return None, f"Error al descargar archivo: {e}"

def obtener_por_documento(documento):
    try:
        res = (
            supabase
            .table("documentos")
            .select("codigo_verificador, fecha_vigencia")
            .eq("documento", documento)
            .limit(1)
            .execute()
        )

        if not res.data:
            return None, None

        row = res.data[0]
        return row["codigo_verificador"], row["fecha_vigencia"]

    except Exception:
        return None, None
