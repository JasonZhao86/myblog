from django.urls import path, re_path, include
from user.views import reg, login

urlpatterns = [
    re_path(r'^reg/$', reg),
    re_path(r'^login/$', login),
]
