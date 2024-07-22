import json
from django.http import JsonResponse
from django.shortcuts import render
from .models import Product
from rest_framework.decorators import api_view
# Create your views here.

def getProducts(request):
    products = list(Product.objects.all().values())
    return JsonResponse(products,safe=False)


@api_view(('POST',))
def addProduct(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)
            print(data)
            product = Product(
                    name=data['name'],
                    company=data['company'],
                    description=data['description'],
                    price=data['price'],
                    quantity=data['quantity']
                )
            product.save()
            products = list(Product.objects.all().values())
            return JsonResponse(products, safe=False, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@api_view(('POST',))
def deleteProduct(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)
            id = data['id']
            
            item = Product.objects.get(id = id)
            item.delete()
            
            products = list(Product.objects.all().values())
            return JsonResponse(products, safe=False, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    

@api_view(('POST',))
def updateProduct(request):
    if request.method =="POST":
        try:
            data = json.loads(request.body)
            item = Product.objects.get(id = data['id'])
            item.name=data['name']
            item.company=data['company']
            item.description=data['description']
            item.price=data['price']
            item.quantity=data['quantity']
            item.save()
            
            products = list(Product.objects.all().values())
            return JsonResponse(products, safe=False, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)