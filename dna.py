import csv
import sys


def main():

    # Check for command-line usage
    if len(sys.argv) != 3:
        print("Usage: python dna.py database.csv sequence.txt")
        sys.exit(1)

    # Read database file into a variable
    database_filename = sys.argv[1]
    sequence_filename = sys.argv[2]

    with open(database_filename, mode='r') as db_file:
        reader = csv.DictReader(db_file)
        database = list(reader)

    # Read DNA sequence file into a variable
    with open(sequence_filename, mode='r') as seq_file:
        dna_sequence = seq_file.read().strip()

    # Find longest match of each STR in DNA sequence
    str_keys = database[0].keys()
    str_keys = [key for key in str_keys if key != 'name']  # Exclude the 'name' field

    # Create a dictionary to store the longest matches of each STR
    longest_matches = {}
    for str_key in str_keys:
        longest_matches[str_key] = longest_match(dna_sequence, str_key)

    # Check database for matching profiles
    for row in database:
        match = True
        for str_key in str_keys:
            if int(row[str_key]) != longest_matches[str_key]:
                match = False
                break

        if match:
            print(row['name'])
            return

    print("No match")


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in sequence, return longest run found
    return longest_run


if __name__ == "__main__":
    main()
