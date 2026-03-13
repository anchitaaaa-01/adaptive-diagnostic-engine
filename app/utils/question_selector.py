def select_best_question(questions, ability):

    best_question = None
    min_diff = float("inf")

    for q in questions:

        diff = abs(q["difficulty"] - ability)

        if diff < min_diff:
            min_diff = diff
            best_question = q

    return best_question