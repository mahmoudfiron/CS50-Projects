#include <ctype.h>
#include <stdbool.h> // Add this line to define bool type
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool is_valid_key(char key[]);
void encrypt_message(char key[], char *plaintext);

int main(int argc, char *argv[])
{
    // Check if the correct number of arguments is provided
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    // Validate the key
    if (!is_valid_key(argv[1]))
    {
        printf("Key must contain 26 alphabetic characters and no duplicates.\n");
        return 1;
    }

    // Get the plaintext input from the user
    char plaintext[100];
    printf("plaintext: ");
    fgets(plaintext, sizeof(plaintext), stdin); // Use fgets to capture spaces and multiple words

    // Encrypt the message
    encrypt_message(argv[1], plaintext);

    // Output the ciphertext
    printf("ciphertext: %s\n", plaintext);

    return 0;
}

// Function to check if the key is valid
bool is_valid_key(char key[])
{
    // Check if the key length is 26 characters
    if (strlen(key) != 26)
    {
        return false;
    }

    // Create an array to track used characters in the key (case-insensitive)
    bool used[26] = {false};

    // Check if all characters are alphabetic and the key has no duplicates
    for (int i = 0; i < 26; i++)
    {
        if (!isalpha(key[i])) // Check for non-alphabetic characters
        {
            return false;
        }

        // Convert character to lowercase for case insensitivity
        char lower_key = tolower(key[i]);

        // Check for duplicate characters
        if (used[lower_key - 'a'])
        {
            return false;
        }

        // Mark the character as used
        used[lower_key - 'a'] = true;
    }

    return true;
}

// Function to encrypt the message using the substitution cipher
void encrypt_message(char key[], char *plaintext)
{
    for (int i = 0; plaintext[i] != '\0'; i++)
    {
        // Encrypt only alphabetic characters
        if (isalpha(plaintext[i]))
        {
            char base = isupper(plaintext[i]) ? 'A' : 'a';
            int index = tolower(plaintext[i]) - 'a';
            plaintext[i] = isupper(plaintext[i]) ? toupper(key[index]) : tolower(key[index]);
        }
    }
}
