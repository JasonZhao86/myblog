from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse, HttpResponseBadRequest
from django.conf import settings
from user.models import User
import simplejson
import jwt
import datetime
import bcrypt


AUTH_EXPIRE = 24 * 8 * 8

def authenticate(view):
    def __wrapper(request: HttpRequest, **kwargs):
        payload = request.META.get("HTTP_JWT")
        if not payload:
            return HttpResponseBadRequest("Header http_jwt not found")
        try:
            payload = jwt.decode(payload, settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
        except Exception as e:
            return HttpResponseBadRequest()
        current = datetime.datetime.now().timestamp()
        if (current - payload.get("timestamp", 0)) > AUTH_EXPIRE:
            return HttpResponse(status=401)
        try:
            user_id = payload.get("user_id", -1)
            user = User.objects.get(pk=user_id)
            request.user = user
        except Exception as e:
            print(e)
            return HttpResponseBadRequest()
        res = view(request, **kwargs)
        return res
    return __wrapper


def authenticate_new(view):
    def __wrapper(request: HttpRequest, **kwargs):
        payload = request.META.get("HTTP_JWT")
        if not payload:
            return HttpResponseBadRequest("Header http_jwt not found")
        try:
            payload = jwt.decode(payload, settings.SECRET_KEY, algorithms=["HS256"])
            print(payload)
        except jwt.ExpiredSignatureError as e:
            print(e)
            return HttpResponse(status=401)
        except Exception as e:
            print(e)
            return HttpResponseBadRequest()
        try:
            user_id = payload.get("user_id", -1)
            user = User.objects.get(pk=user_id)
            request.user = user
        except Exception as e:
            print(e)
            return HttpResponseBadRequest()
        res = view(request, **kwargs)
        return res
    return __wrapper


def gen_token(user_id):
    return jwt.encode(
        {
            "user_id": user_id,
            "timstamp": int(datetime.datetime.now().timestamp()),
            "exp": int(datetime.datetime.now().timestamp()) + AUTH_EXPIRE,
        },
        settings.SECRET_KEY,
        algorithm="HS256"
    )


def reg(request: HttpRequest):
    print(request.POST)
    print(request.body)
    payload = simplejson.loads(request.body)
    try:
        email = payload["email"]
        query = User.objects.filter(email=email)
        if query:
            return HttpResponseBadRequest("用户已存在")
        name = payload["name"]
        password = payload["password"]
        user = User()
        user.name = name
        user.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        user.email = email
        try:
            user.save()
            return JsonResponse({"user": gen_token(user.id)})
        except:
            raise
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()


def login(request: HttpRequest):
    payload = simplejson.loads(request.body)
    try:
        user = User.objects.get(email=payload["email"])
        if bcrypt.checkpw(payload["password"].encode(), user.password.encode()):
            token = gen_token(user.id)
            print(token)
            res = JsonResponse({
                "user": {
                    "user_id": user.id,
                    "name": user.name,
                    "user_email": user.email,
                },
                "token": token
            })
            res.set_cookie('jwt', token)
            return res
        else:
            return HttpResponseBadRequest("账户名或密码不正确")
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()
