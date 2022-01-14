"""blog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.http import HttpRequest, JsonResponse, HttpResponse
from django.template import loader, RequestContext
from django.shortcuts import render


def index(request: HttpRequest):
    d = {}
    d['method'] = request.method
    d['path'] = request.path
    d['path_info'] = request.path_info
    d['GetParams'] = request.GET
    return JsonResponse(d)


def index2(request: HttpRequest):
    # template = loader.get_template("index.html")
    # context = RequestContext(request, {"context": "www.w3cschool.com"})
    # return HttpResponse(template.render({"context": "www.w3cschool.com"}))
    return render(request, "index.html", {"context": "www.w3cschool.com"})


def testfor(request: HttpRequest):
    return render(request, "testfor.html", {"dct": dict(zip("abcde", range(1, 6)))})


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', index),
    re_path(r'^index/$', index),
    re_path(r'^index2/$', index2),
    re_path(r'^testfor/$', testfor),
    re_path(r'^user/', include('user.urls')),
    re_path(r'^post/', include('post.urls')),
]
