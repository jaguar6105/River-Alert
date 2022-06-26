USE riverAlertDB;



INSERT INTO userAccount (username, userpassword, confirmed, email, createdAt, updatedAt)
VALUES ("guest", "password", 1, "testemail@gmail.com", now(),now());
