-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Description of the crime scene
SELECT description
FROM crime_scene_reports
WHERE month = 7 AND day = 28
AND street = 'Humphrey Street';

--receive the transcript of the witnesses that were interviewed
SELECT transcript
FROM interviews
WHERE year = 2021 AND month = 7
AND day = 28;

--get the licence plate from the suspect through the security cameras of the bakery
SELECT name
FROM people
JOIN bakery_security_logs ON bakery_security_logs.license_plate = people.license_plate
WHERE year = 2021 AND month = 7
AND day = 28 AND hour = 10
AND minute >= 15 AND minute <= 25
and activity = 'exit';


--get the name of the people through getting their account number from atm_security_logs tbl
SELECT name
FROM people
JOIN bank_accounts ON people.id = bank_acounts.id
JOIN atm_transactions ON bank_accounts.account_number = atm_transactions.account_number
WHERE year = 2021 AND month = 7
AND day = 28 AND atm_location = 'Leggett Street';

--flight
SELECT name
FROM people
JOIN passengers ON people.passport_number = passengers.passport_number
WHERE passengers.fight_id = (
    SELECT id FROM flights
    WHERE year = 2021 AND month = 7
    AND day = 29 AND origin_airport_id = (
        SELECT id FROM airports WHERE city = 'Fiftyville'
    )
    ORDER BY hour, minute
    LIMIT 1;
)

SELECT name
FROM people
JOIN phone_calls ON people.phone_number = phone_calls.caller
WHERE year = 2021 AND month = 7
AND day = 28 AND duration < 60;

--destination

SELECT city FROM airports
WHERE id = (SELECT destination_airport_id FROM flights
    WHERE year = 2021 AND month = 7 AND day = 29
    AND origin_airport_id = (
        SELECT id FROM airports WHERE city = 'Fiftyville'
    )
    ORDER BY hour, minute
    LIMIT 1);

--accomplice

SELECT phone_number FROM people WHERE name = 'Bruce';

SELECT name FROM people
WHERE phone_number = (SELECT receiver FROM phone_calls
    WHERE year = 2021 AND month = 7 AND day = 28 AND duration < 60 AND caller = '(367) 555-5533');
