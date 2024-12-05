from django.urls import path,include
from rest_framework.routers import DefaultRouter
from order.views.views import CreatePayPalOrderView,CapturePayPalOrderView,OrderView

router = DefaultRouter()
router.register('orders', OrderView, basename='order')

urlpatterns = [
    path('create-paypal-order/',CreatePayPalOrderView.as_view(),name="create-paypal-order"),
    path('capture-paypal-order/',CapturePayPalOrderView.as_view(),name="capture-paypal-order"),
    path('', include(router.urls)),
]