from app.database import questions_collection
from app.utils.question_selector import select_best_question

def get_next_question(ability):

    questions = list(questions_collection.find())

    question = select_best_question(questions, ability)

    return question