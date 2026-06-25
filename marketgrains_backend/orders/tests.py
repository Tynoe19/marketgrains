from decimal import Decimal

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from products.models import Product
from .models import Order, OrderItem


class OrderModelTests(TestCase):
    def test_order_item_calculates_line_total(self):
        user = User.objects.create_user(
            username='buyer1',
            email='buyer@example.com',
            password='strong-pass-123',
            role='buyer',
        )
        product = Product.objects.create(
            name='Mhunga',
            description='Traditional African grain.',
            price='10.99',
            category='mhunga',
        )
        order = Order.objects.create(customer=user)
        item = OrderItem.objects.create(
            order=order,
            product=product,
            product_name=product.name,
            quantity=3,
            unit_price=product.price,
        )

        self.assertEqual(item.product_name, 'Mhunga')
        self.assertEqual(item.line_total, Decimal('32.97'))


class OrderApiTests(APITestCase):
    def setUp(self):
        self.buyer = User.objects.create_user(
            username='buyer1',
            email='buyer@example.com',
            password='strong-pass-123',
            role='buyer',
        )
        self.other_buyer = User.objects.create_user(
            username='buyer2',
            email='buyer2@example.com',
            password='strong-pass-123',
            role='buyer',
        )
        self.product = Product.objects.create(
            name='Mhunga',
            description='Traditional African grain.',
            price='10.99',
            category='mhunga',
        )

    def test_guest_cannot_create_order(self):
        response = self.client.post(reverse('order-list-create'), {
            'items': [
                {'product_id': self.product.id, 'quantity': 2},
            ],
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_buyer_can_create_order(self):
        self.client.force_authenticate(user=self.buyer)

        response = self.client.post(reverse('order-list-create'), {
            'items': [
                {'product_id': self.product.id, 'quantity': 2},
            ],
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['total'], '21.98')
        self.assertEqual(response.data['items'][0]['product_name'], 'Mhunga')
        self.assertEqual(Order.objects.count(), 1)

    def test_buyer_cannot_order_inactive_product(self):
        self.client.force_authenticate(user=self.buyer)
        self.product.is_active = False
        self.product.save(update_fields=['is_active'])

        response = self.client.post(reverse('order-list-create'), {
            'items': [
                {'product_id': self.product.id, 'quantity': 1},
            ],
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Order.objects.count(), 0)

    def test_buyer_only_sees_their_own_orders(self):
        Order.objects.create(customer=self.buyer, total='10.99')
        Order.objects.create(customer=self.other_buyer, total='10.99')
        self.client.force_authenticate(user=self.buyer)

        response = self.client.get(reverse('order-list-create'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
