from flask_login import login_required
from config import ApplicationConfig
from flask_session import Session
from flask import Flask, Response, request, jsonify, session
from flask_cors import CORS
import psycopg2
from config import config
from passlib.hash import pbkdf2_sha256
import json
import datetime

def serialize_datetime(obj):
    if isinstance(obj, datetime.datetime):
        return obj.__str__()
    raise TypeError("Type not serializable")

dt = datetime.datetime.now()
# from itsdangerous import (URLSafeTimedSerializer
#                           as Serializer, BadSignature, SignatureExpired)
# from functools import wraps
# from flask_login import login_user, logout_user, login_required, current_user

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

server_session = Session(app)
# app.secret_key = 'ReviewLKBDorms'
cors = CORS(app,  supports_credentials=True, resources={r"/*": {"origins": "*"}})

'''
The function converts query output to a json format.
Arguments:
  cursor      - A cursor object to execute SQL queries
  query       - A query to be executed
Return data output in json format.
'''
# def query_to_json(cursor, query):
#     cursor.execute(query)
#     columns = [desc[0] for desc in cursor.description]
#     results = cursor.fetchall()
#     features = []
#     for row in results:
#         properties = dict(zip(columns, row))
#         feature = {"properties": properties}
#         features.append(feature)
#     feature_collection = {"type": "FeatureCollection", "features": features}
#     return feature_collection

def query_to_json(cursor, query):
    cursor.execute(query)
    columns = [desc[0] for desc in cursor.description]
    results = cursor.fetchall()
    features = []
    for row in results:
        feature = dict(zip(columns, row))
        features.append(feature)
    # print(features)
    return jsonify({"dorms": features})
    

@app.get("/")
def home():
    return {"message": "Hello, King!"}

@app.route("/dorms", methods = ["GET"])
def get_dorms():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        dorms = query_to_json(cur, "SELECT * FROM dorms;")
        # print(dorms)
        return dorms, 200
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# id is like this a893d4a4-654a-41af-ae0c-ba3c68d63973
# to get one dorm
@app.route("/dorms/<id>", methods = ["GET"])
def get_dorm(id):
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute("SELECT * FROM dorms WHERE id = %s;", (id,))
        column_names = [desc[0] for desc in cur.description]
        data = cur.fetchone()
        if data:
            # return jsonify({"dorm": data}), 200
            result = dict(zip(column_names, data))
            #jsonify the result and print it
            result_json = json.dumps({"dorm": result}, ensure_ascii=False, default=serialize_datetime, indent=4)
            return Response(result_json), 200
        else:
            return jsonify({"error": "Dorm not found"}), 404
        
    except (Exception, psycopg2.DatabaseError) as error:
        print("error in backend:", error)
        return jsonify({"error": str(error)}), 500
    finally:
        if conn is not None:
            conn.close()

@app.route("/register", methods = ["POST"])
def signup():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data or 'comfirm_password' not in data:
        return jsonify({"error": "Username, password, and comfirm password fields are required"}), 400
    
    username = data['username']
    password = data['password']
    comfirm_password = data['comfirm_password']

    conn = None
    try:    
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        # check first if user already exists
        cur.execute("SELECT username from users WHERE username = %s", (username,))
        conn.commit()
        user = cur.fetchone()
        if user:
            return jsonify({"error": "Username already exists"}), 400
        else:
        # checks if password and comfirm password match
            if password != comfirm_password:
                return jsonify({"error": "Passwords do not match"}), 400

            hash_password = pbkdf2_sha256.hash(password)
            # create new user
            cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hash_password  ))
            conn.commit()
            return jsonify({"message": "User created successfully!"}), 201            
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return jsonify({"error": "An error occurred during signup."}), 500
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')

@app.route("/login", methods = ["POST"])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password are required."}), 400
    
    username = data['username']
    password = data['password']

    conn = None
    try:    
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        # verify user
        cur.execute("SELECT id, username, password from users WHERE username = %s", (username,))
        conn.commit()
        user = cur.fetchone()

        if user and pbkdf2_sha256.verify(password, user[2]):
            session['user_id'] = user[0]
            print('sessio after loggin in:', session)
            return jsonify({"message": "Login successful!", "username": user[1]}), 200
        else:
            return jsonify({"error": "Invalid username or password!"}), 400
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return jsonify({"error": "An error occurred during login."}), 500
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')

@app.route("/logout", methods=["POST", "GET"])
def logout():
    # Clear the user's session
    print('loggin out')
    print('session before logout:', session)
    session.pop('user_id', default=None)

    print('session after logout:', session)
    return jsonify({"message": "Logged out successfully"}), 200
                
@app.route("/check_auth", methods = ["GET"])
def check_auth():
    if 'user_id' in session:
        return jsonify({"message": "User is authenticated"}), 200
    else:
        return jsonify({"error": "User is not authenticated"}), 401

@app.route("/@me", methods = ["GET"])
def profile():
    user_id = session.get("user_id")
    print('session getting @me:', session)
    if not user_id:
        return jsonify({"error": "User not logged in."}), 401

    # use user_id to get user details
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute("SELECT id, username from users WHERE id = %s", (user_id,))
        conn.commit()
        user = cur.fetchone()
        if user:
            print('user:', user[1])
            return jsonify({
                "user_id": user_id,
                "username": user[1]
            }), 200
        else:
            return jsonify({"error": "User not logged in."}), 401
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return jsonify({"error": "An error occurred during login."}), 500
    finally:
        if conn is not None:
            cur.close()
            conn.close()
            print('Database connection closed.')

if __name__ == "__main__":
    get_dorms()
    app.run(debug=True)