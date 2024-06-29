import psycopg2
from config import config
from get_file_path import get_file_path
from passlib.hash import pbkdf2_sha256

def create_user_table():
    conn = None

    try:    
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # Create dorm table
        cur.execute('DROP TABLE IF EXISTS users;')
        create_table = '''
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        '''
        # cur.execute(create_table)
        conn.commit()
    
        # test users
        username1 = 'person1'
        password1 = pbkdf2_sha256.hash('person1password')
        print(password1)
        username2 = 'person2'
        password2 = pbkdf2_sha256.hash('person2password')
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username1, password1))
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username2, password2))
        conn.commit()

        

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')



