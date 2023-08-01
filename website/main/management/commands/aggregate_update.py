from django.core.management.base import BaseCommand
import psycopg2
from decouple import config
import os


class Command(BaseCommand):
    help = "Aggregate data"

    def handle(self, *args, **options):
        # Database connection details
        self.db_host = "database-1.cvwut6jnqsvn.us-east-1.rds.amazonaws.com"
        self.db_name = "advantage-db"
        self.db_user = "advantage"
        self.db_password = config("DB_PASSWORD")

        # Read and execute the SQL script
        filename = f"{os.path.dirname(os.path.abspath(__file__))}\\aggregate.sql"
        with open(filename, "r") as file:
            sql_script = file.read()

        connection = psycopg2.connect(
            host=self.db_host,
            database=self.db_name,
            user=self.db_user,
            password=self.db_password,
        )

        try:
            with connection.cursor() as cursor:
                cursor.execute(sql_script)
                connection.commit()
        finally:
            connection.close()
