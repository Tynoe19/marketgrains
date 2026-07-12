from django.contrib import admin

from .models import Package, Product, Category, PackageItem


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'unit_price', 'is_active', 'created_at')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'category')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name',)

class PackageItemInline(admin.TabularInline):
    model = PackageItem
    extra = 1

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'order_value', 'sales_value', 'profit', 'featured', 'is_active', 'created_at')
    list_filter = ('featured', 'is_active')
    search_fields = ('name',)
    inlines = [PackageItemInline]

