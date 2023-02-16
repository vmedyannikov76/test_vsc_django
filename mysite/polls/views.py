from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse('Привет, здесь будет приложение опросов')

# Create your views here.
