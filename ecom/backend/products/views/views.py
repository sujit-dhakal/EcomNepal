from rest_framework import generics
from products.serializers.serializers import ProductSerializer,CategorySerializer
from products.models import Product,Category
from products.filter import ProductFilter
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProductFilter

class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = 'id'

class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
class ProductFilterView(APIView):
    def get(self,request,name):
        category = Category.objects.filter(name=name).first()
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)