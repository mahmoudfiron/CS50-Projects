/*
 * This file contains the code examples used in programming.html as string variables.
 * It's not very organized, but I couldn't figure out how to load data
 * from text files so it is what it is.
 */

const ex_python = `import time
import re

def validate(id_num: str) -> bool:
    """
    Return True if id_num passes the Luhn Algorithm, return False otherwise.

    id_num must be a numeric string.
    """
    total_sum = 0
    # Reverse string for iteration
    reversed_id = id_num[::-1]
    # Double every other digit
    even_digits = reversed_id[1::2]
    for digit in even_digits:
        double = int(digit) * 2
        # Sum digits if double > 9 (e.g. 18 => 1+8 => 9)
        if double > 9:
            double = double//10 + double%10
        total_sum += double
    # Add remaining digits to sum
    odd_digits = reversed_id[::2]
    for digit in odd_digits:
        total_sum += int(digit)
    # Return whether sum is divisible by 10
    return total_sum % 10 == 0

def main():
    print("=============================")
    print("==== Luhn Algorithm Test ====")
    print("=============================")
    while True:
        while True:
            id_num = input("\\nEnter number to validate: ")
            # Remove all non-digit characters from id number
            sanitized_id = re.sub('[^0-9]', '', id_num)
            if len(sanitized_id) > 0:
                break
            else:
                print("You must enter at least one number.")
                time.sleep(0.66)
        if validate(sanitized_id):
            print("\\nThe entered number is valid. Yay!")
            time.sleep(0.33)
        else:
            print("\\nUh oh! The entered number is invalid. Check for typos!")
            time.sleep(0.33)
        while True:
            repeat = input("\\nValidate another number? (Y/n): ").lower()
            if repeat.startswith('y') or repeat.startswith('n') or repeat == '':
                break
            else:
                print("Invalid option.")
                time.sleep(0.66)
        if repeat.startswith('n'):
            print("Exiting...")
            time.sleep(0.33)
            break

if __name__ == '__main__':
    main()
`;

const ex_c = `// Solves for x given the coefficients of a quadratic equation
#include <math.h>
#include <stdio.h>

int main(void)
{
    // Prompt user for coefficients
    double a, b, c;
    printf("Type in the equation coefficients:\\n");
    scanf("%lf", &a);
    scanf("%lf", &b);
    scanf("%lf", &c);
    printf("\\n");

    // Calculate discriminant
    double d = (b * b) - 4 * a * c;
    printf("D = %lf\\n\\n", d);

    if (d > 0)
    {
        // D > 0, calculate both roots and display them
        printf("D > 0, equation has 2 real roots\\n\\n");
        double x1 = (double) (-b + sqrt(d)) / (2 * a);
        double x2 = (double) (-b - sqrt(d)) / (2 * a);
        printf("x1 = %lf\\n", x1);
        printf("x2 = %lf\\n", x2);
    }
    else if (d == 0)
    {
        // D = 0, calculate and display root
        printf("D = 0, equation has 1 real root\\n\\n");
        double x = (double) (-b + sqrt(d)) / (2 * a);
        printf("x = %lf\\n", x);
    }
    else
    {
        // D < 0, determine real and imaginary parts
        printf("D < 0, equation has 2 complex roots\\n\\n");
        double re_x = (double) (-b) / (2 * a);
        double im_x = (double) sqrt(-d) / (2 * a);

        // Format roots for displaying
        char x1[32], x2[32];
        sprintf(x1, im_x > 0 ? "%lf + %lfi" : "%lf - %lfi", re_x, im_x > 0 ? im_x : -im_x);
        sprintf(x2, im_x < 0 ? "%lf + %lfi" : "%lf - %lfi", re_x, im_x > 0 ? im_x : -im_x);

        // Display roots
        printf("x1 = %s\\n", x1);
        printf("x2 = %s\\n", x2);
    }

    return 0;
}
`;

const ex_java = `import java.util.Scanner;

public class AdvancedAstrology {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Declare variables for crown and trunk height
        int crownHeight;
        int trunkHeight;

        // Ask for values for crown and trunk height, also check if they are valid numbers before proceeding
        while (true) {
            try {
                System.out.print("Enter crown height: ");
                crownHeight = Integer.parseInt(scanner.nextLine());

                System.out.print("Enter trunk height: ");
                trunkHeight = Integer.parseInt(scanner.nextLine());

                break;
            } catch (NumberFormatException e) {
                System.out.println("Crown and trunk height must be integers.");
            }
        }

        // Print a newline character before the tree
        System.out.println();
        // Print tree, plus a message
        christmasTree(crownHeight, trunkHeight);
        System.out.println("Merry Christmas!");
    }

    public static void printStars(int number) {
        // Prints a given number of asterisks.
        for (int i = 1; i <= number; i++) {
            System.out.print("*");
        }
    }

    public static void printSpaces(int number) {
        // Prints a given number of spaces.
        for (int i = 1; i <= number; i++) {
            System.out.print(" ");
        }
    }

    public static void christmasTree(int crownHeight, int trunkHeight) {
        // Prints an ASCII art christmas tree of a given height

        // Crown
        // Number of rows is given by crownHeight
        // For each row, prints 2 * (row number) - 1 asterisks
        // Also adds spaces to each row so all the asterisks align in a triangle shape
        for (int i = 1; i <= crownHeight; i++) {
            printSpaces(crownHeight - i);
            printStars(2 * i - 1);
            System.out.println();
        }

        // Trunk
        // Number of rows is given by trunkHeight
        // For each row prints 3 asterisks, plus spaces so it's at the crown's center
        for (int i = 1; i <= trunkHeight; i++) {
            printSpaces(crownHeight - 2);
            printStars(3);
            System.out.println();
        }
    }
}
`;

