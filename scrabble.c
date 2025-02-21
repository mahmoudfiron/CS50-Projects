#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Function to calculate scrabble score for a given letter
int scrabble_score(char letter)
{
    switch (letter)
    {
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U':
        case 'L':
        case 'N':
        case 'S':
        case 'T':
        case 'R':
            return 1;
        case 'D':
        case 'G':
            return 2;
        case 'B':
        case 'C':
        case 'M':
        case 'P':
            return 3;
        case 'F':
        case 'H':
        case 'V':
        case 'W':
        case 'Y':
            return 4;
        case 'K':
            return 5;
        case 'J':
        case 'X':
            return 8;
        case 'Q':
        case 'Z':
            return 10;
        default:
            return 0; // Unrecognized letter, return 0 points
    }
}

// Function to calculate the total scrabble score of a word, ignoring non-alphabetic characters
int calculate_score(char word[])
{
    int score = 0;
    for (int i = 0; i < strlen(word); i++)
    {
        if (isalpha(word[i])) // Only process alphabetic characters
        {
            score +=
                scrabble_score(toupper(word[i])); // Convert to uppercase for case insensitivity
        }
    }
    return score;
}

int main(void)
{
    char player1_word[100], player2_word[100];

    // Prompt for Player 1's word
    printf("Player 1: ");
    scanf("%s", player1_word);

    // Prompt for Player 2's word
    printf("Player 2: ");
    scanf("%s", player2_word);

    // Calculate the scores for both players
    int player1_score = calculate_score(player1_word);
    int player2_score = calculate_score(player2_word);

    // Print the result based on the scores
    if (player1_score > player2_score)
    {
        printf("Player 1 wins!\n");
    }
    else if (player2_score > player1_score)
    {
        printf("Player 2 wins!\n");
    }
    else
    {
        printf("Tie!\n");
    }

    return 0;
}
