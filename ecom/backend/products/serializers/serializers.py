from rest_framework import serializers
from products.models import Product,Category,Comment


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


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