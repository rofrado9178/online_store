# Generated by Django 4.0.4 on 2022-07-13 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='province',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
