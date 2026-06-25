from django.contrib import admin

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'order_type', 'status', 'total', 'created_at')
    list_filter = ('order_type', 'status', 'created_at')
    search_fields = ('customer__email', 'customer__username')
    inlines = [OrderItemInline]
