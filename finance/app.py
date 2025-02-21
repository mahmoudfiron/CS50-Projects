import os

import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Connect to the database
db = SQL("sqlite:///finance.db")

# Create the required tables
db.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    cash NUMERIC DEFAULT 10000.00
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS portfolio (
    user_id INTEGER,
    symbol TEXT,
    shares INTEGER,
    bought_price NUMERIC,
    current_price NUMERIC,
    PRIMARY KEY (user_id, symbol),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS history (
    user_id INTEGER,
    symbol TEXT,
    shares INTEGER,
    method TEXT,
    price NUMERIC,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
""")

db.execute("""
CREATE TABLE IF NOT EXISTS transactions (
    user_id INTEGER,
    symbol TEXT,
    shares INTEGER,
    price NUMERIC,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
""")

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    stocks = db.execute("SELECT symbol, SUM(shares) as total_shares FROM transactions WHERE user_id = :user_id GROUP BY symbol having total_shares < 0",
                    user_id=session["user_id"])

    cash = db.execute("SELECT cash FROM users WHERE id= :user_id", user_id = session["user_id"])[0]["cash"]
    total_value = cash
    grand_total = cash

    for stock in stocks:
        quote = lookup(stock["symbol"])
        stock["name"] = quote["name"]
        stock["price"] = quote["price"]
        stock["value"] = quote["shares"] * quote["price"]
        total_value += stock["value"]
        grand_total += stock["value"]

    return render_template("index.html", stocks=stocks, cash=cash, total_value=total_value, grand_total=grand_total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    if request.method == "POST":
        symbol = request.form.get("symbol").upper()
        shares = request.form.get("shares")

        # Ensure the symbol is not empty
        if not symbol:
            return apology("must provide a symbol")

        # Ensure the shares are a positive integer
        elif not shares or not shares.isdigit() or int(shares) <= 0:
            return apology("must provide a positive integer number of shares")

        # Look up the stock quote
        quote = lookup(symbol)

        # Ensure the quote was found
        if quote is None:
            return apology("Symbol not found")

        # Get the price and calculate the total cost
        price = quote["price"]
        total_cost = int(shares) * price

        # Get the user's available cash
        cash = db.execute("SELECT cash FROM users WHERE id = :user_id", user_id=session["user_id"])[0]["cash"]

        # Check if the user has enough cash
        if cash < total_cost:
            return apology("Not enough cash")

        # Update the user's cash balance
        db.execute("UPDATE users SET cash = cash - :total_cost WHERE id = :user_id",
                   total_cost=total_cost, user_id=session["user_id"])

        # Insert the transaction into the database
        db.execute("INSERT INTO transactions (user_id, symbol, shares, price) VALUES (:user_id, :symbol, :shares, :price)",
                   user_id=session["user_id"], symbol=symbol, shares=shares, price=price)

        # Flash a success message and redirect the user
        flash(f"Bought {shares} shares of {symbol} for {usd(total_cost)}!")
        return redirect("/")

    else:
        # If GET request, show the buy page
        return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    transactions = db.execute(
        "SELECT * FROM transactions WHERE user_id= :user_id ORDER BY timestamp DESC", user_id= session["user_id"]
    )
    return render_template("history.html" , trnsactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    if request.method == "POST":
        symbol = request.form.get("symbol")
        quote = lookup(symbol)

        # Ensure quote is returned
        if not quote:
            return apology("Invalid symbol", 400)

        # Ensure that the price is a number before performing operations on it
        try:
            price = float(quote["price"])
        except (TypeError, ValueError):
            return apology("Invalid data received from stock API", 400)

        return render_template("quote.html", quote=quote)

    return render_template("quote.html")




@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    session.clear()

    if request.method == "POST":
        if not request.form.get("username"):
            return apology("Must provide a username" , 400)

        elif not request.form.get("password"):
            return apology("Must provide a password" , 400)

        elif not request.form.get("confirmation"):
            return apology("Must confirm password" , 400)

        elif request.form.get("password") != request.form.get("confirmation"):
            return apology("Passwords do not match" , 400)

        rows = db.execute("SELECT * FROM users WHERE username = ?" , request.form.get("username"))

        if len(rows) != 0:
            return apology("Username already exists" , 400)

        db.execute("INSERT INTO users (username, hash) VALUES(?, ?)",
                   request.form.get("username"), generate_password_hash(request.form.get("password")))

        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        session["user_id"] = rows[0]["id"]

        return redirect("/")

    if request.method == "GET":
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    stocks = db.execute("SELECT symbol, SUM(shares) as total_shares FROM transactions WHERE user_id = :user_id GROUP BY symbol HAVING total_shares > 0",
                        user_id = session["user_id"])
    if request.method == "POST":
            symbol = request.form.get("symbol").upper()
            shares = request.form.get("shares")
            if not symbol:
                return apology("Select a Stock")
            elif not shares or not shares.isdigit() or int(shares) <= 0:
                return apology("Provide a positive integer number of shares")
            else:
                shares = int(shares)



            for stock in stocks:
                if stock["symbol"] == symbol:
                    if stock["total_shares"] < shares:
                        return apology("Not Enough Shares")
                    else:
                        quote = lookup(symbol)
                        if quote is None:
                            return apology("Symbol Not Valid")
                        price = quote["price"]
                        total_sale = shares * price

                        db.execute("UPDATE users SET cash= cash + :total_sale WHERE id= :user_id",
                                   total_sale= total_sale, user_id= session["user_id"])

                        db.execute("INSERT INTO transactions (user_id, symbol, shares, price) VALUES ():user_id, :symbol, :shares, :price)",
                                   user_id= session["user_id"], symbol= symbol, shares= shares, price= price)

                        flash(f"Sold {shares} shares of {symbol} for {usd(total_sale)}!")
                        return redirect("/")

            return apology("symbol not found")
    else:
        return render_template("sell.html", stocks=stocks)
