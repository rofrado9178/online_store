from os import access
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import *
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView




# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    #customize user info token
    def validate(self,attribute):
      data = super().validate(attribute)

      serializer = UserSerializerWithToken(self.user).data

      for key, value in serializer.items():
        data[key] =  value
        
      
      return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
  routes = [
    "/api/products",
    "/api/products/create/",
    "/api/products/upload/",
    "/api/products/<id>/reviews/",
    "/api/products/top/",
    "/api/products/<id>/",
    "/api/products/delete/<id>/",
    "/api/products/<update>/<id>",
  ]
  return Response(routes)

@api_view(["GET"])
def getProducts(request):
  products = Product.objects.all()
  serializer = ProductSerializer(products, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def getProduct(request, id):
  product = Product.objects.get(id=id)
  serializer = ProductSerializer(product, many=False)
  return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user,many=False)
  return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)