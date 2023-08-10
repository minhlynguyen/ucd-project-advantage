# Group-7
Group Project: Collaborative repository for our Computer Science project at UCD. Developing an innovative solution to businesses seeking optimal locations in New York. Code, docs, and communication hub for seamless teamwork. Stay tuned for updates on our progress!

Follow these steps to set up the project on your local machine:

## Set up the environment

### 1. Clone the Repository 
Begin by cloning this repository to your local machine using the following command:

```
git clone https://github.com/nezebilo/advantage.git
```

### 2. Create a Virtual Environment
It's recommended to create a virtual environment to isolate project dependencies. Navigate to the project directory and create a virtual environment:

```
cd django-backend-project
python -m venv venv
```

### 3. Activate the Virtual Environment

On Windows:
```
venv\Scripts\activate
```

On macOS and Linux:
```
source venv/bin/activate
```

### 4. Install Dependencies
Install the project dependencies using pip:
```
pip install -r requirements.txt
```

## Front-end Environment Configuration
### 1. JavaScript runtime environment
Make sure you have installed Node.js and npm in your computer. You can check it by type the command in the terminal:
check Node.js
```
node -v
```
check npm (Node Package Manager)
```
npm -v
```

If not installed yet, here is the official website:
https://nodejs.org/en

For this project, recommended version is Node.js (v18.15.0) and npm (9.5.0).
### 2. Install dependencies of project
All dependencies for front-end part are listed in `/website/react-app/package.json`.
Go to front-end folder (`/website/react-app`) and install all dependencies.
```
cd ./website/react-app/
npm install
```
### 3. Run
after installing all the dependencies, we can run the dev environment.
```
cd ./website/react-app/
npm run dev
```
## Back-end Environment Configuration

### 1. Database Setup

NOTE: For the fully functional database migrations, your database should be POSTGRESQL with PostGIS extension.
Configure your database settings in settings.py and perform the initial migration to set up the database schema:

```
python manage.py makemigrations
python manage.py migrate
```

### 2. Run the Development Server: 

Start the development server to run the project locally:

```
python manage.py runserver
```

### 7. Access the backend application
Access the Application: Open your web browser and navigate to http://localhost:8000 to access the API endpoints provided by the backend.

## Project Structure

website/website: The main project directory containing settings, URLs, and configuration.
website/main, user_api, save_api: The apps' directory where you can define models, views, serializers, and other app-specific components.
requirements.txt: A list of Python dependencies required for the project.
website/manage.py: A command-line utility to interact with the project.
Usage and API Endpoints
Describe the usage of your API endpoints here. Provide examples of requests and expected responses. Include information about authentication and any additional features.