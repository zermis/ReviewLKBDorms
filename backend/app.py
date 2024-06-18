from flask import Flask
import psycopg2
from config import config

app = Flask(__name__)


@app.get("/")
def home():
    return {"message": "Hello, King!"}

@app.get("/books")
def get_books():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute("SELECT * FROM books;")
        books = cur.fetchall()
        return {"books": books}
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == "__main__":
    # connect()
    app.run()
    