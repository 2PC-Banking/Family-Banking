-- Test data seed for Family Banking project
-- Usage:
--   psql -U postgres -h localhost -p 5432 -d "2PC" -f "data/2pc.test-data.sql"
-- Notes:
--   - This script only seeds data (no CREATE TABLE).
--   - Safe to run multiple times due to ON CONFLICT DO NOTHING.

BEGIN;

-- Optional cleanup old test rows for deterministic result
DELETE FROM "transaction" WHERE transactionid IN ('TX01_OUT', 'TX01_IN', 'TX02_OUT', 'TX02_IN');
DELETE FROM account WHERE accountnumber IN ('1000000001', '1000000002', '1000000003');
DELETE FROM customer WHERE customerid IN ('CUS01', 'CUS02', 'CUS03');
DELETE FROM branch WHERE branchid IN ('BR01');
DELETE FROM bank WHERE bankcode IN ('970418');

INSERT INTO bank (bankcode, bankname) VALUES
('970418', 'BIDV')
ON CONFLICT (bankcode) DO NOTHING;

INSERT INTO branch (branchid, bankcode, address) VALUES
('BR01', '970418', 'Ha Noi')
ON CONFLICT (branchid) DO NOTHING;

INSERT INTO customer (customerid, branchid, name, pass, address, phone) VALUES
('CUS01', 'BR01', 'Nguyen Van A', '123456', 'Ha Noi', '0900000000'),
('CUS02', 'BR01', 'Tran Thi B', '123456', 'Ha Noi', '0900000001'),
('CUS03', 'BR01', 'Le Van C', '123456', 'Ha Noi', '0900000002')
ON CONFLICT (customerid) DO NOTHING;

-- Keep account numbers numeric because mobile transfer input uses numeric keyboard
INSERT INTO account (accountnumber, customerid, balance, dateopened, interestrate, overdraftlimit) VALUES
('1000000001', 'CUS01', 5000000, CURRENT_DATE, 0.01, 0),
('1000000002', 'CUS02', 3000000, CURRENT_DATE, 0.01, 0),
('1000000003', 'CUS03', 9000000, CURRENT_DATE, 0.01, 0)
ON CONFLICT (accountnumber) DO NOTHING;

INSERT INTO "transaction" (transactionid, accountnumber, amount, timestamp, type, relatedaccount, postbalance) VALUES
('TX01_OUT', '1000000001', -200000, NOW() - INTERVAL '1 day', 'ChuyenTien', '1000000002', 4800000),
('TX01_IN',  '1000000002',  200000, NOW() - INTERVAL '1 day', 'NhanTien',   '1000000001', 3200000),
('TX02_OUT', '1000000003', -150000, NOW() - INTERVAL '6 hour', 'ChuyenTien', '1000000001', 8850000),
('TX02_IN',  '1000000001',  150000, NOW() - INTERVAL '6 hour', 'NhanTien',   '1000000003', 4950000)
ON CONFLICT (transactionid) DO NOTHING;

COMMIT;

-- Quick verify
-- SELECT customerid, name, phone FROM customer ORDER BY customerid;
-- SELECT accountnumber, customerid, balance FROM account ORDER BY accountnumber;
-- SELECT transactionid, accountnumber, amount, type, relatedaccount, timestamp FROM "transaction" ORDER BY timestamp DESC;
