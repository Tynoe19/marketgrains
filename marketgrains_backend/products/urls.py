from django.urls import path
from .views import CategoryListCreateView, PackageViewSet, ProductListCreateView, ProductDetailView 

urlpatterns = [
    path('', ProductListCreateView.as_view(), name='product-list-create'),
    path('<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('packages/', PackageViewSet.as_view({'get': 'list', 'post': 'create'}), name='package-list-create'),
    path('packages/<int:pk>/', PackageViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='package-detail'),
]   