const ex_cobol = `       IDENTIFICATION DIVISION.
       PROGRAM-ID. notation.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  NUM         PIC S9(35)V9(3).
       01  FNUM        PIC -9.9(3).
       01  EXPONENT    PIC S99.
       01  FEXPONENT   PIC -Z9.
       01  FRESULT     PIC X(20).
       PROCEDURE DIVISION.
       MAIN-PROC.
      *    Query user for number
           DISPLAY "Type in a number to convert: " WITH NO ADVANCING
           ACCEPT NUM
           PERFORM CALCULATE

      *    Move number to formatted variable (removed leading zeroes)
           MOVE NUM TO FNUM
           MOVE EXPONENT TO FEXPONENT

      *    Create string for display
           STRING FUNCTION TRIM(FNUM) "x10^" FUNCTION TRIM(FEXPONENT)
               DELIMITED BY SIZE
               INTO FRESULT
           END-STRING

      *    Display converted number
           DISPLAY "Your number in scientific notation: " FRESULT
           DISPLAY FNUM "x10^" FEXPONENT
           STOP RUN.
       CALCULATE.
      *    If the number's absolute values is 10 or more, divide it
      *    and count the number of divisions for the exponent
           IF FUNCTION ABS(NUM) >= 10
               PERFORM UNTIL FUNCTION ABS(NUM) < 10
                   COMPUTE NUM = NUM / 10
                   ADD 1 TO EXPONENT
               END-PERFORM
      *    Otherwise, multiply the number until it's least 1, also
      *    counting the number of operations.
           ELSE
               PERFORM UNTIL FUNCTION ABS(NUM) >= 1
                   COMPUTE NUM = NUM * 10
                   SUBTRACT 1 FROM EXPONENT
               END-PERFORM
           END-IF.
       END PROGRAM notation.
`;

