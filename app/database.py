from pymongo import MongoClient
from dotenv import load_dotenv
import os

# load environment variables
load_dotenv()

# read MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# connect to MongoDB
client = MongoClient(MONGO_URI)

# database name
db = client["adaptive_testing"]

# collections
questions_collection = db["questions"]
sessions_collection = db["user_sessions"]