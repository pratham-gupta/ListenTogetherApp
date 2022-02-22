from django.urls import path
from api.views import CreateRoomView, RoomView, JoinRoom,GetRoom,UserInRoom


urlpatterns = [
    path('create-room',CreateRoomView.as_view()),
    path('rooms',RoomView.as_view()),
    path('join-room',JoinRoom.as_view()),
    path('get-room',GetRoom.as_view()),
    path('user-in-room',UserInRoom.as_view()),
]