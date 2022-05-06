from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = Review
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
  name = serializers.SerializerMethodField(read_only=True)
  isAdmin = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = User
    fields = ["id", "username", "email", "name", "isAdmin"]

  def get_name(self,obj):
    name = obj.first_name + " " + obj.last_name
    if name == "":
      name = obj.email

    return name

  def get_isAdmin(self,obj):
    return obj.is_staff
    
class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model = User
    fields = ["id", "username", "email", "name", "isAdmin", "token"]

  def get_token(self,obj):
      token = RefreshToken.for_user(obj)
      return str(token)
    