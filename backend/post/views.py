from django.http import HttpRequest, JsonResponse, HttpResponseBadRequest
from user.views import authenticate_new
from user.models import User
from post.models import Post, Content
import simplejson
import datetime
import math


def validate(d:dict, name:str, type_func, default, validate_func):
    try:    # 页码
        result = type_func(d.get(name, default))
        result = validate_func(result, default)
    except Exception as e:
        result = default
    return result


def getall(request: HttpRequest):
    page = validate(request.GET, "page", int, 1, lambda x, y: x if x > 0 else y)
    size = validate(request.GET, "size", int, 20, lambda x, y: x if x > 0 and x < 101 else y)

    try:
        start = (page - 1) * size
        posts = Post.objects.order_by("-id")
        count = posts.count()
        post_list = posts[start:start + size]
        print(post_list.query)
        return JsonResponse({
            "posts": [
                {"post_id": post.id, "post_title": post.title}
                for post in post_list
            ],
            "pagination": {
                "page": page,
                "size": size,
                "count": count,
                "pages": math.ceil(count / size)
            }
        })
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()


def get(request: HttpRequest, id: str):
    try:
        post_id = int(id)
        post = Post.objects.get(pk=post_id)
        if post:
            return JsonResponse({
                "post": {
                    "post_id": post.id,
                    "title": post.title,
                    "author": post.author.name,
                    "author_id": post.author_id,
                    "postdate": post.postdate.timestamp(),
                    "content": post.content.content
                }
            })
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()


@authenticate_new
def pub(request: HttpRequest):
    content = Content()
    post = Post()
    try:
        payload = simplejson.loads(request.body)
        post.title = payload["title"]
        post.author = User(id=request.user.id)
        post.postdate = datetime.datetime.now(
            datetime.timezone(datetime.timedelta(hours=8))
        )
        post.save()

        content.content = payload["content"]
        content.post = post
        content.save()
        return JsonResponse({"post_id": post.id})
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()

