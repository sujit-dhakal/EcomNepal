from rest_framework import generics
from products.serializers.serializers import ProductSerializer,CategorySerializer
from products.models import Product,Category
from products.filter import ProductFilter
from django_filters import rest_framework as filters
from rest_framework.views import APIView
from rest_framework.response import Response
from products.product_recommender import ProductSearch
from rest_framework import status
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
            # Get and validate query parameter
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

            # Get number of results parameter (optional)
            try:
                num_results = int(request.GET.get('limit', 5))
                num_results = min(max(1, num_results), 20)  # Limit between 1 and 20
            except ValueError:
                num_results = 5

            # Perform search
            results = self.search_engine.search(query, num_results=num_results)

            # Format response
            response_data = [{
                'id': result['product'].id,
                'name': result['product'].name,
                'description': result['product'].description,
                'price': result['product'].price,
                'stock': result['product'].stock,
                'score': round(float(result['similarity_score']), 4)
            } for result in results]

            return Response({
                'query': query,
                'count': len(response_data),
                'results': response_data
            })

        except Exception as e:
            print(f"Search error: {str(e)}")  # For debugging
            return Response(
                {'error': 'An error occurred while processing your search'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
