# Dream11
## Introduction:
For computer users of young ages who are highly interested in cricket
and strategy based games, the Fantasy Cricket League is a gaming
web site that allows users to serve as general managers of virtual
professional cricket team. Unlike traditional games, here the users do
not have to play directly. Instead they strategically selects players from
original cricket players.
  - **Project goals** – The goal of this project is to create a game based website.
  
  - **Project scope** – This project is a game that targets the young
  audiences. As Bangladesh is a cricket loving country and there
  is no official website that provides this kind of strategic
  gaming system, this project has a lot of scope in our country.
  
  - **Features** – The main feature of this game is that here the
  users select players from original players playing for their
  countries and create a team. Then point is given on the basis
  of the performance of the players the user has chosen. Here
  the user is given a fixed budget. The main challenge here is to
  choose perfect player combination within the budget that is
  more likely to give him better points. The user can see his
  position among all other users playing globally or he can
  create a league with few users and can see his positionamong the other league players.
  
## Software Used:
- **Backend**: For Backend we have used ***Django*** and ***REST API***
- **Database**: For Database we have used ***mysql***
- **Frontend**: For Frontend we have used ***React.js*** 

## App Description:
This section describes the requirements and the specifications of the
project. Fantasy Cricket League is an online gaming system. There are two
types of actors.
  1. **User**
  2. **Admin**
 
Users are the main actors. Any user who wants to play this game needs
to sign-in into the website. Then the user needs to create a team of his
own from the existing players list for each match. The user can modify
his team upto a certain time. The user can join any existing league or he
can create a league of his own. The user is given points on the basis of
the performance of the players that he has chosen. Keeping all these
things in mind, the project is divided into four subsystems.

- **Registration and Login**: In this subsystem, user will be able to
register and enter the main system.
- **Create Team**: After registration, user will create team for the first
time in this subsystem.
- **Modify Team**: Before a match, user can modify his team in this
sub-system.
- **Create League**: User can create his own league and other users
can join the league with credentials.

## Architecture and Design:
Here we discuss about the architecture of the project and give the
details of the modules of the project with the use case diagrams.

**ERD**:
1. Create Team and Modify Team:![ERD1](https://user-images.githubusercontent.com/33545768/94069442-696f7500-fe12-11ea-9d86-db552f39ab2f.png)
2. Create League: ![ERD2](https://user-images.githubusercontent.com/33545768/94069629-bce1c300-fe12-11ea-8445-b25566f260c0.png)

## User Guide:
Here we will discuss the details about the usage of the software. The
Fantasy Cricket League is mainly a website. There is no app for it. The
details are described below.

- **Registration** : First the user needs to sign in to the system. If he does not have any account then first he will need to create an account by signing up to the system.

![screenshot(7)](https://user-images.githubusercontent.com/33545768/94070776-9e7cc700-fe14-11ea-8eec-66300807a35c.png)

- **Dashboard** : After signing in the user is taken to the dashboard. Here he can see all the features like upcoming matches, total player statistics, league generation etc. If the user clicks the sign out button then he is again moved back to the sign in page.

![dashboard](https://user-images.githubusercontent.com/33545768/94152586-90bf5400-fe9d-11ea-8b81-44e38f84bb01.png)

- **Upcoming Matches** : To create any team the user has to select any of the upcoming matches. And then he will be taken to the player lists page.

![upcoming match](https://user-images.githubusercontent.com/33545768/94154325-9322ad80-fe9f-11ea-9e26-b904e76a16f9.png)

- **Creating Team** : After selecting the match the list of the players is given to the user. Only the players corresponding to that match is shown to the user. Clicking the add button adds the player to the team of the user.

![playersList](https://user-images.githubusercontent.com/33545768/94155965-5bb50080-fea1-11ea-802c-6bfb91cf51a1.png)

There is an option to search players by their name. Also there are options to filter out the players according to their roles (wicketkeeper, batsman etc.) . After the players have been selected then the user has to confirm the team by clicking the confirm team button. The rules for selecting players is -
  1. Maximum 2 Wicketkeeper
  2. Maximum 4 Batsman
  3. Maximum 2 Allrounder
  4. Maximum 4 Bowler
  5. Total 11 players

If this constraint is not followed or balance is over then the user will get errors submitting the players. After selecting the players the page will look like this.

![createTeam](https://user-images.githubusercontent.com/33545768/94154544-d0873b00-fe9f-11ea-8bb7-5e25549c0568.png)

- **Captain and Vice Captain Selection** : After the submit
team button is clicked then there will be options for
selecting captain and vice captain . A list of the 11 players
will be shown and one of them will be selected as captain
and one of them will be selected as vice captains. Without
selecting captain and vice captain the create team procedure
can not be finished.

- **Modify Team** : After the team has finalized the user will be
taken to his team by clicking the My Team button. In the My
Team page the user will get to see all of his players selectedfor that match and their points. Now if the user wants to do
any modification to the team then he will have to click the
button Modify Team. This will take him back to the previous
page where he can remove or add any players keeping all
the constraints in mind. Then he needs to follow the same
procedure described at the create team section.

![modify team](https://user-images.githubusercontent.com/33545768/94156325-ca925980-fea1-11ea-929b-fc40c118852d.png)

- **Contests** : The user can join or create leagues. In these leagues,
various other users will be members and they can get to compete
with each other. Here the UI looks like this when the user clicks
the button Contests.

![contests](https://user-images.githubusercontent.com/33545768/94156493-f3b2ea00-fea1-11ea-89e3-f324e73e418d.png)

Here there are 3 options for the user.
  1. **Create League**: If the user wants to create a league of his
  own then he needs to click the Create League button. After
  clicking this button a dialogue box will appear that will ask
  for league name and password. After giving a name and
  password a new league will be created.
  
  ![create league](https://user-images.githubusercontent.com/33545768/94156782-4b515580-fea2-11ea-9ffd-08ba3f45ed73.png)

  2. **Join League** : A user can join a league by entering the name
  of the league he wants to join and password of the league.
  
  ![join league](https://user-images.githubusercontent.com/33545768/94156920-7045c880-fea2-11ea-8b90-a1709edf262b.png)

  After joining the league the information of the league is
  shown. Here the users that are in that league are shown
  with their points.
  
  ![league info](https://user-images.githubusercontent.com/33545768/94157038-923f4b00-fea2-11ea-8f1a-01ef4f28d3ef.png)

  3. **My League** : The user can get the list of the leagues that he
  is in. Clicking the names of the leagues will show the details
  of the league.
  
  ![my league](https://user-images.githubusercontent.com/33545768/94157361-f82bd280-fea2-11ea-8e6c-6a5f18cdd0f8.png)

- **Fantasy Stats** : In this section the statistics of the players are shown. Which players have the best points are shown. The statistics are categorized according to the role of the players.

![playerStat](https://user-images.githubusercontent.com/33545768/94165928-8fe1ee80-feac-11ea-864d-d843f60697c4.png)
