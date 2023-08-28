# AdVantage 1.0: An innovative solution to businesses seeking optimal locations for advertisement in New York

AdVantage 1.0 is the product of my amazing team of 5 in which I was the Back-end Lead, along with a Co-ordination Lead, a Data Analytics Lead, a Front-end Lead and a Maintenance (DevOps) Lead. 

Most of the codes in folder [*website*](https://github.com/minhlynguyen/ucd-project-advantage/tree/main/website) are the result of my own research and development in 10 weeks of our Research Practicum Module. I also actively contributed to some other parts of the project such as data cleaning, data features selection, user experience design.

## About the product:

AdVantage is a web-based platform designed to forecast activity levels at various sites throughout New York City (NYC). By leveraging a range of data sources to create a data-centered solution, our goal is to equip advertisers with the insights needed to make informed choices when selecting billboard locations, thus enabling strategic investments.

### User authentication

Homepage is where any user can visit and have a basic understanding of the benefits of using our product, with multiple call-to-action entries to lead them to registering an account. After registering, user is authenticated and has permission to view our Solutions page in which they can use our features. 

<p>
  <img alt="Home page" src="demo/homepage-without-user-authentication-light.gif" width="30%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Authenticated user can view Solution page" src="demo/authentication-allow-user-to-view-solutions-light.gif" width="30%">
</p>

### 24h busyness of the same day across different NYC areas

### Busyness during user's input time range

### Busyness can be filtered by borough and the target audience groups so user can study the number of desired audience they can reach. 


# Follow these steps to set up the project on your local machine:

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

```
source venv/bin/activate
```

### 4. Install Dependencies

Install the project dependencies using pip:

```
pip install -r requirements.txt
```

Install Gdal:
on Linux:

```
sudo apt-get update && sudo apt-get install -y binutils libproj-dev gdal-bin python3-gdal
```

On Macos:
Follow the instructions in the link below:

```
https://gdal.org/index.html
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

All dependencies for front-end part are listed in `/react-app/package.json`.
Go to front-end folder (`/react-app`) and install all dependencies.

```
cd ./react-app/
npm install
```

### 3. Run

after installing all the dependencies, we can run the dev environment.

```
cd ./react-app/
npm run dev
```

### 4. Build for deployment

you can now build the frontend for deployment.

```
npm run build
```

This will create a folder called dist with all static files that need to be served

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

### 3. Access the backend application

Access the Application: Open your web browser and navigate to http://localhost:8000/api/ to access the API endpoints provided by the backend.

## Project Structure

website/website: The main project directory containing settings, URLs, and configuration.
website/main, user_api, save_api: The apps' directory where you can define models, views, serializers, and other app-specific components.
requirements.txt: A list of Python dependencies required for the project.
website/manage.py: A command-line utility to interact with the project.
