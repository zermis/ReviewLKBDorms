import psycopg2
from config import config

def create_dorm_table():
    conn = None

    try:    
        params = config()
        conn = psycopg2.connect(**params)

        cur = conn.cursor()
       
        # Create dorm table
    

        conn.commit()


    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
    