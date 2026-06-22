from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from .models import Product


class ProductPermissionTests(APITestCase):
    def test_anyone_can_view_products(self):
        Product.objects.create(
            name='Mhunga',
            description='Traditional African grain.',
            price='10.99',
            category='mhunga',
        )

        response = self.client.get(reverse('product-list-create'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], 'Mhunga')

    def test_guest_cannot_create_product(self):
        response = self.client.post(reverse('product-list-create'), {
            'name': 'Zviyo',
            'description': 'Finger millet.',
            'price': '12.99',
            'category': 'zviyo',
        }, format='json')

        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN],
        )

    def test_admin_can_create_product(self):
        admin = User.objects.create_user(
            username='admin1',
            email='admin@example.com',
            password='strong-pass-123',
            role='admin',
        )
        self.client.force_authenticate(user=admin)

        response = self.client.post(reverse('product-list-create'), {
            'name': 'Mapfunde',
            'description': 'Sorghum grain.',
            'price': '9.99',
            'category': 'mapfunde',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
