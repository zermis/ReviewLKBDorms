from flask import Flask
import psycopg2
from config import config
import hashlib

def validate_user(username,password):
    password = hashlib.sha256('person1password'.encode()).hexdigest()
    
