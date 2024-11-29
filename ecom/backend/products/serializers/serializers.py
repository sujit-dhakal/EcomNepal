from rest_framework import serializers
from products.models import Product,Category,Comment


class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_average_rating(self, obj):
        comments = Comment.objects.filter(product=obj)
        if comments.exists():
            count = comments.count()
            average_rating = sum(comment.rating for comment in comments) / count
            return {'rating': average_rating, 'count': count}
        return {'rating': None, 'count': 0}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    product_id = serializers.IntegerField(source='product.id', read_only=True)
    product = serializers.CharField(source='product.name', read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'product_id','product','user','content','rating']