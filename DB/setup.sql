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
	`supplierID` int NOT NULL AUTO_INCREMENT unique,
	`name` varchar(64) NOT NULL,
	`phone` BIGINT not null,
	`timeJoined` timestamp not null default CURRENT_TIMESTAMP,
	`addressID` int NOT NULL,
	PRIMARY KEY (`supplierID`),
	FOREIGN KEY (`addressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT
);

create table if not exists `Product` (
	`productID` int not null auto_increment unique,
	`stock` int not null,
	`name` varchar(255) not null,
	`unitPrice` decimal(8,2) not null,
	`overallRating` decimal(2,1) not null default 0,
	`discountPercentage` int(3) not null default 0,
	`description` text,
	`timeListed` timestamp not null default current_timestamp,
	`brand` varchar(64),
	`color` varchar(64),
	`showProduct` boolean default true,
	`supplierID` int not null,
	`material` varchar(64),
	`capacityLitres` decimal(4,1),
	`warrantyMonths` int(3) not null default 0,
	`serialNumber` varchar(64),
	`popularity` int(3) not null default 0,
	primary key (`productID`),
	foreign key (`supplierID`) references `Supplier` (`supplierID`) on delete restrict
);

create table if not exists `Pictures` (
	`productID` int not null,
	`picturePath` varchar(255) not null, 
	primary key (`productID`, `picturePath`),
	foreign key (`productID`) references `Product` (`productID`) on delete cascade
);

create table if not exists `Category` (
	`categoryID` int not null auto_increment unique,
	`name` varchar(64) not null,
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
	`name` varchar(64) NOT NULL,
	`email` varchar(64) NOT NULL, /* enforced format */
	`username` varchar(64) NOT NULL unique, /* there's no covering constraint */
	`password` varchar(64) NOT NULL, /* Encrypt password using SHA256 */
	PRIMARY KEY (`username`),
	CONSTRAINT `chk_valid_email_user` CHECK (`email` LIKE '%_@__%.__%'),
	constraint `chk_encrypted_password` CHECK (LENGTH(`password`) = 64)
);

create table if not exists `ProductManager` (
	`username` varchar(64) NOT NULL unique,
	`supplierID` int NOT NULL,
	PRIMARY KEY (`username`),
	FOREIGN KEY (`username`) REFERENCES User(`username`) on delete cascade,
	FOREIGN KEY (`supplierID`) REFERENCES Supplier(`supplierID`) on delete cascade
);

create table if not exists `SalesManager` (
	`username` varchar(64) NOT NULL unique,
	`supplierID` int NOT NULL,
	PRIMARY KEY (`username`),
	FOREIGN KEY (`username`) REFERENCES User(`username`) on delete cascade,
	FOREIGN KEY (`supplierID`) REFERENCES Supplier(`supplierID`) on delete cascade
);

create table if not exists `Courier` (
	`courierID` int NOT NULL AUTO_INCREMENT unique,
	`name` varchar(64) not null,
	`phone` BIGINT NOT NULL, /* insert with country code, convert + to 00 */
	`email` varchar(64) NOT NULL,
	`timeJoined` timestamp not null default CURRENT_TIMESTAMP,
	`capacity` int default 0,
	`addressID` int NOT NULL,
	PRIMARY KEY (`courierID`),
	FOREIGN KEY (`addressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT,
	CONSTRAINT `chk_valid_email_courier` CHECK (`email` LIKE '%_@__%.__%')
);

