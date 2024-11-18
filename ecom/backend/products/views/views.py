from rest_framework import generics
from products.serializers.serializers import ProductSerializer,CategorySerializer,CommentSerializer
from products.models import Product,Category,Comment
from products.filter import ProductFilter
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import status
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

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class CommentPostView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        serializer = CommentSerializer(request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'msg':'created comment successfully'
            },status=status.HTTP_200_OK)
        return Response({
            'msg':'failed to create comment'
        },status=status.HTTP_400_BAD_REQUEST)
