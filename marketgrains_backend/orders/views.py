from rest_framework import generics, permissions

from .models import Order
from .serializers import CreateOrderSerializer, OrderSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Order.objects
            .filter(customer=self.request.user)
            .prefetch_related('items')
            .order_by('-created_at')
        )

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer

        return OrderSerializer

    def perform_create(self, serializer):
        self.created_order = serializer.save()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = OrderSerializer(self.created_order).data
        return response
