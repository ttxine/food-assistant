# Generated by Django 4.0 on 2021-12-28 12:44

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import positions.fields
import src.base.services


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название категории')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название еды')),
            ],
            options={
                'verbose_name': 'Еда',
                'verbose_name_plural': 'Еда',
            },
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveSmallIntegerField(verbose_name='Количество')),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.food', verbose_name='Еда')),
            ],
            options={
                'verbose_name': 'Ингредиент',
                'verbose_name_plural': 'Ингредиенты',
            },
        ),
        migrations.CreateModel(
            name='NationalCuisine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название кухни')),
            ],
            options={
                'verbose_name': 'Национальная кухня',
                'verbose_name_plural': 'Национальные кухни',
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='Обозначение единицы измерения')),
            ],
            options={
                'verbose_name': 'Единица измерения',
                'verbose_name_plural': 'Единицы измерения',
            },
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название рецепта')),
                ('description', models.TextField(blank=True, max_length=2000, verbose_name='Описание рецепта')),
                ('duration', models.DurationField(verbose_name='Длительность приготовления')),
                ('pub_date', models.DateTimeField(verbose_name='Дата публикации рецепта')),
                ('is_draft', models.BooleanField(default=True, verbose_name='Черновик')),
                ('image', django_resized.forms.ResizedImageField(crop=['middle', 'center'], force_format='JPEG', keep_meta=True, quality=90, size=[1000, 500], upload_to=src.base.services.get_direction_image_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'png'])], verbose_name='Изображение указания к рецепту')),
                ('comment', models.TextField(blank=True, max_length=2000, verbose_name='Примечание')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.user', verbose_name='Автор рецепта')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.category', verbose_name='Категория рецепта')),
                ('ingridients', models.ManyToManyField(to='catalog.Ingredient', verbose_name='Ингридиенты')),
                ('national_cuisine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='catalog.nationalcuisine', verbose_name='Национальная кухня')),
            ],
            options={
                'verbose_name': 'Рецепт',
                'verbose_name_plural': 'Рецепты',
                'ordering': ['-pub_date'],
            },
        ),
        migrations.AddField(
            model_name='ingredient',
            name='unit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='count', to='catalog.unit', verbose_name='Единица измерения'),
        ),
        migrations.AddField(
            model_name='food',
            name='units',
            field=models.ManyToManyField(to='catalog.Unit', verbose_name='Допустимые единицы измерения'),
        ),
        migrations.CreateModel(
            name='Direction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='Текст указания к рецепту')),
                ('image', django_resized.forms.ResizedImageField(crop=['middle', 'center'], force_format='JPEG', keep_meta=True, quality=90, size=[700, 350], upload_to=src.base.services.get_direction_image_upload_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'png'])], verbose_name='Изображение указания к рецепту')),
                ('position', positions.fields.PositionField(blank=True, default=-1, null=True)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='directions', to='catalog.recipe', verbose_name='Рецепт')),
            ],
            options={
                'verbose_name': 'Указание к рецепту',
                'verbose_name_plural': 'Указания к рецепту',
                'ordering': ['position'],
            },
        ),
    ]
