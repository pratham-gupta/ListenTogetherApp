from django.contrib import admin
from api.models import Room

# Register your models here.

# class RoomAdmin(admin.ModelAdmin):
#     class Meta:
#         model = Room
#         fields = ('votes_to_skip','guest_can_pause')

admin.site.register(Room)