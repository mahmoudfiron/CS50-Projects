#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Function to count the number of letters in the text
int count_letters(char text[])
{
    int letters = 0;
    for (int i = 0; i < strlen(text); i++)
    {
        if (isalpha(text[i]))
        {
            letters++;
        }
    }
    return letters;
}

// Function to count the number of words in the text
int count_words(char text[])
{
    int words = 1; // Start with 1 to account for the first word
    for (int i = 0; i < strlen(text); i++)
    {
        if (text[i] == ' ')
        {
            words++;
        }
    }
    return words;
}

// Function to count the number of sentences in the text
int count_sentences(char text[])
{
    int sentences = 0;
    for (int i = 0; i < strlen(text); i++)
    {
        if (text[i] == '.' || text[i] == '?' || text[i] == '!')
        {
            sentences++;
        }
    }
    return sentences;
}

int main(void)
{
    char text[1000];

    // Prompt the user to enter text
    printf("Text: ");
    fgets(text, sizeof(text), stdin); // Using fgets for multi-word input with spaces

    // Calculate the number of letters, words, and sentences
    int letters = count_letters(text);
    int words = count_words(text);
    int sentences = count_sentences(text);

    // Calculate L and S
    float L = (float) letters / words * 100;
    float S = (float) sentences / words * 100;

    // Calculate the Coleman-Liau index
    float index = 0.0588 * L - 0.296 * S - 15.8;

    // Output the result
    int grade = (int) (index + 0.5); // Round the index to the nearest integer

    if (grade < 1)
    {
        printf("Before Grade 1\n");
    }
    else if (grade >= 16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %d\n", grade);
    }

    return 0;
}
