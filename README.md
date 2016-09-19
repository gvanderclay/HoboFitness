# HoboFitness
Simple Fitness Tracking App

##Getting Started
Before doing anything, you are going to want to have the following software installed

* Node.js/NPM
  * [Install guide](https://docs.npmjs.com/getting-started/installing-node)
* PostgreSQL
  * [Windows Install](https://www.postgresql.org/download/windows/)
    * **NOTE:** I have no experience installing with windows, just found this link
  * [Mac Install](http://postgresapp.com/)
    * Can also be installed via homebrew
  * [Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
  * [Others](https://www.google.com/)

After installing node, it is recommended to install the following global packages
* Nodemon
  * Keeps the server running, and restarts when you make changes
* sequelize-cli
  * command line tool for handling sequelize and database
* eslint
  * Enforces javascript styling

**NOTE:** Installing these packages is optional, however, it makes it easier to run commands that involve these tools

In order to install these run the following command

`npm install -g nodemon sequelize-cli eslint`

After cloning the repository the first thing you're going to want to do is install all of the dependencies by running the following command:

`npm install`

Once all of your packages have installed, you are going to want to make the database in postgres. This is done by running the following command in the command line:

**NOTE:** This is only tested on Mac

`psql postgres -c "CREATE DATABASE hobo_fitness_dev"`

Now that the database is initialized, you need to setup the config file. First you need to make a copy of the config template. Do this by running this command (or the windows equivalent)

`cp config/config.json.template config/config.json`

After that edit the conf to have a password that matches your username and password. For now, the test and production configurations don't matter

Now that everything is setup you can run the following command to initialize the database:

`npm run db:reset`

This makes all of the tables with the correct migrations.

Your development environment should be setup and ready to develop on now
