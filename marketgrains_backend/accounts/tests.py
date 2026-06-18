from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class AuthFlowTests(APITestCase):
    def test_register_returns_tokens_and_user(self):
        response = self.client.post(reverse('register'), {
            'username': 'buyer1',
            'email': 'buyer@example.com',
            'password': 'strong-pass-123',
            'role': 'buyer',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['email'], 'buyer@example.com')
        self.assertEqual(response.data['user']['role'], 'buyer')

        user = User.objects.get(email='buyer@example.com')
        self.assertTrue(user.check_password('strong-pass-123'))

    def test_login_rejects_wrong_password(self):
        User.objects.create_user(
            username='buyer1',
            email='buyer@example.com',
            password='correct-password',
            role='buyer',
        )

        response = self.client.post(reverse('login'), {
            'email': 'buyer@example.com',
            'password': 'wrong-password',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_returns_tokens_and_user_for_valid_credentials(self):
        User.objects.create_user(
            username='buyer1',
            email='buyer@example.com',
            password='correct-password',
            role='buyer',
        )

        response = self.client.post(reverse('login'), {
            'email': 'buyer@example.com',
            'password': 'correct-password',
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertEqual(response.data['user']['email'], 'buyer@example.com')

    def test_me_requires_valid_access_token(self):
        register_response = self.client.post(reverse('register'), {
            'username': 'buyer1',
            'email': 'buyer@example.com',
            'password': 'strong-pass-123',
            'role': 'buyer',
        }, format='json')
        token = register_response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(reverse('me'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'buyer@example.com')
