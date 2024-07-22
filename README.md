# Ridvig_Internship_task

# Using Docker
1. Run Command
    docker-compose up --build


# Manual Setup 
1. Clone repository using- https://github.com/sjadhav2002/Ridvig_internship_task.git

# Setup Backend
1. Open a terminal.
2. Change directory to backend: 
    - cd ./backend
3. Create virtual environment: 
    - pip install virtualenv
    - virtualenv env
    - .\env\Scripts\activate
4. Install all dependencies:
    - pip install -r requirements.txt
5. Install and setup MYSQL
6. Open backend\.env and update the database details with your credentials
    - NAME - Database name
    - USER - username
    - PASSWORD - password
    - HOST - DB Host
    - PORT - DB Port 
7. Run Command
    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver


# setup FrontEnd
1. Open a terminal.
2. Change directory to frontend: 
    - cd ./frontend
4. run
    - npm install
5. run
    - npm run dev


# Documentation about both Backend and Frontend is given in Documentation.pdf