from django.shortcuts import render,get_object_or_404
from user_registration.models import Players,Users
from django.core.signing import Signer


def coredex(request):
    email = request.POST['email']
    password = request.POST['password']
    signer = Signer()
    original = signer.sign(password).split(':', 1)
    user = get_object_or_404(Users, email=email, password=original[1])
    return render(request, "build/index.html")
