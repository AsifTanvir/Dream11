from django.conf.urls import url
from . import views

app_name="core"

urlpatterns = [
    url(r'^login/loggedIN/$', views.coredex, name="index")
]