from cs50 import get_string

# Get the input to evaluate
text = get_string("Text: ")
# Calculate words based on spaces in the input string
words = len(text.split())

# Calculate sentences based on terminators
full_stops = len(text.split(". "))
questions = len(text.split("? "))

# In case of question marks, there will be one full stop sentence extra to be removed from the sum
if (questions > 1):
    sentences = full_stops + questions - 1
else:
    sentences = full_stops

# Calculate number of letters
letters = 0
for i in text:
    if (i.isalpha()):
        letters += 1

# Calculate average letters and sentences by words
avg_letters = 100 * (letters/words)
avg_sentences = 100 * (sentences/words)

# Evaluate grade using Coleman-Liau index
grade = round(0.0588 * avg_letters - 0.296 * avg_sentences - 15.8)

# Print the grade
if (grade > 16):
    print("Grade 16+")
elif (grade < 1):
    print("Before Grade 1")
else:
    print(f"Grade {grade}")
