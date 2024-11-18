from django.contrib import admin
from admin_extra_buttons.api import ExtraButtonsMixin, button
from faker import Faker
from .models import Category, Product, Comment
import random

fake = Faker()

class CategoryAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = ('id', 'name')

class ProductAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'stock')

    @button(
        label='Seed 10 Products',
        html_attrs={'style': 'background-color:#88FF88;color:black'}
    )
    def seed_products(self, request):
        categories = list(Category.objects.all())

        if not categories:
            self.message_user(request, "Please create categories first.", level='ERROR')
            return

        for _ in range(10):
            random_category = random.choice(categories)
            category = Category.objects.filter(name=random_category).first()

            Product.objects.create(
                category=category,
                name=fake.name(),
                description=fake.text(),
                price=random.uniform(10, 1000),
                stock=random.randint(0, 100)
            )

        self.message_user(request, "10 fake products have been added successfully.")

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Comment)