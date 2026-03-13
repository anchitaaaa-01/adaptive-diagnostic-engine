from pymongo import MongoClient

client = MongoClient("mongodb+srv://anchita131005:ae1h6mKjVblWDVE1@cluster0.qh1uwsm.mongodb.net/adaptive_testing?retryWrites=true&w=majority")

db = client["adaptive_testing"]
questions_collection = db["questions"]

questions = [

{
"question_text": "Solve: 2x + 5 = 15",
"options": ["3","5","10","15"],
"correct_answer": "5",
"difficulty": 0.3,
"discrimination": 1.2,
"guessing": 0.25,
"topic": "Algebra",
"tags": ["linear equation"]
},

{
"question_text": "What is 12 × 8?",
"options": ["88","96","108","84"],
"correct_answer": "96",
"difficulty": 0.2,
"discrimination": 1.1,
"guessing": 0.25,
"topic": "Arithmetic",
"tags": ["multiplication"]
},

{
"question_text": "If x² = 49, what is x?",
"options": ["7","-7","7 or -7","0"],
"correct_answer": "7 or -7",
"difficulty": 0.5,
"discrimination": 1.3,
"guessing": 0.25,
"topic": "Algebra",
"tags": ["quadratic"]
},

{
"question_text": "What is the synonym of 'abundant'?",
"options": ["scarce","plentiful","rare","limited"],
"correct_answer": "plentiful",
"difficulty": 0.6,
"discrimination": 1.2,
"guessing": 0.25,
"topic": "Vocabulary",
"tags": ["synonym"]
},

{
"question_text": "What is the probability of getting heads on a fair coin?",
"options": ["0.25","0.5","0.75","1"],
"correct_answer": "0.5",
"difficulty": 0.2,
"discrimination": 1.0,
"guessing": 0.25,
"topic": "Probability",
"tags": ["basic probability"]
},

{
"question_text": "Simplify: 3(2x + 4)",
"options": ["6x + 4","6x + 12","5x + 12","6x + 8"],
"correct_answer": "6x + 12",
"difficulty": 0.3,
"discrimination": 1.2,
"guessing": 0.25,
"topic": "Algebra",
"tags": ["expression"]
},

{
"question_text": "What is the antonym of 'expand'?",
"options": ["increase","contract","extend","grow"],
"correct_answer": "contract",
"difficulty": 0.5,
"discrimination": 1.2,
"guessing": 0.25,
"topic": "Vocabulary",
"tags": ["antonym"]
},

{
"question_text": "If a die is rolled, what is the probability of getting a 3?",
"options": ["1/2","1/3","1/6","1/12"],
"correct_answer": "1/6",
"difficulty": 0.4,
"discrimination": 1.1,
"guessing": 0.25,
"topic": "Probability",
"tags": ["dice"]
},

{
"question_text": "What is 25% of 200?",
"options": ["25","50","75","100"],
"correct_answer": "50",
"difficulty": 0.2,
"discrimination": 1.0,
"guessing": 0.25,
"topic": "Arithmetic",
"tags": ["percentage"]
},

{
"question_text": "Solve: x/4 = 6",
"options": ["12","18","20","24"],
"correct_answer": "24",
"difficulty": 0.3,
"discrimination": 1.2,
"guessing": 0.25,
"topic": "Algebra",
"tags": ["equation"]
}

]

questions_collection.insert_many(questions)

print("Questions inserted successfully")