-- PostgreSQL schema for Family Banking.
-- This matches the lowercase table/column names used by Entity Framework.

CREATE TABLE IF NOT EXISTS bank (
    bankcode VARCHAR(50) PRIMARY KEY,
    bankname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS branch (
    branchid VARCHAR(50) PRIMARY KEY,
    bankcode VARCHAR(50) NOT NULL REFERENCES bank(bankcode),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS customer (
    customerid VARCHAR(50) PRIMARY KEY,
    branchid VARCHAR(50) REFERENCES branch(branchid),
    name VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS account (
    accountnumber VARCHAR(50) PRIMARY KEY,
    customerid VARCHAR(50) REFERENCES customer(customerid),
    balance NUMERIC(18, 2) NOT NULL DEFAULT 0,
    dateopened DATE NOT NULL DEFAULT CURRENT_DATE,
    interestrate NUMERIC(10, 4) NOT NULL DEFAULT 0,
    overdraftlimit NUMERIC(18, 2) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "transaction" (
    transactionid VARCHAR(50) PRIMARY KEY,
    accountnumber VARCHAR(50) REFERENCES account(accountnumber),
    amount NUMERIC(18, 2) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    type VARCHAR(50),
    relatedaccount VARCHAR(50),
    postbalance NUMERIC(18, 2) NOT NULL DEFAULT 0
);
