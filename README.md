### 1、技术栈
前端：
* React 16.x
* Ant Design 3.x
<br />

后端：
* python 3.x
* django 4.0
<br />

### 2、运行后端代码
#### 2.1、安装依赖包
```shell script
cd backend
pip install -r requirements.txt
```
<br />

#### 2.2、修改数据库链接地址
&emsp;&emsp;`blog/settings.py`：
```shell script
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog',
        'USER': 'root',
        'PASSWORD': '123.com',
        'HOST': '172.31.1.10',
        'PORT': 3306,
    }
}
```
<br />

#### 2.3、同步数据库
```shell script
python manage.py makemigrations
python manage.py migrate
```
<br />

#### 2.4、运行服务
```shell script
python manage.py runserver
```
<br />

### 3、运行前端代码
#### 3.1、安装依赖包
```shell script
cd blog_web
npm install
```
<br />

#### 3.2、修改后端链接地址
&emsp;&emsp;`webpack.conf.dev.js`：
```shell script
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                pathRewrite: {"^/api": ""},
                changeOrigin: true
            }
        }
```
<br />

#### 3.3、运行前端代码
```shell script
npm run start
```