'''
config.py
A python program to configure the database connection
by reading the database.ini file and returning the
parameters to connect to the database.
              Created by Panupong Dangkajitpetch
                      June 15th, 2024
'''
from configparser import ConfigParser
from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")

def config(filename='database.ini', section='postgresql'):
   
    parser = ConfigParser()  # create a parser
    parser.read(filename)  # read config file
 
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1] # param[0] is the key, param[1] is the value
    else:
        raise Exception(
            'Section {0} not found in the {1} file'.format
            (section, filename))
    return db
