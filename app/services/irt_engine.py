import math

def probability_correct(theta, a, b, c):

    return c + (1 - c) / (1 + math.exp(-a * (theta - b)))


def update_ability(theta, a, b, c, correct):

    p = probability_correct(theta, a, b, c)

    learning_rate = 0.1

    if correct:
        theta = theta + learning_rate * (1 - p)
    else:
        theta = theta - learning_rate * p

    return max(-3, min(3, theta))