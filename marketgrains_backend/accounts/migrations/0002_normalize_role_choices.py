from django.db import migrations, models


def normalize_role_values(apps, schema_editor):
    User = apps.get_model('accounts', 'User')

    role_map = {
        'Buyer': 'buyer',
        'Distributor': 'distributor',
        'Admin': 'admin',
        'Farmer': 'distributor',
    }

    for old_role, new_role in role_map.items():
        User.objects.filter(role=old_role).update(role=new_role)


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(normalize_role_values, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(
                choices=[
                    ('buyer', 'Buyer'),
                    ('distributor', 'Distributor'),
                    ('admin', 'Admin'),
                ],
                default='distributor',
                max_length=50,
            ),
        ),
    ]
