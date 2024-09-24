from django.urls import path
from products.views.views import ProductView,ProductDetailView,ProductFilterView,CategoryList

urlpatterns = [
    path('products/',ProductView.as_view(),name="products"),
    path('product/<int:id>',ProductDetailView.as_view(),name="product-details"),
    path('product-filter/<str:name>/',ProductFilterView.as_view(),name="product-filter"),
    path('categories/',CategoryList.as_view(),name="categories")
]