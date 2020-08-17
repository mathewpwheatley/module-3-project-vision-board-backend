### Flatiron School: Seattle 0420 Cohort
# Vision Board: Module 3 Project

# Description: 
This project was designed to enable a user to create, edit, and delete vision boards with associated goals. Through the tool a user can:

* Create an account

![Alt text](https://github.com/mathewpwheatley/module-3-project-vision-board/raw/master/ReadmeImg/Signup.png)

* Login to an existing account

![Alt text](https://github.com/mathewpwheatley/module-3-project-vision-board/raw/master/ReadmeImg/Login.png)

* Create, edit, and delete a vision board

![Alt text](https://github.com/mathewpwheatley/module-3-project-vision-board/raw/master/ReadmeImg/NewBoard.png)

* Create, edit and delete a goal

![Alt text](https://github.com/mathewpwheatley/module-3-project-vision-board/raw/master/ReadmeImg/NewGoal.png)

* View all boards and related goals

![Alt text](https://github.com/mathewpwheatley/module-3-project-vision-board/raw/master/ReadmeImg/BoardWithGoals.png)


The backend of the application leverages Ruby on Rails API functionality to receive and send AJAX requests in a JSON formate. The interactive frontend is build on vanilla HTML and Javascript.

# Team:
* Colton Kaiser
* David Knudson
* Joshua Mclean
* Mathew Wheatley

# Dependencies:
Ruby (2.6.1)
Bundler (2.1.4)
Rails (6.0.3.1)
PostgreSQL (12.3)
Google Chrome (80.0.3987.149)

# Installation:
This app is hosted here: https://ckaiser258.github.io/VisionBoard/. If you'd like to view it locally, follow the instructions below to install the backend server:

1. Download this entire git repository to your computer and place in your desired install directory. 
2. If you don't have the above dependencies:
   * In your terminal run ``ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`` to install Homebrew
   * Run ``brew install rbenv ruby-build`` to install Ruby, then ``rbenv install 2.7.1`` ``rbenv global 2.7.1`` and ``ruby -v`` to confirm. 
   * Finally, to install Rails, run ``gem install rails -v 6.0.2.2`` ``rbenv rehash`` and ``rails -v`` to confirm.
   * If you need to install PostgreSQL, follow their instructions here: https://postgresapp.com/.
3. Now, via a terminal interface navigate to install_directory/backend. From this location execute ``bundle install`` to install all other required ruby gems. This should allow you to explore all functionality of the application.

# Running:
1. Make sure you've installed the frontend repo (located here: https://github.com/ckaiser258/VisionBoard/) and followed the installation/running instructions. 
2. To start hosting the local server, start by opening PostgreSQL and starting the server. 
3. Then, in your terminal navigate to the directory you've installed this repo in. Once there, execute `rails db:create`, `rails db:migrate`,`rails db:seed`, and finally ```rails s```. 

NOTE: If you're planning on making changes to this backend repo and/or using it instead of the hosted backend: navigate to where you installed the frontend repo, open it in your text editor and comment out line 1 of index.js, then comment IN line 2.

NOTE #2: The rails server is functioning solely as a backend API for local development, so you do not need to navigate to localhost:3000 in your browser unless you'd like to test to make sure the database is running correctly.

# License:


Copyright 2020 Colton Kaiser, Joshua Mclean, Mathew Wheatley, David Knudson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
