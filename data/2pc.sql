-- 1. Bảng Bank
CREATE TABLE Bank (
    bankCode VARCHAR(50) PRIMARY KEY,
    bankName VARCHAR(255)
);

-- 2. Bảng Branch
CREATE TABLE Branch (
    branchID VARCHAR(50) PRIMARY KEY,
    bankCode VARCHAR(50),
    address VARCHAR(255),
    FOREIGN KEY (bankCode) REFERENCES Bank(bankCode)
);

-- 3. Bảng Customer
CREATE TABLE Customer (
    customerID VARCHAR(50) PRIMARY KEY,
    branchID VARCHAR(50),
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(20),
    FOREIGN KEY (branchID) REFERENCES Branch(branchID)
);

-- 4. Bảng Account
CREATE TABLE Account (
    accountNumber VARCHAR(50) PRIMARY KEY,
    customerID VARCHAR(50),
    balance DECIMAL,
    dateOpened DATE,
    interestRate DECIMAL,     
    overdraftLimit DECIMAL,   
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);

-- 5. Bảng Transactio
CREATE TABLE Transaction (
    transactionID VARCHAR(50) PRIMARY KEY,
    accountNumber VARCHAR(50),
    amount DECIMAL,
    timestamp TIMESTAMP,
    type VARCHAR(50),
    relatedAccount VARCHAR(50),
    postBalance DECIMAL,
    FOREIGN KEY (accountNumber) REFERENCES Account(accountNumber)
);