create table if not exists `ProdManagerContactsCourier` (
    `deliveryAddressID` int NOT NULL,
    `capacityPoints` int NOT NULL,
    `productManagerUsername` varchar(64) not null,
    `courierID` int NOT NULL,
    primary key (`courierID`, `productManagerUsername`),
    FOREIGN KEY (`deliveryAddressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT,
    foreign key (`courierID`) references `Courier`(`courierID`) on delete restrict,
    foreign key (`productManagerUsername`) references `ProductManager`(`username`) on delete restrict
);

create table if not exists `Customer` (
    `customerID` int not null auto_increment unique,
    `username` varchar(64) not null,
    `addressID` int not null,
    `timeJoined` timestamp not null default current_timestamp,
    `phone` BIGINT,
    `taxID` varchar(20),
    primary key (`customerID`),
    foreign key (`username`) references User(`username`) on delete cascade,
    foreign key (`addressID`) references Address(`addressID`) on delete restrict
);

create table if not exists `Wishlist` (
	`wishlistID` int not null auto_increment unique,
	`customerID` int not null,
	primary key (`wishlistID`, `customerID`),
	foreign key (`customerID`) references Customer(`customerID`) on delete cascade
);

create table if not exists `WishlistItems` (
	`wishlistID` int not null,
	`productID` int not null,
	`addedTime` timestamp not null default current_timestamp,
	primary key (`wishlistID`, `productID`),
	foreign key (`wishlistID`) references Wishlist(`wishlistID`) on delete cascade,
	foreign key (`productID`) references Product(`productID`) on delete cascade
);

create table if not exists `BillingInfo` (
    	`billingID` int not null auto_increment unique,
    	`customerID` int not null,
    	`creditCardNo` varchar(64) not null, /* Encrypt credit card number using SHA256 */
    	`creditCardEXP` varchar(5) not null, /* Enforced format mm/yy */
    	/* no CVV cuz it's prohibited by PCI DSS */
	`addressID` int not null,
    	primary key (`billingID`),
    	foreign key (`customerID`) references Customer(`customerID`) on delete cascade,
	foreign key (`addressID`) references Address(`addressID`) on delete restrict,
    	check (`creditCardEXP` regexp '^(0[1-9]|1[0-2])/([0-9]{2})$'), /* Enforce mm/yy format */
	check (LENGTH(`creditCardNo`) = 64)
);
	
create table if not exists `DeliveryRegion` (
    `regionID` int NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    `population` int,
    `SEIFA` int,
    PRIMARY KEY (`regionID`)
);

create table if not exists `CourierDeliversToDeliveryRegion` (
    `courierID` int NOT NULL,
    `regionID` int NOT NULL,
    `deliveryCost` int NOT NULL,
    PRIMARY KEY (`courierID`, `regionID`),
    FOREIGN KEY (`courierID`) REFERENCES `Courier`(`courierID`) ON DELETE CASCADE,
    FOREIGN KEY (`regionID`) REFERENCES `DeliveryRegion`(`regionID`) ON DELETE CASCADE
);

create table if not exists `Cart` (
	`cartID` int NOT NULL AUTO_INCREMENT unique,
	`totalPrice` decimal(8,2) NOT NULL default 0,
	`numProducts` int NOT NULL default 0,
	`fingerprint` varchar(255),
	`temporary` boolean NOT NULL default true,
	`timeCreated` timestamp not null default CURRENT_TIMESTAMP, /* So that we can tell when to delete it */
	`customerID` int,
	PRIMARY KEY (`cartID`),
	FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE CASCADE
);

create table if not exists `CartContainsProduct` (
	`cartID` int NOT NULL,
	`productID` int not null,
	`quantity` int not null,
	PRIMARY KEY (`cartID`, `productID`),
	FOREIGN KEY (`cartID`) REFERENCES `Cart`(`cartID`) ON DELETE CASCADE,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE CASCADE
);

create table if not exists `Order` (
	`orderID` int NOT NULL AUTO_INCREMENT unique,
	`orderNumber` int NOT NULL,
	`timeOrdered` timestamp not null default CURRENT_TIMESTAMP,
	`totalPrice` decimal (8,2) NOT NULL,
	/* Delivers relationship */
	`deliveryID` int NOT NULL unique,
	`deliveryStatus` varchar(64),
	`deliveryAddressID` int NOT NULL,
	`estimatedArrival` date,
	`courierID` int,
	/* Customer,Cart makesAn Order relationship */
	`cartID` int NOT NULL,
	`customerID` int NOT NULL,
	PRIMARY KEY (`orderID`),
	foreign key (`cartID`) references `Cart`(`cartID`) on delete restrict,
	FOREIGN KEY (`deliveryAddressID`) REFERENCES `Address`(`addressID`) ON DELETE RESTRICT,
	FOREIGN KEY (`courierID`) REFERENCES `Courier`(`courierID`) ON DELETE RESTRICT,
	FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE RESTRICT
);

create table if not exists `OrderOrderItemsProduct` (
	`orderID` int NOT NULL,
	`productID` int NOT NULL,
	`quantity` int NOT NULL,
	`purchasePrice` decimal(8,2) NOT NULL,
	PRIMARY KEY (`orderID`, `productID`),
	FOREIGN KEY (`orderID`) REFERENCES `Order`(`orderID`) ON DELETE CASCADE,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE restrict 
);

create table if not exists `ProdManagerCreatesCategory` (
	`creationDate` timestamp NOT NULL default CURRENT_TIMESTAMP,
	`productManagerUsername` varchar(64) NOT NULL,
	`categoryID` int not null,
	FOREIGN KEY (`productManagerUsername`) REFERENCES `ProductManager`(`username`) ON DELETE cascade,
	FOREIGN KEY (`categoryID`) REFERENCES `Category`(`categoryID`) ON DELETE cascade,
	PRIMARY KEY (`productManagerUsername`,`categoryID`)
);

create table if not exists `ProductManagerRestocksProduct` (
	`productID` INT NOT NULL,
	`productManagerUsername` varchar(64) not null,
	`quantity` int,
	`restockTime` timestamp not null default CURRENT_TIMESTAMP,
	FOREIGN KEY (`productManagerUsername`) REFERENCES `ProductManager`(`username`) on delete restrict,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) on delete cascade,
	primary key (`productID`, `productManagerUsername`, `restockTime`)
);

CREATE TABLE IF NOT EXISTS `SalesManagerManagesPriceProduct` (
	`productID` INT NOT NULL,
	`newPrice` DECIMAL(8, 2),
	`updateTime` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP,
	`discountPercent` INT(3) default 0, 
	`salesManagerUsername` varchar(64) not null,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) ON DELETE cascade, 
	foreign key(`salesManagerUsername`) references `SalesManager`(`username`) on delete restrict,
	primary key (`productID`, `salesManagerUsername`, `updateTime`)
);

create table if not exists `Review` (
	`reviewID` INT NOT NULL AUTO_INCREMENT unique,
	`reviewContent` TEXT,
	`reviewStars` INT,
	/* CustomerWritesReview relationship */
	`customerID` INT NOT NULL,
	/* ReviewRatesProduct relationship */
	`productID` INT NOT NULL,
	/* ProdManagerApprovesReview relationship */
	`productManagerUsername` varchar(64),
	`approvalStatus` BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (`productManagerUsername`) REFERENCES `ProductManager`(`username`) on delete restrict,
	FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) on delete no action,
	FOREIGN KEY (`productID`) REFERENCES `Product`(`productID`) on delete cascade,
	primary key (`reviewID`),
	CHECK (`reviewStars` BETWEEN 1 AND 5)
);

create table if not exists `Returns` (
	`requestID` INT NOT NULL AUTO_INCREMENT unique,
	`returnStatus` VARCHAR(64) NOT NULL,
	`reason` TEXT,
	/* ReturnMustBeOrder relationship */
	`orderID` INT NOT NULL,
	`productID` INT NOT NULL,
	`quantity` INT not null,
	/* CustomerRequestsAReturn relationship */
	`customerID` INT NOT NULL,
	primary key(`requestID`),
	foreign key(`orderID`) references `Order`(`orderID`) on delete restrict,
	foreign key(`customerID`) references `Customer`(`customerID`) on delete no action,
	foreign key(`productID`) references `Product`(`productID`) on delete no action
	/* product cannot refer to OrderOrderItemsProduct since Product isn't a primary key */
	/* There is a trigger to check whether the orderID-productID pair exists */
);

create table if not exists `SalesManagerApprovesRefundReturn` (
	`requestID` int not null,
	`salesManagerUsername` VARCHAR(64),
	`approvalStatus` varchar(64) not null,
	foreign key(`requestID`) references `Returns`(`requestID`) on delete cascade,
	foreign key(`salesManagerUsername`) references `SalesManager`(`username`) on delete restrict,
	primary key(`requestID`)
);

DELIMITER //

/* trigger for updating the product prices automatically */
CREATE TRIGGER update_product_price
AFTER INSERT ON SalesManagerManagesPriceProduct
FOR EACH ROW
BEGIN
    /* Update the price in the Product table when a new price update is logged */
    UPDATE Product
    SET unitPrice = NEW.newPrice,
        discountPercentage = NEW.discountPercent
    WHERE productID = NEW.productID;
END; //

/* trigger for updating the stock of a product when a restock is logged */
create trigger update_stock_product
after insert on ProductManagerRestocksProduct
for each row
begin
	update Product
	set stock = stock + new.quantity
	where productID = new.productID;
end; //

/* trigger to check if return request is valid */
CREATE TRIGGER check_return_request_validity
BEFORE INSERT ON Returns
FOR EACH ROW
begin
	declare pair_exists int;

	select count(*) into pair_exists
	from OrderOrderItemsProduct
	where orderID = new.orderID and productID = new.productID;

	if pair_exists = 0 then
		signal sqlstate '45000'
		set message_text = 'The product to be refunded does not exist in the referenced order';
	end if;
end; //

DELIMITER ;