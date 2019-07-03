from django.conf.urls import url
from . import views

app_name="user_registration"


urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^register/$', views.register, name="register"),
    url(r'^register/login/$', views.registration, name="registration"),
    url(r'^login/loggedIN/$', views.loggedin, name="loggedIN"),
    url(r'^login/loggedIN/search/$', views.player_search, name="search"),
    url(r'^login/$', views.login, name="login"),
    url(r'^login/loggedIN/profile/(?P<name>[a-zA-Z0-9 "\'!?.-]+)/$', views.profileView , name="profile"),
    url(r'^Admin/$',views.Admin, name= 'admin'),
    url(r'^Admin/csv/$',views.upload_csv, name= 'upload_csv')

]