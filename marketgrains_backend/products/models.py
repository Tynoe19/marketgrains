from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    image = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    

    def __str__(self):
        return self.name
class Package(models.Model):
    products= models.ManyToManyField(Product, through="PackageItem", related_name='packages')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order_value = models.DecimalField(max_digits=10, decimal_places=2)
    sales_value = models.DecimalField(max_digits=10, decimal_places=2)
    profit = models.DecimalField(max_digits=10, decimal_places=2)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
class PackageItem(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='package_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    product_weight = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)  # Weight in kg


    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.package.name}"
