import mysql.connector
import random
import string
from datetime import datetime
import os

def generate_random_string(length):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

USER_SUB = 'google-oauth2|104572644545492039309'

# Establish connection to MySQL server
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # Password for your MySQL root user
    database="lister_db"  # Name of your database
)

cur = conn.cursor()

cur.execute(
    "INSERT INTO users (sub, created_at, updated_at) VALUES (%s, %s, %s)",
    (USER_SUB, datetime.now(), datetime.now())
)

for _ in range(6):
    owner_sub = USER_SUB
    list_name = generate_random_string(10)
    cur.execute(
        "INSERT INTO lists (owner_sub, name, created_at, updated_at) VALUES (%s, %s, %s, %s)",
        (owner_sub, list_name, datetime.now(), datetime.now())
    )
    list_id = cur.lastrowid  

    for _ in range(random.randint(3, 5)):  
        item_name = generate_random_string(8)
        cur.execute(
            "INSERT INTO list_items (list_id, name, created_at, updated_at) VALUES (%s, %s, %s, %s)",
            (list_id, item_name, datetime.now(), datetime.now())
        )

conn.commit()

cur.close()
conn.close()

print("Seeding completed.")
