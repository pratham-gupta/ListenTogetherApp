from django.db import models
import random
import string

# Create your models here.


def generate_unique_code():
    """
    return a unique code lenght = 6(k)
    checks if the code exist, if no simply returns the code."""

    length = 6
    while True:
        code = "".join(random.choices(string.ascii_uppercase,k=length))
        if (Room.objects.filter(room_code=code).count() == 0):
            return code
    return code





"""
Room Model to save Info about unique 6 letter code, generated randomly at time of room creation
host id 
Boolean to alter the permission whether a guest can pause or not
votes to skip 
creation timestamp
current song video id (from youtube's api)"""

class Room(models.Model):

    ROOM_TYPE_CHOICES = (
        ('VP','Virtual Party'),
        ('HP',"House Party")
    )


    room_code = models.CharField(max_length=8,default=generate_unique_code,unique=True)
    host = models.CharField(max_length=50,unique=True)
    guest_can_pause = models.BooleanField(null=False,default=False)
    votes_to_skip = models.IntegerField(null=False,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50,null=True)
    max_users = models.IntegerField(null=False,default=10)
    room_type = models.CharField(max_length=2,choices=ROOM_TYPE_CHOICES)




class Vote(models.Model):
    pass


class ActiveUsers(models.Model):
    pass

