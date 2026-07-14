from rest_framework import serializers
from .models import Product, Package, PackageItem


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
    class PackageItemSerializer(serializers.ModelSerializer):
        product_name = serializers.CharField(source='product.name', read_only=True)  # Get the product name from the related Product model
        class Meta:
            model = PackageItem  # Get the related model for the package_items field
            fields = ['id', 'product', 'product_name', 'quantity', 'product_weight']

    
    package_items = PackageItemSerializer(many=True, read_only=True)  # Use the related_name for the reverse relationship


    class Meta:
        model = Package
        fields = ['id', 'name', 'description', 'order_value', 'sales_value', 'profit', 'featured', 'is_active', 'created_at', 'package_items']  # Include the package_items field in the serialized output