from django.core.management.base import BaseCommand

from products.models import Product

SEED_PRODUCTS = [
    {
        'name': 'Mhunga',
        'description': 'Traditional African pearl millet.',
        'price': '10.99',
        'category': 'mhunga',
        'image': '',
    },
    {
        'name': 'Zviyo',
        'description': 'Finger millet — a staple grain rich in nutrients.',
        'price': '12.99',
        'category': 'zviyo',
        'image': '',
    },
    {
        'name': 'Mapfunde',
        'description': 'Sorghum grain for porridge and baking.',
        'price': '9.99',
        'category': 'mapfunde',
        'image': '',
    },
    {
        'name': 'Dovi',
        'description': 'Groundnut butter — creamy and natural.',
        'price': '14.99',
        'category': 'dovi',
        'image': '',
    },
    {
        'name': 'Huchi',
        'description': 'Pure natural honey from local beekeepers.',
        'price': '19.99',
        'category': 'huchi',
        'image': '',
    },
]


class Command(BaseCommand):
    help = 'Seed the catalogue with default products if they do not exist yet.'

    def handle(self, *args, **options):
        created_count = 0

        for item in SEED_PRODUCTS:
            _, created = Product.objects.get_or_create(
                name=item['name'],
                defaults=item,
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Seed complete. {created_count} new product(s) added, '
                f'{Product.objects.count()} total in catalogue.'
            )
        )
