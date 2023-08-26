# social-network-api

## Description

This is an application where users are able to create their own profile, share their thoughts & react to friends & family. This application makes it all possible through the usage of Express.js, a mongoDB Database & the Mongoose ODM.

## Usage

In order to successfully use this application, open up either Postman or Insomnia. Once the application is open, run 'nodemon server.js'.

Once the application is up & running, start making request!

### Users Endpoints (/api/users):

GET all users
GET a single user by its \_id and populated thought and friend data
POST a new user
PUT to update a user by its \_id
DELETE to remove a user by its \_id

### User Friends Endpoints (/api/users/:userId/friends/:friendId):

POST to add a new friend to a user's friend list
DELETE to remove a friend from a user's friend list

### Thoughts Endpoints (/api/thoughts):

GET to get all thoughts
GET to get a single thought by its \_id
POST to create a new thought (don't forget to push the created thought's \_id to the associated user's thoughts array field)
PUT to update a thought by its \_id
DELETE to remove a thought by its \_id

### Reactions Endpoints (/api/thoughts/:thoughtId/reactions):

POST to create a reaction stored in a single thought's reactions array field
DELETE to pull and remove a reaction by the reaction's reactionId value

## Tutorial Video

https://drive.google.com/file/d/1m5z9dI7aLewYJS886kuHw7hxb9c2Ogun/view
