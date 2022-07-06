from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework import status
from base.models import OrderItem, ShippingAddress, Order, Product
from base.serializers import ProductSerializer, OrderSerializer, UserSerializer


@api_view(["POST"])
@permission_classes(["IsAuthenticated"])
def addOrderItems(request):

  user = request.user 
  data = request.data
  orderItems = data['orderItems']

  if orderItems and len(orderItems) == 0:
    return Response({"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST)
  else:
    #create order
    order = Order.objects.create(
      user=user,
      paymentMethod=data["paymentMethod"],
      taxPrice=data["taxPrice"],
      shippingPrice=data["shippingPrice"],
      totalPrice=data["totalPrice"]
    )
  
    #create shipping address
    shipping = ShippingAddress.objects.create(
      
      order=order,
      address=data["shippingAddress"]["address"],
      city=data["shippingAddress"]["city"],
      postalCode=data["shippingAddress"]["postalCode"],
      province=data["shippingAddress"]["province"],
      country=data["shippingAddress"]["country"],
      phoneNumber=data["shippingAddress"]["phoneNumber"]
      
    )
    #create order and set order to orderItem relationship
    for i in orderItems:
      product = Product.objects.get(id=i["product"])
      item = OrderItem.objects.create(
        product=product,
        order=order,
        name=product.name,
        quantity=i["price"],
        price=i["price"],
        image=product.image.url
      )

    #update stock

    product.stock -= item.quantity
    product.save()
  serializer = OrderSerializer(order, many=True) 
  return Response(serializer.data)