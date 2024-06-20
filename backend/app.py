from flask import Flask
import psycopg2
from config import config

app = Flask(__name__)

'''
The function converts query output to a json format.
Arguments:
  cursor      - A cursor object to execute SQL queries
  query       - A query to be executed
Return data output in json format.
'''
def query_to_json(cursor, query):
    cursor.execute(query)
    columns = [desc[0] for desc in cursor.description]
    results = cursor.fetchall()
    features = []
    for row in results:
        properties = dict(zip(columns, row))
        feature = {"properties": properties}
        features.append(feature)
    feature_collection = {"type": "FeatureCollection", "features": features}
    return feature_collection

@app.get("/")
def home():
    return {"message": "Hello, King!"}

@app.get("/dorms")
def get_dorms():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        dorms = query_to_json(cur, "SELECT * FROM dorms;")
        return dorms
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == "__main__":
    get_dorms()
    app.run()
    