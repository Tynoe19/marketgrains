from django.db import transaction
from rest_framework import serializers

from products.models import Product
from .models import Order, OrderItem


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderItemSerializer(serializers.ModelSerializer):
    line_total = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'product',
            'product_name',
            'quantity',
            'unit_price',
            'line_total',
        )


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'customer',
            'order_type',
            'status',
            'total',
            'items',
            'created_at',
        )
        read_only_fields = fields


class CreateOrderSerializer(serializers.Serializer):
    items = OrderItemInputSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError('Order must include at least one item.')

        return value

    @transaction.atomic
    def create(self, validated_data):
        user = self.context['request'].user
        order = Order.objects.create(customer=user)
        total = 0

        for item_data in validated_data['items']:
            product = Product.objects.filter(
                id=item_data['product_id'],
                is_active=True,
            ).first()

            if product is None:
                raise serializers.ValidationError({
                    'items': 'One or more products are unavailable.'
                })

            quantity = item_data['quantity']
            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                quantity=quantity,
                unit_price=product.price,
            )
            total += product.price * quantity

        order.total = total
        order.save(update_fields=['total'])
        return order
