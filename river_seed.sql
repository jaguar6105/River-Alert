USE riverAlertDB;

CREATE TABLE riverStation (
    riverId integer,
    stationId varchar(30),
    river varchar(50),
    stationLocation varchar(50)
);

INSERT INTO riverStation (stationId, river, stationLocation)
VALUES ("02037500", "James River", "Richmond");