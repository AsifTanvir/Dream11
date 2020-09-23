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
