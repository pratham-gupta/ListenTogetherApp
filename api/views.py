from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from api.models import Room
from api.serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.response import Response
from django.http import JsonResponse
import json


# Create your views here.


class RoomView(generics.ListAPIView):
    """
    List API view to see all created rooms, endpoint at /api/rooms

    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):

    serializer_class = CreateRoomSerializer


    def post(self,request,format=None):
        print('request recieved.')
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        print(request.data)
        # print(request.data)
        if serializer.is_valid():
            print('checking validity')
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            max_users = serializer.data.get('max_users')
            current_song = serializer.data.get('current_song')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)

            if queryset.exists():
                print('querset exits')
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.max_users = max_users
                room.save(update_fields=['guest_can_pause','votes_to_skip','max_users'])
                print('room already present.')

                # storing the room code in user's session data. Upon next login, room code can be fetched directly.
                self.request.session['room_code'] = room.room_code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(host=host,guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip,max_users=max_users)
                room.save()
                print('roomc crceated')
                self.request.session['room_code'] = room.room_code
                return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)

        return Response({'Bad Request':'Invalid Data....'},status=status.HTTP_400_BAD_REQUEST)



class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'room_code'

    def get(self,request,format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(room_code=code)
            if len(room) > 0:
                data = self.serializer_class(room[0]).data
                data['is_host'] = (self.request.session.session_key == data['host'])
                return Response(data,status=status.HTTP_200_OK)
            return Response({'Bad Request':'Room Not Found!'},status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'Bad Request':'Code parameters not found'},status=status.HTTP_400_BAD_REQUEST)



class JoinRoom(APIView):
    lookup_url_kwarg = 'room_code'

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(room_code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = room.room_code
                if self.request.session.session_key == room.host:
                    return Response({'message':'Room Joined! Welcome back host'},status=status.HTTP_200_OK)
                else:
                    return Response({'message':'Room Joined'},status=status.HTTP_200_OK)
            else:
                return Response({'Bad Request':'Invalud code. Room does not exist'},status=status.HTTP_400_BAD_REQUEST)
                

        else:
            return Response({'Bad Request':"Please provide valid input"},status=status.HTTP_400_BAD_REQUEST)





class UserInRoom(APIView):
    """endpoint to get the room code for existing/already logged in user using the sessions data.
        endpoint at /api/user-in-room
    """

    def get(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'room_code':self.request.session.get('room_code')
        }


        return JsonResponse(data, status=status.HTTP_200_OK)