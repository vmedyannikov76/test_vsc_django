from django.db import models
import datetime
from django.utils import timezone


class Question(models.Model):
    question_text = models.CharField(max_length=200, verbose_name='Вопрос')
    pub_date = models.DateTimeField('Дата публикации')

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

    def __str__(self):
        return self.question_text
    
    class Meta:
        ordering = ['-question_text']
        verbose_name = ('Вопрос')
        verbose_name_plural = ('Вопросы')



class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200, verbose_name='Текст выбора')
    votes = models.ImageField(default=0, verbose_name='Количество голосов')

    def __str__(self):
        return self.choice_text
    
    class Meta:
        verbose_name = 'Текст выбора'
        verbose_name_plural = 'Тексты выбора'

    
    