const ex_assembly = `; WARNING: The code you are about to see contains cryptic variables, confusing logic,
; tons of magic numbers and obscure functions. Attempting to understand it may result in
; headaches, insomnia, depression and/or anxiety. Discretion advised, continue at your own risk.

bits 64
default rel

section .data
    prompt      db "Largest number to check? ", 0x0
    pmpt_len    equ $ - prompt

    found_msg   db "Found: ", 0x0
    fmsg_len    equ $ - found_msg

    time_msg_1  db "Elapsed time: ", 0x0
    t_msg_1_len equ $ - time_msg_1
    time_msg_2  db "ms", 0xA, 0x0
    t_msg_2_len equ $ - time_msg_2

    new_line    db 0xA, 0x0

    max_check   dq 0x0
    found       dq 0x0
    cached      dq 0x0

    ; string buffer, used to store numbers temporarily for printing
    int_buffer  db 0xC dup(0x0)
    buff_len    equ $ - int_buffer

    ; stores multiple numbers at once for printing
    prt_buffer  db 0x15F6 dup(0x0)
    prt_len     equ $ - prt_buffer

    ; input and output handles, for printing and reading input
    in_handle   dq 0x0
    out_handle  dq 0x0

    ; used for calculating execution time
    start_time  dq 0x0
    end_time    dq 0x0
    duration    dq 0x0

    ; booleans, they are qwords to avoid problems with comparison and register sizes
    FALSE       dq 0x0
    TRUE        dq 0xFF

section .text
    ; Windows API functions
    extern      ExitProcess
    extern      GetStdHandle
    extern      ReadFile
    extern      WriteFile
    ; C functions
    extern      strcat
    extern      strtol
    extern      _itoa
    extern      clock

    global      _start

_start:
    push        rbp
    mov         rbp, rsp
    sub         rsp, 0x20

    ; get input and output handles
    mov         rcx, -0xA
    call        GetStdHandle
    mov         [in_handle], rax
    mov         rcx, -0xB
    call        GetStdHandle
    mov         [out_handle], rax

    mov         rcx, [out_handle]
    mov         rdx, prompt
    mov         r8, pmpt_len
    call        WriteFile

    mov         rcx, [in_handle]
    lea         rdx, int_buffer
    mov         r8, buff_len
    call        ReadFile

    ; measure current time
    call        clock
    mov         [start_time], rax

    ;convert max number to integer
    mov         rcx, int_buffer
    xor         rdx, rdx
    mov         r8, 0xA
    call        strtol
    mov         [max_check], rax

    ; clear number string buffer
    mov         rdi, int_buffer
    mov         rcx, buff_len
    mov         rax, 0x0
    rep         stosb

    ; fun stuff
    mov         rcx, [max_check]
    call        printPrimes

    ; calculate execution time
    call        clock
    mov         [end_time], rax
    mov         rax, [end_time]
    sub         rax, [start_time]
    mov         [duration], rax

    ; end message
    mov         rcx, [out_handle]
    mov         rdx, found_msg
    mov         r8, fmsg_len
    xor         r9, r9
    call        WriteFile

    mov         rcx, [found]
    lea         rdx, int_buffer
    mov         r8, 0xA ; number base
    call        _itoa

    mov         rcx, int_buffer
    mov         rdx, new_line
    xor         r8, r8
    call        strcat

    mov         rcx, [out_handle]
    mov         rdx, int_buffer
    mov         r8, buff_len
    xor         r9, r9
    call        WriteFile

    mov         rdi, int_buffer
    mov         rcx, buff_len
    mov         rax, 0x0
    rep         stosb

    ; display execution time
    mov         rcx, [out_handle]
    mov         rdx, time_msg_1
    mov         r8, t_msg_1_len
    call        WriteFile

    mov         rcx, [duration]
    lea         rdx, int_buffer
    mov         r8, 0xA
    call        _itoa

    mov         rcx, [out_handle]
    mov         rdx, int_buffer
    mov         r8, buff_len
    xor         r9, r9
    call        WriteFile

    mov         rcx, [out_handle]
    mov         rdx, time_msg_2
    mov         r8, t_msg_2_len
    call        WriteFile

    xor         rax, rax
    call        ExitProcess


printPrimes:
    push        rbp
    mov         rbp, rsp
    sub         rsp, 0x20

    mov         r14, 0x1 ; counter var
    mov         r15, rcx ; max int to check

.printLoop:
    cmp         r14, r15
    jg          .allPrinted

    mov         rcx, r14
    call        checkIfPrime
    test        rax, rax
    jnz         .foundPrime

    inc         r14
    jmp         .printLoop

.foundPrime:
    ; convert
    mov         rcx, r14
    lea         rdx, int_buffer
    mov         r8, 0xA
    call        _itoa

    ; faster than an additional strcat call
    mov         rcx, int_buffer
    call        countDigits
    lea         rbx, [int_buffer]
    mov         byte [rbx + rax], 0xA ; int buffer pointer + digit count = position to add new line

    ; add to buffer
    mov         rcx, prt_buffer
    mov         rdx, int_buffer
    xor         r8, r8
    call        strcat

    inc         r14
    inc         qword [found]
    inc         qword [cached]

.addedNumber:
    ; print after adding n numbers to buffer
    cmp        qword [cached], 0x1FF
    jng        .printLoop

    mov         rcx, [out_handle]
    mov         rdx, prt_buffer
    mov         r8, prt_len
    xor         r9, r9
    call        WriteFile

    mov         rdi, prt_buffer
    mov         rcx, prt_len
    mov         rax, 0x0
    rep         stosb

    mov         qword [cached], 0x0

    jmp         .printLoop

.allPrinted:
    mov         rcx, [out_handle]
    mov         rdx, prt_buffer
    mov         r8, prt_len
    xor         r9, r9
    call        WriteFile

    mov         rdi, prt_buffer
    mov         rcx, prt_len
    mov         rax, 0x0
    rep         stosb

    mov         rsp, rbp
    pop         rbp
    ret

countDigits:
    push        rbp
    mov         rbp, rsp
    sub         rsp, 0x20

    mov         r12, 0xA ; digit counter
    lea         r13, [int_buffer + buff_len - 3] ; buffer length - 1 is NUL, -2 is reserved for new line, -3 is the last number digit

.countLoop:
    cmp         byte [r13], 0x0 ; check if char is NUL
    jnz         .endCount

    dec         r12
    dec         r13
    jmp         .countLoop

.endCount:
    mov         rax, r12

    mov         rsp, rbp
    pop         rbp
    ret


checkIfPrime:
    push        rbp
    mov         rbp, rsp
    sub         rsp, 0x20

    cmp         rcx, 0x2
    jl          .notPrime
    jg          .caseGreater

    mov         rax, [TRUE]

    mov         rsp, rbp
    pop         rbp
    ret

.notPrime:
    mov         rax, [FALSE]

    mov         rsp, rbp
    pop         rbp
    ret

.caseGreater:
    test        rcx, 0x1
    jz          .notPrime

    mov         r8, 0x3 ; counter for loop

    ; precompute sqrt of number, thx StackOverflow
    cvtsi2sd    xmm0, rcx
    sqrtsd      xmm0, xmm0     ; sd means scalar double, as opposed to SIMD packed double
    cvttsd2si   r9, xmm0     ; convert with truncation (C-style cast)

.checkDivisors:
    cmp         r8, r9
    jg          .noDivisors

    xor         rdx, rdx
    mov         rax, rcx
    mov         rbx, r8
    div         rbx
    test        rdx, rdx
    jz          .notPrime

    add         r8, 0x2
    jmp         .checkDivisors

.noDivisors:
    mov         rax, [TRUE]

    mov         rsp, rbp
    pop         rbp
    ret
`;
