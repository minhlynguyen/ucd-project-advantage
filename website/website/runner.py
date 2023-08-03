from types import MethodType
from django.test.runner import DiscoverRunner
from django.db import connections

def prepare_database(self):
    self.connect()
    self.connection.cursor().execute("""
    CREATE SCHEMA maps AUTHORIZATION advantage;
    GRANT ALL ON SCHEMA maps TO advantage;
    CREATE SCHEMA user_data AUTHORIZATION advantage;
    GRANT ALL ON SCHEMA user_data TO advantage;        
    """)
    
class PostgresSchemaTestRunner(DiscoverRunner):

    def setup_databases(self, **kwargs):
        for connection_name in connections:
            connection = connections[connection_name]
            connection.prepare_database = MethodType(prepare_database, connection)
        return super().setup_databases(**kwargs)