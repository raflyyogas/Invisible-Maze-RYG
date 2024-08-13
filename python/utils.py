# utils.py
import time

def calculate_score(start_time):
    return time.time() - start_time

def read_high_score(file_path):
    try:
        with open(file_path, 'r') as file:
            return float(file.read())
    except (FileNotFoundError, ValueError):
        return float('inf')

def write_high_score(file_path, score):
    with open(file_path, 'w') as file:
        file.write(str(score))
