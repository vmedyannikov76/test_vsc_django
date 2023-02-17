from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.http import Http404
from .models import Question
# from django.template import loader


def index(request):
    latest_question_list = Question.objects.order_by('pub_date')[:5]
    context = {
        'latest_question_list': latest_question_list,
    }
    return render(request, 'polls/index.html', context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/detail.html", {'question': question})


def results(request, question_id):
    response = f'Вы смотрите на результаты опроса по id {question_id}'
    return HttpResponse(response)


def vote(request, question_id):
    return HttpResponse(f'Вы голосуете по опросу id {question_id}')
