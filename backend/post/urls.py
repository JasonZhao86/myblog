from django.urls import path, re_path
from post.views import getall, pub, get


urlpatterns = [
    re_path(r'^$', getall),
    re_path(r'^pub/$', pub),
    re_path(r'^(\d+)/$', get),
]
