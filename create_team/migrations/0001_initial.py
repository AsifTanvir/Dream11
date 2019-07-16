# Generated by Django 2.0.2 on 2019-07-16 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_registration', '0003_players'),
    ]

    operations = [
        migrations.CreateModel(
            name='SeriesList',
            fields=[
                ('Series_name', models.CharField(max_length=250, primary_key=True, serialize=False, unique=True)),
                ('No_of_matches', models.IntegerField()),
                ('Home_team', models.CharField(max_length=250)),
                ('Away_team', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='SeriesSquads',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Series_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='create_team.SeriesList')),
                ('Squad_player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_registration.Players')),
            ],
        ),
        migrations.CreateModel(
            name='TeamCreated',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Match_no', models.IntegerField()),
                ('Match_day', models.DateField()),
                ('Series_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='create_team.SeriesList')),
                ('User_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_registration.Users')),
            ],
        ),
        migrations.CreateModel(
            name='TeamPlayers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Players', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_registration.Players')),
                ('Team_created', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='create_team.TeamCreated')),
            ],
        ),
    ]
