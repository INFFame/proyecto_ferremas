import requests
from django.core.cache import cache

def valorDolar():
    dolar = cache.get('valor_dolar_actualizado')
    
    if dolar is None:
        response = requests.get('https://mindicador.cl/api/dolar')
        data = response.json()
        dolar = data['serie'][0]['valor']
        cache.set('valor_dolar_actualizado', dolar, timeout=7200)
    
    return dolar