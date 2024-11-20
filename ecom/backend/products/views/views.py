from rest_framework import generics
from products.serializers.serializers import ProductSerializer,CategorySerializer,CommentSerializer
from products.models import Product,Category,Comment
from products.filter import ProductFilter
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import status
from rest_framework import viewsets
from rest_framework.decorators import action
from django.db.models import Q
class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        queryset = Product.objects.all()
        user_query = self.request.query_params.get('query', None)

        if user_query:
            # Combine all filters using Q objects
            queryset = queryset.filter(
                Q(name__icontains=user_query) |
                Q(category__name__icontains=user_query) |
                Q(tags__name__icontains=user_query)
            ).distinct()
        return queryset

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

class CommentListView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()

    @action(detail=False,methods=['GET'],url_path='product_comments/(?P<product_id>\d+)')
    def product_comments(self,request,product_id):
        comments = Comment.objects.filter(product=product_id)
        if comments:
            serializer = self.get_serializer(comments,many=True)
            return Response(serializer.data)
        else:
            return Response({
                'msg': 'No comments found.'
            })


    @action(detail=False,methods=['GET'],url_path='average_rating/(?P<product_id>\d+)')
    def average_rating(self,request,product_id=None):
        comments = Comment.objects.filter(product=product_id)
        if comments:
            count = len(comments)
            average_rating = sum(comment.rating for comment in comments)/count
            return Response({
                'rating': average_rating, 'count': count
            })
        else:
            return Response({
                'msg': 'No comments found.'
            })

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
