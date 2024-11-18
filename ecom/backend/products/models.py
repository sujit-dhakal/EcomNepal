from django.db import models
from users.models import CustomUser
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='media/images',default='media/images/tshirt.jpg')
    price = models.DecimalField(decimal_places=2,max_digits=5)
    stock = models.IntegerField()

    def __str__(self):
        return self.name


class Comment(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    content = models.TextField()
    rating = models.PositiveBigIntegerField(null=True,blank=True,choices=[(i,i) for i in range(1,6)])

    def __str__(self):
        return f"{self.user} - {self.product} ({self.rating} stars)"