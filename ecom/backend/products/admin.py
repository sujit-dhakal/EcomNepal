from django.contrib import admin
from django.core.management import call_command
from admin_extra_buttons.api import ExtraButtonsMixin, button
from .models import Category, Product, Comment

class CategoryAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = ('id', 'name')

class ProductAdmin(ExtraButtonsMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'stock')

    @button(
        label='Seed Product Catalog',
        html_attrs={'style': 'background-color:#88FF88;color:black'}
    )
    def seed_products(self, request):
        call_command('seed_products')
        self.message_user(request, "The product catalog has been seeded successfully.")

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Comment)
