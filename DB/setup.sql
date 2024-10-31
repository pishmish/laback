create database if not exists `zadados`;

use zadados;

create table if not exists `Product` (
	`productID` int not null auto_increment unique,
	`stock` int not null,
	`name` varchar(255) not null,
	`unitPrice` decimal(8,2) not null,
	`overallRating` decimal(1,1),
	`discountPercentage` int(3) not null default 0,
	`description` text,
	`timeListed` timestamp not null default current_timestamp,
	`brand` varchar(64),
	`showProduct` boolean default true,
	`pictures` BLOB, /* still needs some work */
	`material` varchar(64),
	`capacityLitres` decimal(4,1),
	`warrantyMonths` int(3),
	`serialNumber` varchar(64),
	`popularity` int(3) default 0,
	primary key (`productID`)
);

create table if not exists `Category` (
	`categoryID` int not null auto_increment unique,
	`name` varchar(255) not null,
	`description` text,
	`timeCreated` timestamp not null default current_timestamp,
	primary key (`categoryID`)
);

create table if not exists `CategoryCategorizesProduct` (
	`categoryID` int not null,
	`productID` int not null,
	primary key (`categoryID`, `productID`),
	foreign key (`categoryID`) references `Category` (`categoryID`) on delete cascade,
	foreign key (`productID`) references `Product` (`productID`) on delete cascade
);

create table `Customer` (
    `customerID` int not null auto_increment unique,
    `timeJoined` timestamp not null default current_timestamp,
    `phone` varchar(15),
    `taxID` varchar(20),
    primary key (`customerID`)
);

create table `Wishlist` (
    `wishlistID` int not null auto_increment unique,
    `productID` int not null,
    `addedTime` timestamp not null default current_timestamp,
    `customerID` int not null,
    primary key (`wishlistID`, `customerID`, `productID`),
    foreign key (`customerID`) references Customer(`customerID`) on delete cascade,
    foreign key (`productID`) references Product(`productID`) on delete cascade
);

create table `Address` (
	`addressID` int not null auto_increment unique,
	`addressTitle` varchar(64) not null,
	`country` varchar(64) not null,
	`city` varchar(64) not null,
	`province` varchar(64),
	`zipCode` varchar(10) not null,
	`streetAddress` varchar(255) not null,
	`longitude` decimal(10,8),
	`latitude` decimal(8,6),
	primary key (`addressID`),
);

create table `BillingInfo` (
    	`billingID` int not null auto_increment unique,
    	`customerID` int not null,
    	`creditCardNo` varbinary(128) not null, /* Encrypted credit card number */
    	`creditCardEXP` varchar(5) not null, /* Enforced format mm/yy */
    	`creditCardCVV` varbinary(128) not null, /* Encrypted CVV */
    	`addressID` int not null,  /* should refer to other table */
    	primary key (`billingID`),
    	foreign key (`customerID`) references Customer(`customerID`) on delete cascade,
		foreign key (`addressID`) references Address(`addressID`) on delete restrict,
    	check (`creditCardEXP` regexp '^(0[1-9]|1[0-2])/([0-9]{2})$') -- Enforce mm/yy format
);
	


create table if not exists `Courier` (
    `CourierID` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(255),
    `Phone` int NOT NULL,
    `Email` varchar(255) NOT NULL,
    `TimeJoined` timestamp default CURRENT_TIMESTAMP NOT NULL,
    `Capacity` int default 0,
	`addressID` int NOT NULL,
    PRIMARY KEY (`CourierID`),
	FOREIGN KEY (`addressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT
);

create table if not exists `DeliveryRegion` (
    `RegionID` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(255) NOT NULL,
    `Population` int,
    `SEIFA` int,
    PRIMARY KEY (`RegionID`)
);

create table if not exists `CourierDeliversToDeliveryRegion` (
    `CourierID` int NOT NULL,
    `RegionID` int NOT NULL,
    `DeliveryCost` int NOT NULL,
    PRIMARY KEY (`CourierID`, `RegionID`),
    FOREIGN KEY (`CourierID`) REFERENCES `Courier`(`CourierID`) ON DELETE CASCADE,    -- dont want to update IDs
    FOREIGN KEY (`RegionID`) REFERENCES `DeliveryRegion`(`RegionID`) ON DELETE CASCADE
);


create table if not exists `User` (
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL, -- enforced format
	`username` varchar(255) NOT NULL, -- needs to be encrypted
	`password` varchar(255) NOT NULL, -- needs to be encrypted
	PRIMARY KEY (`username`),
    CONSTRAINT `chk_valid_email` CHECK (`email` LIKE '%_@__%.__%')
);

create table if not exists `ProductManager` ( -- ProductManager IS A User
	`username` varchar(255) NOT NULL PRIMARY KEY REFERENCES User(`username`)
);

create table if not exists `SalesManager` ( -- SalesManager IS A User
		`username` varchar(255) NOT NULL PRIMARY KEY REFERENCES User(`username`)
);

create table if not exists `ProdManagerContactsCourier` ( --Going to get to this tomorrow -Areeb :)

)

-- not working properly yet, "but i think this is the proper way" (particpation constraint)
-- DELIMITER //

-- CREATE TRIGGER ensure_courier_has_region
-- AFTER INSERT ON Courier
-- FOR EACH ROW
-- BEGIN
--     DECLARE region_count INT;
--     SELECT COUNT(*) INTO region_count FROM CourierDeliversToDeliveryRegion WHERE CourierID = NEW.CourierID;
--     IF region_count = 0 THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Each courier must have at least one region.';
--     END IF;
-- END //

-- DELIMITER ;

