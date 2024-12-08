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
from products.product_recommender import ProductSearch
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

    @action(detail=False,methods=['GET'],url_path='my_comments', permission_classes=[IsAuthenticated])
    def user_comments(self,request):
        user = request.user
        comments = Comment.objects.filter(user=user)
        if comments.exists():
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
        serializer = CommentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'msg':'created comment successfully'
            },status=status.HTTP_200_OK)
        return Response({
            'msg':'failed to create comment'
        },status=status.HTTP_400_BAD_REQUEST)

class ProductRecommendView(APIView):
    def __init__(self):
        super().__init__()
        self.search_engine = ProductSearch()
        self.initialize_search_engine()

    def initialize_search_engine(self):
        try:
            products = Product.objects.all()
            if not products.exists():
                print("Warning: No products found in database")
            self.search_engine.fit(products)
        except Exception as e:
            print(f"Error initializing search engine: {str(e)}")

    def get(self, request):
        try:
            query = request.GET.get('q', '').strip()

            if not query:
                return Response(
                    {'error': 'Query parameter "q" is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if len(query) < 2:
                return Response(
                    {'error': 'Query must be at least 2 characters long'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            try:
                num_results = int(request.GET.get('limit', 20))
                num_results = min(max(1, num_results), 20)
            except ValueError:
                num_results = 20

            product_id = request.GET.get('product_id')
            if product_id is not None:
                try:
                    product_id = int(product_id)
                except ValueError:
                    return Response(
                        {'error': 'Invalid product_id parameter'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Perform search
            results = self.search_engine.search(query, product_id, num_results=num_results)

            # Format response
            response_data = [{
                'id': result['product'].id,
                'name': result['product'].name,
                'description': result['product'].description,
                'price': result['product'].price,
                'image': f"http://django-app:8000/media{result['product'].image}",
                'stock': result['product'].stock,
                'score': round(float(result['similarity_score']), 4)
            } for result in results]

            return Response({
                'query': query,
                'count': len(response_data),
                'results': response_data
            })

        except Exception as e:
            print(f"Search error: {str(e)}")
            return Response(
                {'error': 'An error occurred while processing your search'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
