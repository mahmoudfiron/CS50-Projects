from cs50 import get_int
import math


def checkSum(cardNum, length):
    # To get the sum of all digits based on Lunh's Algo
    sum = 0
    for i in range(length):
        # Get the last digit of given cardNum
        last = int(cardNum % 10)
        # Remove the last digit and assign the new value cardNum
        cardNum = int(cardNum / 10)
        if i % 2 != 0:
            # On odd index multiple by 2
            last = last * 2
            # If value is 2 digits long then add both the digits
            if last >= 10:
                lastDigit = int(last % 10)
                firstDigit = int(last / 10)
                last = lastDigit + firstDigit
            # Add the value of last to sum
            sum += last
        else:
            # Add the value of last number to sum for even digits
            sum += last
    # Check if the last digit is 0
    return int(sum % 10 == 0)


cardNum = get_int("Number: ")
# Get the length of integer
length = int(math.log10(cardNum)) + 1
# Get the first 2 digits
firstDigits = int(cardNum / math.pow(10, length - 2))
# Check the card type
if length == 15 and firstDigits in (34, 37):
    print("AMEX")
elif length == 16 and firstDigits in (51, 52, 53, 54, 55):
    print("MASTERCARD")
elif length in (13, 16) and int(firstDigits / 10) == 4 and checkSum(cardNum, length):
    print("VISA")
else:
    print("INVALID")
