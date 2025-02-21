#include <stdio.h>

int main(void)
{
    char name[20];
    printf("What is your name?\n");
    scanf("%19s", name);
    printf("hello, %s\n", name);
}
