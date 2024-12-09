from django.db import models
from users.models import CustomUser
from products.models import Product

class CartItem(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    # is_direct_purchase = models.BooleanField(default=False)

    # class Meta:
    #     unique_together = ('user', 'product', 'is_direct_purchase')

    def __str__(self):
        return f"{self.user}-{self.product.name}"
