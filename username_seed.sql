USE riverAlertDB;



INSERT INTO userAccount (username, userpassword, accountStatus, confirmationCode, email, createdAt, updatedAt)
VALUES ("guest", "password", "Active", "1", "testemail@gmail.com", now(),now());

INSERT INTO userAccount (username, userpassword, accountStatus, confirmationCode, email, createdAt, updatedAt)
VALUES ("tester", "password", "Pending", "2", "testemail@gmail.com", now(),now());


INSERT INTO follow (username, riverId, createdAt, updatedAt)
VALUES ("guest", "RICV2", now(),now());

INSERT INTO measure (riverValue, riverId, createdAt, updatedAt)
VALUES ("RICV2", -1, now(),now());

INSERT INTO measure (riverValue, riverId, createdAt, updatedAt)
VALUES ("RICV2", -2, now(),now());