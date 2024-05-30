from rest_framework import serializers
from .models import Categoria, Producto, PrecioProducto
from .utils import valorDolar

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('id', 'name',)

class PrecioProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecioProducto
        fields = ['fecha', 'valor']

class ProductoSerializer(serializers.ModelSerializer):
    precios = PrecioProductoSerializer(many=True, read_only=True)
    categoria = CategoriaSerializer(source='cat', read_only=True)
    valorFinal = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = ['id', 'codigo_producto', 'marca', 'codigo', 'name', 'stock', 'categoria', 'precios', 'valorFinal']

    def get_valorFinal(self, obj):
        dolar_value = valorDolar()
        if obj.precios.exists():
            precio = obj.precios.latest('fecha').valor
            return precio * dolar_value
        return None