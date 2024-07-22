from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=500)
    company = models.CharField(max_length=500)
    description = models.TextField()
    price = models.IntegerField()
    quantity = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    