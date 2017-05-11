CREATE TABLE `Customers` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `uname` VARCHAR(100) NOT NULL UNIQUE ,
  `uemail` VARCHAR(100) NOT NULL UNIQUE ,
  `upassword` VARCHAR(100) NOT NULL,
  `ucity` VARCHAR(100) NOT NULL ,
  `uoccupation` VARCHAR(100) NOT NULL ,
  `upic` VARCHAR(1000),
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp,
  `UpdatedAt`timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`));

CREATE TABLE `Projects` (
  `pid` INT NOT NULL AUTO_INCREMENT,
  `pname` VARCHAR(45) NOT NULL UNIQUE,
  `pdescription` VARCHAR(45) NOT NULL,
  `pownid` INT NOT NULL,
  `min_amount`INT NOT NULL ,
  `max_amount` INT NOT NULL ,
  `ptotalfinal` INT,
  `fund_endtime` DATETIME NOT NULL,
  `pro_endtime` DATETIME,
  `ppic` VARCHAR(1000),
  `postime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pstatus` VARCHAR(45) NOT NULL ,
  `UpdatedAt`timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`pid`,`pname`));


CREATE TABLE `Cards` (
  `cnum` VARCHAR(50) NOT NULL,
  `uid` INT NOT NULL,
  `exp_date` DATE NOT NULL,
  `holder` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`cnum`,`uid`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`));



CREATE TABLE `Follow` (
  `uid` INT NOT NULL,
  `followid` INT NOT NULL ,
  `fotime` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`followid`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`followid`) REFERENCES `Customers` (`uid`));


CREATE TABLE `Money` (
  `uid` INT NOT NULL ,
  `cnum` VARCHAR(50) NOT NULL,
  `pid` INT NOT NULL ,
  `mamount` INT NOT NULL ,
  `motime` DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`cnum`,`pid`,`motime`),
  FOREIGN KEY (`uid`) REFERENCES  `Customers` (`uid`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`),
  FOREIGN KEY (`cnum`, `uid`) REFERENCES `Cards` (`cnum`, `uid`)
  );


CREATE TABLE `Records` (
  `uid` INT NOT NULL ,
  `cnum` VARCHAR(50) NOT NULL,
  `pid` INT NOT NULL,
  `ramount` INT NOT NULL,
  `retime` DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`pid`,`cnum`,`retime`),
  FOREIGN KEY (`uid`) REFERENCES  `Customers` (`uid`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`),
  FOREIGN KEY (`cnum`, `uid`) REFERENCES `Cards` (`cnum`, `uid`));


CREATE TABLE `Comments` (
  `uid` INT NOT NULL,
  `pid` INT NOT NULL,
  `ccontent` VARCHAR(1000) NOT NULL,
  `ctime` DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`pid`,`ctime`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`));



CREATE TABLE `Rates` (
  `uid` INT NOT NULL,
  `pid` INT NOT NULL,
  `rpoint` NUMERIC(2,1) NOT NULL,
  `ratime` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`pid`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`));



