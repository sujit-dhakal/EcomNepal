from django.urls import path,include
from products.views.views import ProductView,ProductDetailView,ProductFilterView,CategoryList,CommentListView,CommentPostView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('comments',CommentListView,basename='comments')

urlpatterns = [
    path('products/',ProductView.as_view(),name="products"),
    path('product/<int:id>',ProductDetailView.as_view(),name="product-details"),
    path('product-filter/<str:name>/',ProductFilterView.as_view(),name="product-filter"),
    path('categories/',CategoryList.as_view(),name="categories"),
    path('',include(router.urls)),
    path('comment/',CommentPostView.as_view(),name="post-comment")
]