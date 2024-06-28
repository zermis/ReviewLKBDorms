import psycopg2
from config import config
from create_dorm_table import create_dorm_table
from create_user_table import create_user_table

def connect():
    conn = None

    try:    
        params = config()
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
       
        # Create dorm table
        # create_dorm_table()
        create_user_table()

        conn.commit()
        cur.close()
        conn.close()

        print('PostgreSQL database version:')
        cur.execute('SELECT version()')
        db_version = cur.fetchone()
        print(db_version)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

if __name__ == "__main__":
    connect()