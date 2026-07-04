from rest_framework import generics, permissions, viewsets
from .models import Category, Product, Package
from .serializers import CategorySerializer, ProductSerializer, PackageSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.role == 'admin')
        )


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        if (
            self.request.user.is_authenticated
            and (self.request.user.is_staff or self.request.user.role == 'admin')
        ):
            return Product.objects.all()

        return Product.objects.filter(is_active=True)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        if (
            self.request.user.is_authenticated
            and (self.request.user.is_staff or self.request.user.role == 'admin')
        ):
            return Category.objects.all()

        return Category.objects.filter(is_active=True)
    
class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all().prefetch_related('products')
    serializer_class = PackageSerializer
    permission_classes = [IsAdminOrReadOnly]        