CREATE TABLE `Updates` (
  `uid` INT NOT NULL,
  `pid` INT NOT NULL,
  `udescription` VARCHAR(1000) NOT NULL,
  `utime` DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`pid`,`utime`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`));

CREATE TABLE `Appendix` (
  `uid` INT NOT NULL,
  `pid` INT NOT NULL,
  `apcontent` BLOB NOT NULL,
  `apdescription` VARCHAR(1000) NOT NULL,
  `utime` DATETIME NOT NULL DEFAULT current_timestamp,
  `atype` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`uid`,`pid`,`utime`),
  FOREIGN KEY (`uid`,`pid`,`utime`) REFERENCES `Updates` (`uid`,`pid`,`utime`));




CREATE TABLE `Tags` (
  `tname` VARCHAR(1000) NOT NULL,
  `tdescription` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`tname`));



CREATE TABLE `Interest` (
  `uid` INT NOT NULL,
  `tname` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`uid`,`tname`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`tname`) REFERENCES `Tags` (`tname`));

CREATE TABLE `Project_type` (
  `pid` INT NOT NULL,
  `tname` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`pid`,`tname`),
  FOREIGN KEY (`pid`) REFERENCES `Projects` (`pid`),
  FOREIGN KEY (`tname`) REFERENCES `Tags` (`tname`));

CREATE TABLE `Messages` (
  `uid` INT NOT NULL,
  `toid` INT NOT NULL,
  `mcontent` VARCHAR(1000) NOT NULL,
  `mtime` DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`uid`,`mtime`),
  FOREIGN KEY (`uid`) REFERENCES `Customers` (`uid`),
  FOREIGN KEY (`toid`) REFERENCES `Customers` (`uid`));

CREATE TABLE `Like` (
  uid INT NOT NULL,
  pid INT NOT NULL,
  `like_dislike`VARCHAR(40) NOT NULL,
  PRIMARY KEY (uid, pid),
  FOREIGN KEY (uid) REFERENCES Customers(uid),
  FOREIGN KEY (pid) REFERENCES `Projects`(`pid`));

CREATE TABLE Log (
  uid INT NOT NULL,
  lcontent VARCHAR(1000) NOT NULL,
  ltype VARCHAR(40) NOT NULL,
  ltime DATETIME NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (uid, ltime),
  FOREIGN KEY (uid) REFERENCES Customers(uid));


####################################################################
###################          Triggers           ####################
####################################################################

CREATE TRIGGER `maxAmount`
AFTER INSERT ON `Money`
FOR EACH ROW
BEGIN
    UPDATE Projects LEFT JOIN (
      SELECT pid, SUM(mamount) as total_money
      FROM Money
      GROUP BY pid) AS T
      ON Projects.pid = T.pid
      SET Projects.pstatus = 'successful',
        Projects.ptotalfinal = T.total_money
    WHERE Projects.pid = new.pid AND max_amount <= T.total_money;
END;

CREATE TRIGGER `moneyToRecord`
BEFORE UPDATE ON `Projects`
FOR EACH ROW
BEGIN
     IF old.pstatus != new.pstatus AND new.pstatus = 'successful' THEN
       INSERT INTO Records(uid,cnum, pid, ramount,retime)
         SELECT uid, cnum, pid, mamount,motime
           FROM Money
             WHERE Money.pid=new.pid;
     END IF;
END;

create trigger `maxPrevent`
before insert on `Money`
for each row
begin
  IF (SELECT pstatus FROM Projects WHERE Projects.pid=new.pid) !='active' then
    SIGNAL sqlstate '45000' SET MESSAGE_TEXT ='Already completed, payment not valid';
  END IF;
end;

create trigger `SponsorCanRate`
before insert on `Rates`
for each row
begin
  IF (SELECT pstatus FROM Projects WHERE pid = new.pid) != 'successful' THEN
    SIGNAL sqlstate '45000' SET MESSAGE_TEXT ='The status of this project is not successfull';
  END IF;
  IF new.uid NOT IN (SELECT Records.uid FROM Records WHERE Records.pid=new.pid) THEN
    SIGNAL sqlstate '45000' SET MESSAGE_TEXT ='Only sponsors can rate.';
  END IF;
end;

#CREATE TRIGGER deletecard
#BEFORE DELETE ON Cards
#FOR EACH ROW
#BEGIN
  #IF old.cnum IN(SELECT cnum FROM Money WHERE old.uid = Money.uid)
  #THEN
    #SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'This card is still using in some projects!';
  #END IF;
  #DELETE FROM Records
    #WHERE cnum = old.cnum AND uid = old.uid;
#END;

CREATE TRIGGER deleteCard
BEFORE DELETE ON Cards
FOR EACH ROW
BEGIN
  IF old.cnum IN(SELECT cnum FROM Money NATURAL JOIN Projects WHERE old.uid = Money.uid AND pstatus = 'active')
  THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT  = 'This card is still using in some projects!';
  END IF;
  UPDATE Records
    SET cnum = -1
    WHERE cnum = old.cnum AND uid = old.uid;
  DELETE FROM Money WHERE cnum = old.cnum AND uid = old.uid;
END;

CREATE TRIGGER deleteUpdate
BEFORE DELETE ON Updates
FOR EACH ROW
BEGIN
  DELETE FROM Appendix
    WHERE uid = old.uid AND pid = old.pid AND utime = old.utime;
END;

CREATE TRIGGER addCard
AFTER INSERT ON Customers
FOR EACH ROW
  BEGIN
    INSERT INTO Cards(cnum, uid, exp_date, holder) VALUES (-1, new.uid,'2300-1-1', '#');
  END;

# DROP TRIGGER `maxAmount`;
# DROP TRIGGER `moneyToRecord`;
# DROP TRIGGER `moneyToRecordDelete`;

####################################################################
###################          Events           ####################
####################################################################

CREATE EVENT checkend
  ON SCHEDULE EVERY 1 HOUR
  STARTS CURRENT_DATE
  COMMENT 'Check if any project reaches at fund_endtime'
  DO
    UPDATE Projects LEFT JOIN (
      SELECT pid, SUM(mamount) as total_money
      FROM Money
      GROUP BY pid) AS T
      ON Projects.pid = T.pid
      SET pstatus = CASE WHEN min_amount <= T.total_money
        THEN 'successful'
        ELSE 'failed'
        END,
        Projects.ptotalfinal = T.total_money
      WHERE fund_endtime <= CURRENT_TIMESTAMP AND pstatus = 'active';


CREATE EVENT deletemoney
  ON SCHEDULE EVERY 12 HOUR
  STARTS current_date
  COMMENT 'Delete the redundant tuples in Money'
  DO
    DELETE FROM Money
      WHERE pid IN (
          SELECT pid
          FROM Projects
          WHERE pstatus != 'active' );

CREATE EVENT deleteproject
  ON SCHEDULE EVERY 1 WEEK
  STARTS current_date
  COMMENT 'Delete the redundant tuples in project'
  DO
    BEGIN
      DELETE FROM Money
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Records
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Comments
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Rates
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Appendix
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Updates
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM `Like`
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Project_type
        WHERE pid IN (
            SELECT pid
            FROM Projects
            WHERE pstatus = 'stop' );
      DELETE FROM Projects
          WHERE pstatus = 'stop';
    END;

CREATE EVENT deletetag
  ON SCHEDULE EVERY 1 WEEK
  STARTS current_date
  COMMENT 'Delete the redundant tuples in tag'
  DO
    DELETE FROM Tags
      WHERE tname NOT IN (SELECT tname FROM Interest)
            AND tname NOT IN (SELECT tname FROM Project_type);

CREATE EVENT deletelog
  ON SCHEDULE EVERY 7 DAY
  STARTS current_date
  COMMENT 'Delete the redundant tuples in Log'
  DO
    DELETE FROM Log
      WHERE day(ltime) - day(current_date) > 7;
