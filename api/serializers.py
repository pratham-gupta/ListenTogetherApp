from rest_framework import serializers
from api.models import Room



class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id','room_code','host','guest_can_pause','votes_to_skip','created_at','max_users','current_song','room_type')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause','votes_to_skip','max_users','room_type')
