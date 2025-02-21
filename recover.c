#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define NUM_BYTES 512

int main(int argc, char *argv[])
{
    // Accept a single command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }
    // Open the memory card
    FILE *card = fopen(argv[1], "r");
    if (card == NULL)
    {
        printf("Unable to read card.\n");
        fclose(card);
        return 1;
    }
    // Create a buffer for a block of data
    uint8_t *buffer = malloc(NUM_BYTES * sizeof(uint8_t));
    // Create variable to store number of files
    int num_files = 0;
    FILE *img = NULL;
    char *fileName = malloc(8 * sizeof(char));

    // While there's still data left to read from the memory card
    while (fread(buffer, 1, NUM_BYTES, card) == NUM_BYTES)
    {
        // Create JPEGs from the data
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff &&
            (buffer[3] & 0xf0) == 0xe0)
        {
            if (num_files != 0)
            {
                fclose(img);
            }
            sprintf(fileName, "%03i.jpg", num_files);
            num_files++;
            img = fopen(fileName, "w");
            if (img == NULL)
            {
                printf("Unable to create file.\n");
                break;
            }
            fwrite(buffer, 1, NUM_BYTES, img);
        }
        else if (img != NULL)
        {
            fwrite(buffer, 1, NUM_BYTES, img);
        }
    }
    free(buffer);
    free(fileName);
    fclose(img);
    fclose(card);
}
