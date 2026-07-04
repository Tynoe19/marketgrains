from rest_framework import serializers
from .models import Product, Package


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = '__all__'  

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product.category.field.related_model  # Get the related model for the category field
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    products = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Product.objects.all()
    )
    class Meta:
        model = Package
        fields = ['id', 'name', 'description', 'order_value', 'sales_value', 'profit', 'featured', 'products']