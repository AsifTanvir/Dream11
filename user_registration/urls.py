from . import views
from django.conf.urls import url, include

app_name = "user_registration"


urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^register/$', views.register, name="register"),
    url(r'^register/login/$', views.registration, name="registration"),
    url(r'^login/$', views.login, name="login"),
    url(r'^Admin/$', views.Admin, name='admin'),
    url(r'^Admin/csv/$', views.upload_csv, name='upload_csv'),
    url(r'^login/loggedIN/CRT/$', include('create_team.urls')),
]