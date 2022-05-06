from os import access
from django.shortcuts import render
from django.http import JsonResponse
#for user authentication and admin and view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
#response back data
from rest_framework.response import Response
#import all models
from .models import *
#send back JSON data
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
#jwt token auth
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status






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

@api_view(["POST"])
def registerUser(request):

  data = request.data
  
  try:
    user = User.objects.create(
      first_name = data["first_name"],
      last_name = data["last_name"],
      username = data["email"],
      email = data["email"],
      password = make_password(data["password"])
    )

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)
  
  except:
    message = {"User with this email already exists"}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)