create database if not exists `zadados`;

use zadados;

create database if not exists `zadados`;

use zadados;

create table if not exists `Address` (
	`addressID` int not null auto_increment unique,
	`addressTitle` varchar(64) not null,
	`country` varchar(64) not null,
	`city` varchar(64) not null,
	`province` varchar(64),
	`zipCode` varchar(10) not null,
	`streetAddress` varchar(255) not null,
	`longitude` decimal(10,8),
	`latitude` decimal(8,6),
	primary key (`addressID`)
);

create table if not exists `Supplier` (
	`supplierID` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`phone` int,
	`timeJoined` timestamp default CURRENT_TIMESTAMP,
	`addressID` int NOT NULL,
	PRIMARY KEY (`supplierID`),
	FOREIGN KEY (`addressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT
);

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
	`supplierID` int not null,
	`pictures` BLOB, /* still needs some work */
	`material` varchar(64),
	`capacityLitres` decimal(4,1),
	`warrantyMonths` int(3),
	`serialNumber` varchar(64),
	`popularity` int(3) default 0,
	primary key (`productID`),
	foreign key (`supplierID`) references `Supplier` (`supplierID`) on delete restrict
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

create table if not exists `User` (
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL, -- enforced format
	`username` varchar(255) NOT NULL, /* covering constraint TODO + needs to be encrypted */
	`password` varchar(255) NOT NULL, -- needs to be encrypted
	PRIMARY KEY (`username`),
    CONSTRAINT `chk_valid_email` CHECK (`email` LIKE '%_@__%.__%')
);

create table if not exists `ProductManager` ( -- ProductManager IS A User
	`username` varchar(255) NOT NULL,
	`supplierID` int NOT NULL,
	FOREIGN KEY (`username`) REFERENCES User(`username`),
	FOREIGN KEY (`supplierID`) REFERENCES Supplier(`supplierID`) 
);

create table if not exists `SalesManager` ( -- SalesManager IS A User
	`username` varchar(255) NOT NULL,
	`supplierID` int NOT NULL,
	FOREIGN KEY (`username`) REFERENCES User(`username`),
	FOREIGN KEY (`supplierID`) REFERENCES Supplier(`supplierID`)
);

create table if not exists `Courier` (
    `courierID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255),
    `phone` int NOT NULL,
    `email` varchar(255) NOT NULL,
    `timeJoined` timestamp default CURRENT_TIMESTAMP NOT NULL,
    `capacity` int default 0,
	`addressID` int NOT NULL,
    PRIMARY KEY (`courierID`),
	FOREIGN KEY (`addressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT
);

create table if not exists `ProdManagerContactsCourier` (
    `deliveryAddressID` int NOT NULL,
    `capacityPoints` int NOT NULL,
    `productManagerUsername` varchar(255),
    `courierID` int NOT NULL,
    FOREIGN KEY (`deliveryAddressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT,
    foreign key (`courierID`) references `Courier`(`courierID`) on delete restrict,
    foreign key (`productManagerUsername`) references `ProductManager`(`username`) on delete restrict,
    primary key (`courierID`, `productManagerUsername`)
);

create table if not exists `Customer` (
    `customerID` int not null auto_increment unique,
    `username` varchar(255) not null,
    `addressID` int not null,
    `timeJoined` timestamp not null default current_timestamp,
    `phone` varchar(15),
    `taxID` varchar(20),
    primary key (`customerID`),
    foreign key (`username`) references User(`username`) on delete cascade,
    foreign key (`addressID`) references Address(`addressID`) on delete restrict
);

create table if not exists`Wishlist` ( -- customer and wishlist tables are interdependent, need each other to be created so cant be created
    `wishlistID` int not null auto_increment unique,
    `productID` int not null,
    `addedTime` timestamp not null default current_timestamp,
    `customerID` int not null,
    primary key (`wishlistID`, `customerID`, `productID`),
    foreign key (`customerID`) references Customer(`customerID`) on delete cascade,
    foreign key (`productID`) references Product(`productID`) on delete cascade
); -- needs to be normalised

create table if not exists `BillingInfo` (
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
	
create table if not exists `DeliveryRegion` (
    `regionID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `population` int,
    `SEIFA` int,
    PRIMARY KEY (`regionID`)
);

create table if not exists `CourierDeliversToDeliveryRegion` (
    `courierID` int NOT NULL, /* participation constraint still needs to be done */
    `regionID` int NOT NULL,
    `reliveryCost` int NOT NULL,
    PRIMARY KEY (`courierID`, `regionID`),
    FOREIGN KEY (`courierID`) REFERENCES `Courier`(`courierID`) ON DELETE CASCADE,    -- dont want to update IDs
    FOREIGN KEY (`regionID`) REFERENCES `DeliveryRegion`(`regionID`) ON DELETE CASCADE
);

create table if not exists `Cart` (
	`cartID` int NOT NULL AUTO_INCREMENT,
	`totalPrice` real NOT NULL,
	`numProducts` int NOT NULL,
	`fingerprint` varchar(255) NOT NULL,
	`temporary` boolean NOT NULL,
	`customerID` int,
	PRIMARY KEY (`cartID`),
	FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE CASCADE
);

create table if not exists `CartContainsProduct` (
	`cartID` int NOT NULL,  /* participation constraint still needs to be done */
	`productID` int,
	PRIMARY KEY (`cartID`, `productID`),
	FOREIGN KEY (`cartID`) REFERENCES `Cart`(`cartID`) ON DELETE CASCADE,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE CASCADE
);

create table if not exists `Order` (
	`orderID` int NOT NULL AUTO_INCREMENT,
	`orderNumber` int NOT NULL,
	`timeOrdered` timestamp default CURRENT_TIMESTAMP NOT NULL,
	`totalPrice` real NOT NULL,
	`deliveryID` int NOT NULL,				-- Delivery is a relationship set	
	`deliveryStatus` varchar(255) NOT NULL,
	`deliveryAddressID` int NOT NULL,
	`estimatedArrival` date NOT NULL,
	`courierID` int NOT NULL,
	`cartID` int NOT NULL,
	PRIMARY KEY (`orderID`),
	foreign key (`cartID`) references `Cart`(`cartID`) on delete restrict,
	FOREIGN KEY (`deliveryAddressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT,
	FOREIGN KEY (`courierID`) REFERENCES `Courier`(`courierID`) ON DELETE RESTRICT,
);

create table if not exists `OrderOrderItemsProduct` (
	`orderID` int NOT NULL, /* participation constraint still needs to be done */
	`productID` int,
	`quantity` int NOT NULL,
	`purchasePrice` real NOT NULL,
	PRIMARY KEY (`orderID`, `productID`),
	FOREIGN KEY (`orderID`) REFERENCES `Order`(`orderID`) ON DELETE CASCADE,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE CASCADE
);

create table if not exists `ProdManagerCreatesCategory` (
	`creationDate` date NOT NULL,
	`productManagerUsername` varchar(255),
	`categoryID` int not null,
	FOREIGN KEY (`productManagerUsername`) REFERENCES `ProductManager`(`username`) ON DELETE RESTRICT,
	FOREIGN KEY (`categoryID`) REFERENCES `Category`(`categoryID`) ON DELETE RESTRICT,
	PRIMARY KEY (`productManagerUsername`,`categoryID`)
);

create table if not exists `Review` ( -- a "customer writes review" / "review rates product" / "prodmanager approves review" table
    `reviewID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `reviewContent` TEXT NOT NULL,
    `reviewStars` INT CHECK (`reviewStars` BETWEEN 1 AND 5), -- Star rating constraint (1 to 5)
    `customerID` INT NOT NULL,
	`productID` INT NOT NULL,
	`productManagerUsername` varchar(255),
	`approvalStatus` BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (`productManagerUsername`) REFERENCES `ProductManager`(`username`),
    FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`), -- chatgpt wanted ON DELETE CASCADE but idk
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`)
);





create table



/* what needs to be done now is reviews, returns and all the related tables to those */

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







create



/* what needs to be done now is reviews, returns and all the related tables to those */

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

