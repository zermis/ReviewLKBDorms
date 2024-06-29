import psycopg2
from config import config
from get_file_path import get_file_path
import pandas as pd

def create_dorm_table():
    conn = None

    try:    
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # Create dorm table
        cur.execute('DROP TABLE IF EXISTS dorms;')
        create_table = '''
            CREATE TABLE IF NOT EXISTS dorms (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name_eng VARCHAR(255),
                name_th VARCHAR(255),
                location_eng VARCHAR(255),
                location_th VARCHAR(255),
                details TEXT,
                price_min INT,
                price_max INT,
                avg_rating DECIMAL(3,2),
                gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'male_and_female', 'mixed')),
                image_url VARCHAR(255),
                phone_num VARCHAR(255),
                created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                gps_latitude DOUBLE PRECISION,
                gps_longitude DOUBLE PRECISION,
                geom GEOMETRY(Point, 4326)
            );
        '''
        cur.execute(create_table)
        conn.commit()

        # dorm data input file
        file_path = get_file_path('data/dorms.csv')
        dorm_data = pd.read_csv(file_path)  
        # print columns 
        print(dorm_data.columns)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            next(f) # skip the header
            cur.copy_expert(
                "COPY dorms (name_eng, name_th, location_eng, location_th, details, price_min, price_max, avg_rating, gender, image_url, phone_num, gps_latitude, gps_longitude, geom) FROM STDIN CSV QUOTE '\"' DELIMITER ',' NULL AS '';",
                f
            )
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')