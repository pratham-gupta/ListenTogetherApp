from django.urls import path
from frontend.views import index

app_name = 'frontend'

urlpatterns = [
    path("",index,name=""),
    path("player",index),
    path("create-room",index),
    path("room/<str:roomCode>",index),
]