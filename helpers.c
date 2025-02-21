#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop over all pixels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Take average of red, green, and blue
            double average =
                round((image[i][j].rgbtRed + image[i][j].rgbtBlue + image[i][j].rgbtGreen) / 3.0);
            // Update pixel values
            image[i][j].rgbtRed = average;
            image[i][j].rgbtBlue = average;
            image[i][j].rgbtGreen = average;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop over all pixels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Convert to red, blue and green sepia value
            double sepiaRed =
                round((0.393 * image[i][j].rgbtRed) + (0.769 * image[i][j].rgbtGreen) +
                      (0.189 * image[i][j].rgbtBlue));
            double sepiaGreen =
                round((0.349 * image[i][j].rgbtRed) + (0.686 * image[i][j].rgbtGreen) +
                      (0.168 * image[i][j].rgbtBlue));
            double sepiaBlue =
                round((0.272 * image[i][j].rgbtRed) + (0.534 * image[i][j].rgbtGreen) +
                      (0.131 * image[i][j].rgbtBlue));
            // Update original pixel values
            if (sepiaRed > 255)
                image[i][j].rgbtRed = 255;
            else
                image[i][j].rgbtRed = sepiaRed;
            if (sepiaBlue > 255)
                image[i][j].rgbtBlue = 255;
            else
                image[i][j].rgbtBlue = sepiaBlue;
            if (sepiaGreen > 255)
                image[i][j].rgbtGreen = 255;
            else
                image[i][j].rgbtGreen = sepiaGreen;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    // Loop over all pixels
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < round(width / 2.0); j++)
        {
            // Swap pixels
            RGBTRIPLE tempPixel = image[i][j];
            int mirrorY = width - 1 - j;
            image[i][j] = image[i][mirrorY];
            image[i][mirrorY] = tempPixel;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Create a copy of image
    RGBTRIPLE copy[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            copy[i][j] = image[i][j];
        }
    }
    // Iterate over height and width to get values from copy of image
    for (int i = 0; i < height; i++)
    {
        // Initialize the row above and below current row
        int aboveRow = i - 1;
        int belowRow = i + 1;
        for (int j = 0; j < width; j++)
        {
            // Initialize the column left and right of current column
            int leftCol = j - 1;
            int rightCol = j + 1;
            // Initialize sum of RGB values and counter for pixels that are added up
            double sumRed = 0;
            double sumGreen = 0;
            double sumBlue = 0;
            int count = 0;
            // Iterate over the 3 rows and 3 columns to get sum of RGB and number of pixels added
            for (int x = aboveRow; x <= belowRow; x++)
            {
                if (x >= 0 && x < height)
                {
                    for (int y = leftCol; y <= rightCol; y++)
                    {
                        if (y >= 0 && y < width)
                        {
                            sumRed += copy[x][y].rgbtRed;
                            sumGreen += copy[x][y].rgbtGreen;
                            sumBlue += copy[x][y].rgbtBlue;
                            count++;
                        }
                    }
                }
            }
            // Calculate average of RGB values and assign to image
            image[i][j].rgbtRed = round(sumRed / (float) count);
            image[i][j].rgbtBlue = round(sumBlue / (float) count);
            image[i][j].rgbtGreen = round(sumGreen / (float) count);
        }
    }
    return;
}
