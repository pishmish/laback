/*--Category Table
-- IF WE NEED SHORTER DESCRIPTIONS, WE CAN USE THE FOLLOWING INSTEAD:
-- /*-- Main Categories*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Handbags', 'A range of stylish handbags for various occasions'),
-- ('Backpacks', 'Various types of backpacks for casual, travel, and specific needs'),
-- ('Luggage', 'A selection of luggage options for different travel needs'),
-- ('Travel Bags', 'Versatile travel bags for every journey'),
-- ('Sports Bags', 'Specialized sports bags for fitness, yoga, and other activities');

-- /*-- Sub Categories for Handbags*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Tote Bags', 'Large, open-top bags with parallel handles'),
-- ('Crossbody Bags', 'Bags with a long strap worn across the body'),
-- ('Clutch Bags', 'Compact bags, typically without handles'),
-- ('Satchels', 'Structured bags with a long strap and top handle'),
-- ('Shoulder Bags', 'Bags designed to be worn over the shoulder'),
-- ('Hobo Bags', 'Large, soft bags with a slouchy look');

-- /*-- Sub Categories for Backpacks*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Casual Backpacks', 'Backpacks for everyday use'),
-- ('Laptop Backpacks', 'Backpacks designed to carry laptops'),
-- ('Hiking Backpacks', 'Backpacks with extra support for hiking and outdoor use'),
-- ('Travel Backpacks', 'Backpacks suitable for travel with ample storage'),
-- ('Mini Backpacks', 'Compact backpacks for essentials');

-- /*-- Sub Categories for Luggage*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Carry-On Bags', 'Luggage suitable for carry-on requirements'),
-- ('Checked Luggage', 'Larger luggage for checked baggage needs'),
-- ('Duffel Bags', 'Flexible bags ideal for short trips'),
-- ('Garment Bags', 'Bags designed to keep garments wrinkle-free'),
-- ('Luggage Sets', 'Coordinated sets of luggage for extended travel');

-- /*-- Sub Categories for Travel Bags*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Weekender Bags', 'Compact bags for weekend trips'),
-- ('Rolling Bags', 'Travel bags with wheels for easy movement'),
-- ('Messenger Bags', 'Bags with a long strap, worn across the body'),
-- ('Toiletry Bags', 'Small bags to organize toiletries');

-- /*-- Sub Categories for Sports Bags*/
-- INSERT INTO `Category` (name, description) VALUES
-- ('Gym Bags', 'Bags designed for carrying gym essentials'),
-- ('Sports Duffle Bags', 'Durable duffle bags for sports gear'),
-- ('Cooler Bags', 'Insulated bags to keep food and drinks cool');*/


/* Choose database */

USE `zadados`;
/*-- Main Categories*/
INSERT INTO Category (name, description) VALUES
('Handbags', 'Discover stylish handbags for every occasion, from casual outings to formal events. Designed for elegance and practicality.'),
('Backpacks', 'Find a variety of backpacks tailored for daily use, travel, and outdoor adventures, each with durable designs and ample storage.'),
('Luggage', 'Explore our selection of high-quality luggage options, perfect for seamless travel with durable materials and convenient features.'),
('Travel Bags', 'Versatile travel bags designed to meet the needs of every journey, from short getaways to extended trips.'),
('Sports Bags', 'Specialized bags for sports and fitness enthusiasts, made to store all your essential gear with ease and organization.');

/*-- Subcategories for Handbags*/
INSERT INTO Category (name, description) VALUES
('Tote Bags', 'Spacious, open-top bags perfect for work, shopping, or everyday use, with plenty of room for your essentials and more.'),
('Crossbody Bags', 'Hands-free, stylish bags that combine comfort and security with a long strap, perfect for a day out or travel.'),
('Clutch Bags', 'Elegant, compact bags for evening events and formal occasions, with just enough space for your must-haves.'),
('Satchels', 'Classic structured bags with a top handle and adjustable strap, perfect for both professional and casual settings.'),
('Shoulder Bags', 'Stylish and comfortable bags with single or double shoulder straps, ideal for everyday use.'),
('Hobo Bags', 'Soft, slouchy bags that offer a relaxed look and feel, with ample space for daily essentials.');

/*-- Subcategories for Backpacks*/
INSERT INTO Category (name, description) VALUES
('Casual Backpacks', 'Lightweight backpacks perfect for everyday needs, offering comfort and style for urban living or casual outings.'),
('Laptop Backpacks', 'Backpacks with padded compartments for laptops, designed to keep your devices and essentials safe and organized.'),
('Hiking Backpacks', 'Sturdy backpacks with added support and compartments for outdoor adventures, including water bottle holders and gear loops.'),
('Travel Backpacks', 'Spacious backpacks with multiple compartments, designed for travelers who need organization and comfort on the go.'),
('Mini Backpacks', 'Compact, fashionable backpacks for carrying essentials with style, ideal for casual outings or weekend events.');

/*-- Subcategories for Luggage*/
INSERT INTO Category (name, description) VALUES
('Carry-On Bags', 'Compact bags designed to fit airline carry-on requirements, with organized compartments for easy access to essentials.'),
('Checked Luggage', 'Durable, spacious luggage for checked-in travel, offering ample room for all your needs on longer trips.'),
('Duffel Bags', 'Flexible and lightweight bags, perfect for short trips or as a secondary travel bag for additional storage.'),
('Garment Bags', 'Protective bags designed to keep clothes wrinkle-free, ideal for business trips and special events.'),
('Luggage Sets', 'Matching sets of luggage that offer versatile storage options, perfect for organized travelers needing multiple bags.');

/*-- Subcategories for Travel Bags*/
INSERT INTO Category (name, description) VALUES
('Weekender Bags', 'Stylish, compact bags ideal for weekend trips or overnight stays, with enough space for the essentials.'),
('Rolling Bags', 'Travel bags equipped with wheels for easy movement, making them perfect for longer trips with heavier loads.'),
('Messenger Bags', 'Crossbody bags with an adjustable strap, ideal for daily commuting or as a carry-on for travel.'),
('Toiletry Bags', 'Compact and organized bags to hold toiletries and grooming essentials, perfect for both travel and gym use.');

/*-- Subcategories for Sports Bags*/
INSERT INTO Category (name, description) VALUES
('Gym Bags', 'Spacious and durable bags with compartments for gym clothes, shoes, and essentials, perfect for fitness enthusiasts.'),
('Sports Duffle Bags', 'Durable and roomy duffle bags designed to carry all your sports gear with ease and organization.'),
('Cooler Bags', 'Insulated bags perfect for keeping food and drinks cool, ideal for picnics, gym snacks, or outdoor events.');




/*-- Address Table*/
/*-- Address entries for customers*/
INSERT INTO Address (addressTitle, streetAddress, city, province, zipCode, country, longitude, latitude) VALUES
('Home', 'Büyükdere Caddesi No:245', 'Sarıyer', 'İstanbul', '34398', 'Turkey', 29.0264, 41.1171),      /*-- Customer 1*/
('Office', 'Atatürk Bulvarı No:123', 'Kızılay', 'Ankara', '06640', 'Turkey', NULL, NULL),               /*-- Customer 2 (no longitude/latitude)*/
('Home', 'İzmir Caddesi No:456', 'Bornova', 'İzmir', '35000', 'Turkey', 27.2161, 38.4192);             /*-- Customer 3*/

/*-- Address entries for billing info (linked to customers)*/
INSERT INTO Address (addressTitle, streetAddress, city, province, zipCode, country, longitude, latitude) VALUES
('Customer 1 Billing 1', 'Büyükdere Caddesi No:245', 'Sarıyer', 'İstanbul', '34398', 'Turkey', 29.0264, 41.1171),       /*-- Billing Info 1*/
('Customer 2 Billing 1', 'Atatürk Bulvarı No:123', 'Kızılay', 'Ankara', '06640', 'Turkey', NULL, NULL),          /*-- Billing Info 2*/
('Customer 3 Billing 1', 'İzmir Caddesi No:456', 'Bornova', 'İzmir', '35000', 'Turkey', 27.2161, 38.4192),           /*-- Billing Info 3*/
('Customer 1 Billing 2', 'Cumhuriyet Caddesi No:678', 'Kadıköy', 'İstanbul', '34710', 'Turkey', 29.0394, 40.9871),  /*-- Billing Info 4*/
('Customer 2 Billing 2', 'Gaziosmanpaşa Bulvarı No:102', 'Çankaya', 'Ankara', '06550', 'Turkey', 32.8599, 39.9336); /*-- Billing Info 5*/

/*-- Address entries for couriers*/
INSERT INTO Address (addressTitle, streetAddress, city, province, zipCode, country, longitude, latitude) VALUES
('Courier 1 Depot', 'Halaskargazi Caddesi No:20', 'Şişli', 'İstanbul', '34360', 'Turkey', 28.9894, 41.0595), /*-- Courier 1 (unique address in Istanbul)*/
('Courier 2 Depot', 'Etiler Mahallesi, Nispetiye Caddesi No:85', 'Beşiktaş', 'İstanbul', '34330', 'Turkey', NULL, NULL); /*-- Courier 2 (same city, different area)*/

/*-- Address entry for supplier*/
INSERT INTO Address (addressTitle, streetAddress, city, province, zipCode, country, longitude, latitude) VALUES
('Supplier Warehouse', 'Perpa Ticaret Merkezi No:12', 'Şişli', 'İstanbul', '34384', 'Turkey', 28.9719, 41.0596); /*-- Supplier*/




/*-- Supplier Table*/
INSERT INTO Supplier (name, phone, addressID) 
VALUES ('BagMasters', 905551234567, 11);




/*-- Product Table*/
/*-- HandBags*/
/*-- Products for Tote Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(50, 'Sahar Voyage', 75.99, 4.3, 10, 'A versatile tote for daily adventures.', 'Terre Nomade', 1, 'Canvas', 15.5, 12, 'SN-TB-S01', 85),
(40, 'Zad Pérégrin', 69.99, 4.5, 5, 'Stylish and functional for urban explorers.', 'Étoile du Voyage', 1, 'Leather', 13.0, 12, 'SN-TB-S02', 92),
(30, 'Atlas Errant', 89.99, 4.2, 8, 'A spacious tote inspired by journeys.', 'Évasion', 1, 'Recycled Polyester', 16.2, 12, 'SN-TB-S03', 77);

/*-- Products for Crossbody Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(60, 'Mousafir', 55.50, 4.1, 15, 'Compact and secure for all adventures.', 'Chemin', 1, 'Nylon', 6.0, 6, 'SN-CB-S01', 65),
(45, 'Roam Libre', 49.99, 4.4, 10, 'Lightweight and stylish for freedom of movement.', 'Étoile Nomade', 1, 'Leather', 5.5, 6, 'SN-CB-S02', 83),
(55, 'Boussole', 52.99, 4.3, 12, 'Perfect for hands-free exploration.', 'Urbaine Voyageur', 1, 'Canvas', 6.8, 6, 'SN-CB-S03', 78);

/*-- Products for Clutch Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(25, 'Layla', 65.99, 4.6, 5, 'An elegant clutch for evening occasions.', 'Vagabonde', 1, 'Suede', 2.0, 12, 'SN-CL-S01', 73),
(35, 'Zad Éclat', 59.50, 4.5, 8, 'Elegant design for a touch of adventure.', 'Odyssée', 1, 'Leather', 1.8, 12, 'SN-CL-S02', 88),
(20, 'Sahara Bijou', 72.50, 4.7, 10, 'The ideal clutch for a night out.', 'Rêve Voyageur', 1, 'Velvet', 2.2, 12, 'SN-CL-S03', 69);

/*-- Products for Satchels */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(40, 'Moussafir Classique', 79.99, 4.5, 5, 'A reliable companion for long journeys.', 'Terre Nomade', 1, 'Canvas', 14.0, 18, 'SN-ST-S01', 82),
(30, 'Expédition Héritage', 89.99, 4.6, 7, 'A timeless satchel inspired by travel.', 'Zad Héritage', 1, 'Leather', 13.5, 18, 'SN-ST-S02', 95),
(45, 'Voyageur Errant', 84.99, 4.4, 6, 'A reliable bag for city excursions.', 'Rêve Vagabond', 1, 'Polyester', 12.0, 18, 'SN-ST-S03', 90);

/*-- Products for Shoulder Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(35, 'Aventurier', 74.50, 4.3, 10, 'Comfortable design for all-day use.', 'Nomade', 1, 'Cotton', 10.0, 12, 'SN-SB-S01', 70),
(50, 'Odysée', 68.99, 4.4, 8, 'Perfect for urban explorers.', 'Chemin', 1, 'Leather', 11.0, 12, 'SN-SB-S02', 88),
(30, 'Navigateur', 72.99, 4.5, 12, 'Stylish and practical for urban escapes.', 'Zad Classique', 1, 'Synthetic', 9.5, 12, 'SN-SB-S03', 75);

/*-- Products for Hobo Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(40, 'Rover Hobo', 76.50, 4.2, 10, 'Soft and flexible, perfect for everyday use.', 'Terre Nomade', 1, 'Canvas', 14.0, 12, 'SN-HB-S01', 73),
(25, 'Nomade Bohémienne', 81.00, 4.6, 7, 'Casual bag with a relaxed style.', 'Zad Voyage', 1, 'Leather', 12.5, 12, 'SN-HB-S02', 81),
(35, 'Luxe Vagabond', 78.99, 4.5, 9, 'Comfort and elegance for any occasion.', 'Évasion', 1, 'Suede', 13.0, 12, 'SN-HB-S03', 69);

/*-- Backpacks*/
/*-- Products for Casual Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(60, 'Sahra Casual', 45.99, 4.3, 10, 'Perfect for everyday casual use.', 'Chemin Libre', 1, 'Polyester', 18.0, 6, 'SN-CB-B01', 80),
(70, 'Errant Urbain', 55.50, 4.5, 5, 'A casual backpack for urban travelers.', 'Étoile Nomade', 1, 'Canvas', 20.0, 6, 'SN-CB-B02', 95),
(50, 'Voyage Quotidien', 52.99, 4.4, 8, 'Stylish and spacious for daily adventures.', 'Rêve Nomade', 1, 'Nylon', 22.0, 6, 'SN-CB-B03', 90);

/*-- Products for Laptop Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(45, 'Sahra Tech', 85.99, 4.6, 12, 'Secure laptop backpack for professionals.', 'Terre Moderne', 1, 'Waterproof Nylon', 25.0, 12, 'SN-LB-B01', 88),
(35, 'Odysée Électronique', 99.99, 4.7, 10, 'Protective and stylish for tech enthusiasts.', 'Zad Classique', 1, 'Leather', 27.0, 12, 'SN-LB-B02', 95),
(50, 'Garde Nomade', 89.99, 4.5, 8, 'Convenient design for laptops and essentials.', 'Évasion', 1, 'Polyester', 24.5, 12, 'SN-LB-B03', 82);

/*-- Products for Hiking Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(40, 'Mousafir Trek', 120.00, 4.8, 15, 'Built for tough trails and rugged adventures.', 'Terre Sauvage', 1, 'Ripstop Nylon', 50.0, 18, 'SN-HK-B01', 90),
(30, 'Évasion Montagne', 135.50, 4.9, 12, 'Durable hiking bag for high altitudes.', 'Chemin des Cimes', 1, 'Canvas', 55.0, 18, 'SN-HK-B02', 97),
(25, 'Atlas Randonnée', 129.99, 4.7, 10, 'Spacious and comfortable for long treks.', 'Voyage Aventureux', 1, 'Waterproof Nylon', 48.0, 18, 'SN-HK-B03', 88);

/*-- Products for Travel Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(60, 'Sahar Global', 110.99, 4.5, 10, 'Designed for world travelers and wanderers.', 'Odyssée', 1, 'Polyester', 40.0, 24, 'SN-TB-B01', 85),
(45, 'Nomade Horizon', 119.99, 4.6, 8, 'Perfect for international journeys.', 'Voyage Infini', 1, 'Canvas', 42.0, 24, 'SN-TB-B02', 90),
(35, 'Chemin Liberté', 115.50, 4.4, 12, 'Versatile for adventures near and far.', 'Rêve Nomade', 1, 'Waterproof Nylon', 41.0, 24, 'SN-TB-B03', 78);

/*-- Products for Mini Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(75, 'Zad Petit', 38.99, 4.3, 5, 'Compact and stylish for minimalists.', 'Chemin Urbain', 1, 'Polyester', 8.0, 6, 'SN-MB-B01', 85),
(65, 'Petit Éclat', 42.50, 4.5, 7, 'Small but spacious for daily essentials.', 'Étoile Nomade', 1, 'Leather', 9.0, 6, 'SN-MB-B02', 90),
(80, 'Mousafir Mini', 40.99, 4.2, 6, 'Lightweight backpack for quick outings.', 'Zad Voyage', 1, 'Canvas', 7.5, 6, 'SN-MB-B03', 87);

/*-- Luggage*/
/*-- Products for Carry-On Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(40, 'Bagage Volant', 99.99, 4.6, 10, 'Perfect carry-on for frequent flyers.', 'Voyage Essentiel', 1, 'Polycarbonate', 35.0, 24, 'SN-CO-L01', 92),
(35, 'Évasion Léger', 89.50, 4.4, 12, 'Compact and lightweight for cabin use.', 'Libre Ailes', 1, 'ABS Plastic', 32.0, 24, 'SN-CO-L02', 85),
(30, 'Sahra Horizon', 95.00, 4.5, 8, 'Smooth gliding and easy to carry onboard.', 'Terre Infinie', 1, 'Aluminum', 33.5, 24, 'SN-CO-L03', 88);

/*-- Products for Checked Luggage */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(25, 'Atlas Grand', 150.99, 4.8, 15, 'Spacious and durable for long journeys.', 'Terre Aventure', 1, 'Polycarbonate', 100.0, 36, 'SN-CL-L01', 97),
(20, 'Odysée Voyage', 160.50, 4.7, 10, 'Ideal for extended trips.', 'Zad Classique', 1, 'ABS Plastic', 95.0, 36, 'SN-CL-L02', 92),
(15, 'Chemin Durable', 140.99, 4.6, 12, 'Large capacity with reinforced frame.', 'Étoile Nomade', 1, 'Aluminum', 105.0, 36, 'SN-CL-L03', 89);

/*-- Products for Duffel Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(50, 'Voyageur Classique', 80.99, 4.5, 10, 'Spacious duffel for easy packing.', 'Chemin Aventure', 1, 'Canvas', 55.0, 12, 'SN-DF-L01', 85),
(45, 'Errant Sahara', 75.99, 4.4, 8, 'Perfect for short weekend trips.', 'Libre Horizon', 1, 'Polyester', 50.0, 12, 'SN-DF-L02', 83),
(40, 'Rêve Nomade', 85.50, 4.6, 7, 'Lightweight duffel with sturdy straps.', 'Odyssée Urbaine', 1, 'Nylon', 48.0, 12, 'SN-DF-L03', 88);

/*-- Products for Garment Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(30, 'Valise Élégance', 120.99, 4.7, 15, 'Keeps formal wear wrinkle-free on the go.', 'Élégance Voyage', 1, 'Polyester', 15.0, 24, 'SN-GB-L01', 90),
(25, 'Sahra Chic', 115.50, 4.6, 10, 'Stylish garment bag for business trips.', 'Zad Couture', 1, 'Canvas', 18.0, 24, 'SN-GB-L02', 85),
(20, 'Départ Prestige', 130.00, 4.8, 12, 'Ideal for suits and dresses.', 'Chemin Luxe', 1, 'Leather', 20.0, 24, 'SN-GB-L03', 92);

/*-- Products for Luggage Sets */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(15, 'Voyage Éternel Set', 220.99, 4.9, 20, 'Three-piece luggage set for all travel needs.', 'Voyage Aventureux', 1, 'Polycarbonate', 160.0, 36, 'SN-LS-L01', 98),
(12, 'Étoile Collection', 210.50, 4.8, 18, 'Elegant and matching travel set.', 'Étoile de Voyage', 1, 'ABS Plastic', 150.0, 36, 'SN-LS-L02', 93),
(10, 'Rêve Globetrotter', 230.00, 4.9, 15, 'Stylish set for frequent flyers.', 'Libre Monde', 1, 'Aluminum', 165.0, 36, 'SN-LS-L03', 95);

/* -- P.S. Here I peer pressured chatgpt to give more balanced arabic-french names to the products.*/
/*-- Travel Bags*/
/*-- Products for Weekender Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(45, 'Bagage Rihla', 89.99, 4.6, 10, 'Perfect weekender for short getaways.', 'Voyage Maqsoud', 1, 'Canvas', 50.0, 12, 'SN-WB-T01', 88),
(40, 'Sahra Escape', 95.50, 4.5, 8, 'Durable and compact for weekend trips.', 'Libre Safar', 1, 'Polyester', 45.0, 12, 'SN-WB-T02', 85),
(35, 'Jisr Amani', 105.00, 4.7, 12, 'Spacious yet light for all your travel essentials.', 'Rihla Aventure', 1, 'Nylon', 52.5, 12, 'SN-WB-T03', 90);

/*-- Products for Rolling Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(50, 'Tayyar Matar', 110.00, 4.8, 15, 'Smooth-rolling for ease and convenience.', 'Tariq Nomade', 1, 'Polycarbonate', 75.0, 24, 'SN-RB-T01', 92),
(45, 'Roulé Sahara', 120.99, 4.7, 10, 'Stylish and durable with high mobility.', 'Horizon Aventureux', 1, 'ABS Plastic', 80.0, 24, 'SN-RB-T02', 89),
(40, 'Almas Amani', 125.50, 4.8, 12, 'Ideal for travel with smooth handling and design.', 'Ahlam Voyage', 1, 'Aluminum', 77.5, 24, 'SN-RB-T03', 91);

/*-- Products for Messenger Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(60, 'Maktoub Nomade', 69.99, 4.5, 10, 'Sleek messenger bag for city travels.', 'Ahlam Ville', 1, 'Leather', 15.0, 12, 'SN-MB-T01', 87),
(55, 'Rihla Vif', 75.00, 4.4, 12, 'Perfect for carrying essentials and quick access.', 'Rihla Al-Bilad', 1, 'Canvas', 13.5, 12, 'SN-MB-T02', 85),
(50, 'Hayat Voyageur', 80.99, 4.6, 8, 'Compact yet spacious for daily travel.', 'Liberté Nomade', 1, 'Polyester', 14.0, 12, 'SN-MB-T03', 90);

/*-- Products for Toiletry Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(70, 'Hada Voyage', 39.99, 4.3, 5, 'Compact toiletry bag for essential grooming items.', 'Sahara Voyage', 1, 'Nylon', 5.0, 6, 'SN-TB-T01', 78),
(65, 'Zahra Élégant', 45.50, 4.5, 8, 'Durable and water-resistant for toiletries on the go.', 'Jadid Rihla', 1, 'Canvas', 6.5, 6, 'SN-TB-T02', 80),
(60, 'Masa Khadija', 50.00, 4.7, 10, 'Travel-friendly with multiple compartments.', 'Marhaba Nomade', 1, 'Polyester', 5.5, 6, 'SN-TB-T03', 85);

/*-- Sports Bags*/
/*-- Products for Gym Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(80, 'Rihla Gym', 49.99, 4.6, 10, 'Perfect bag for your gym essentials with a spacious compartment.', 'Sport Étoile', 1, 'Polyester', 30.0, 12, 'SN-GB-F01', 95),
(75, 'Athlète Forme', 55.00, 4.5, 8, 'Durable and lightweight, designed for your workout gear.', 'Vitesse Actif', 1, 'Nylon', 32.0, 12, 'SN-GB-F02', 90),
(70, 'Gym Elité', 59.99, 4.7, 12, 'Perfect gym bag with multiple pockets and strong zippers.', 'Élan Sportif', 1, 'Canvas', 28.0, 12, 'SN-GB-F03', 88);

/*-- Products for Yoga Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(60, 'Yoga Zen', 45.99, 4.8, 10, 'Stylish yoga bag with space for your mat and accessories.', 'Calme Santé', 1, 'Cotton', 15.0, 12, 'SN-YB-F01', 92),
(55, 'Sérénité Yoga', 49.50, 4.6, 12, 'Compact and sleek, ideal for yoga practitioners on the go.', 'Liberté Zen', 1, 'Canvas', 13.0, 12, 'SN-YB-F02', 89),
(50, 'Harmonie Sérénité', 52.00, 4.7, 8, 'Well-structured bag for carrying all your yoga gear.', 'Esprit Yoga', 1, 'Polyester', 14.0, 12, 'SN-YB-F03', 91);

/*-- Products for Sports Duffle Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(90, 'Duffle Champion', 69.99, 4.7, 12, 'Spacious sports duffle bag with reinforced handles and straps.', 'Force Athlétique', 1, 'Leather', 70.0, 12, 'SN-SDB-F01', 93),
(85, 'Athlète Voyageur', 75.00, 4.6, 10, 'Perfect for all your sports equipment, with a durable design.', 'Vitesse Sport', 1, 'Nylon', 68.0, 12, 'SN-SDB-F02', 90),
(80, 'Duffle Pro', 80.00, 4.8, 15, 'Spacious, heavy-duty duffle bag for athletes and adventurers.', 'Élan Athlétique', 1, 'Canvas', 72.0, 12, 'SN-SDB-F03', 92);

/*-- Products for Cooler Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity)
VALUES
(70, 'Sac Rafraîchissant', 45.00, 4.4, 10, 'Insulated cooler bag to keep your food and drinks fresh on the go.', 'Chill Étoile', 1, 'Insulated Fabric', 20.0, 6, 'SN-CB-F01', 85),
(65, 'Sahra Cool', 49.99, 4.5, 8, 'Compact and reliable cooler for weekend trips and outdoor activities.', 'Ahlam Voyage', 1, 'PVC', 18.0, 6, 'SN-CB-T02', 87),
(60, 'Refroidisseur Voyage', 55.00, 4.6, 12, 'Perfect for keeping your beverages and snacks cold during adventures.', 'Chaleur Cool', 1, 'Polyester', 22.0, 6, 'SN-CB-F03', 90);




/*-- Pictures Table*/
/* Inserting three pictures for each productID*/
/*-- HandBags*/
/* Inserting three pictures for each productID from 1 to 18 */
/*INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (1, 'path/to/picture1-1.jpg'), 
    (1, 'path/to/picture1-2.jpg'), 
    (1, 'path/to/picture1-3.jpg'),

    (2, 'path/to/picture2-1.jpg'), 
    (2, 'path/to/picture2-2.jpg'), 
    (2, 'path/to/picture2-3.jpg'),

    (3, 'path/to/picture3-1.jpg'), 
    (3, 'path/to/picture3-2.jpg'), 
    (3, 'path/to/picture3-3.jpg'),

    (4, 'path/to/picture4-1.jpg'), 
    (4, 'path/to/picture4-2.jpg'), 
    (4, 'path/to/picture4-3.jpg'),

    (5, 'path/to/picture5-1.jpg'), 
    (5, 'path/to/picture5-2.jpg'), 
    (5, 'path/to/picture5-3.jpg'),

    (6, 'path/to/picture6-1.jpg'), 
    (6, 'path/to/picture6-2.jpg'), 
    (6, 'path/to/picture6-3.jpg'),

    (7, 'path/to/picture7-1.jpg'), 
    (7, 'path/to/picture7-2.jpg'), 
    (7, 'path/to/picture7-3.jpg'),

    (8, 'path/to/picture8-1.jpg'), 
    (8, 'path/to/picture8-2.jpg'), 
    (8, 'path/to/picture8-3.jpg'),

    (9, 'path/to/picture9-1.jpg'), 
    (9, 'path/to/picture9-2.jpg'), 
    (9, 'path/to/picture9-3.jpg'),

    (10, 'path/to/picture10-1.jpg'), 
    (10, 'path/to/picture10-2.jpg'), 
    (10, 'path/to/picture10-3.jpg'),

    (11, 'path/to/picture11-1.jpg'), 
    (11, 'path/to/picture11-2.jpg'), 
    (11, 'path/to/picture11-3.jpg'),

    (12, 'path/to/picture12-1.jpg'), 
    (12, 'path/to/picture12-2.jpg'), 
    (12, 'path/to/picture12-3.jpg'),

    (13, 'path/to/picture13-1.jpg'), 
    (13, 'path/to/picture13-2.jpg'), 
    (13, 'path/to/picture13-3.jpg'),

    (14, 'path/to/picture14-1.jpg'), 
    (14, 'path/to/picture14-2.jpg'), 
    (14, 'path/to/picture14-3.jpg'),

    (15, 'path/to/picture15-1.jpg'), 
    (15, 'path/to/picture15-2.jpg'), 
    (15, 'path/to/picture15-3.jpg'),

    (16, 'path/to/picture16-1.jpg'), 
    (16, 'path/to/picture16-2.jpg'), 
    (16, 'path/to/picture16-3.jpg'),

    (17, 'path/to/picture17-1.jpg'), 
    (17, 'path/to/picture17-2.jpg'), 
    (17, 'path/to/picture17-3.jpg'),

    (18, 'path/to/picture18-1.jpg'), 
    (18, 'path/to/picture18-2.jpg'), 
    (18, 'path/to/picture18-3.jpg');
*/

/*-- Backpacks*/
/* Inserting three pictures for each productID from 19 to 33 */
/*INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (19, 'path/to/picture19-1.jpg'), 
    (19, 'path/to/picture19-2.jpg'), 
    (19, 'path/to/picture19-3.jpg'),

    (20, 'path/to/picture20-1.jpg'), 
    (20, 'path/to/picture20-2.jpg'), 
    (20, 'path/to/picture20-3.jpg'),

    (21, 'path/to/picture21-1.jpg'), 
    (21, 'path/to/picture21-2.jpg'), 
    (21, 'path/to/picture21-3.jpg'),

    (22, 'path/to/picture22-1.jpg'), 
    (22, 'path/to/picture22-2.jpg'), 
    (22, 'path/to/picture22-3.jpg'),

    (23, 'path/to/picture23-1.jpg'), 
    (23, 'path/to/picture23-2.jpg'), 
    (23, 'path/to/picture23-3.jpg'),

    (24, 'path/to/picture24-1.jpg'), 
    (24, 'path/to/picture24-2.jpg'), 
    (24, 'path/to/picture24-3.jpg'),

    (25, 'path/to/picture25-1.jpg'), 
    (25, 'path/to/picture25-2.jpg'), 
    (25, 'path/to/picture25-3.jpg'),

    (26, 'path/to/picture26-1.jpg'), 
    (26, 'path/to/picture26-2.jpg'), 
    (26, 'path/to/picture26-3.jpg'),

    (27, 'path/to/picture27-1.jpg'), 
    (27, 'path/to/picture27-2.jpg'), 
    (27, 'path/to/picture27-3.jpg'),

    (28, 'path/to/picture28-1.jpg'), 
    (28, 'path/to/picture28-2.jpg'), 
    (28, 'path/to/picture28-3.jpg'),

    (29, 'path/to/picture29-1.jpg'), 
    (29, 'path/to/picture29-2.jpg'), 
    (29, 'path/to/picture29-3.jpg'),

    (30, 'path/to/picture30-1.jpg'), 
    (30, 'path/to/picture30-2.jpg'), 
    (30, 'path/to/picture30-3.jpg'),

    (31, 'path/to/picture31-1.jpg'), 
    (31, 'path/to/picture31-2.jpg'), 
    (31, 'path/to/picture31-3.jpg'),

    (32, 'path/to/picture32-1.jpg'), 
    (32, 'path/to/picture32-2.jpg'), 
    (32, 'path/to/picture32-3.jpg'),

    (33, 'path/to/picture33-1.jpg'), 
    (33, 'path/to/picture33-2.jpg'), 
    (33, 'path/to/picture33-3.jpg');
*/

/*-- Luggage*/
/* Inserting three pictures for each productID from 34 to 48 */
/*INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (34, 'path/to/picture34-1.jpg'), 
    (34, 'path/to/picture34-2.jpg'), 
    (34, 'path/to/picture34-3.jpg'),

    (35, 'path/to/picture35-1.jpg'), 
    (35, 'path/to/picture35-2.jpg'), 
    (35, 'path/to/picture35-3.jpg'),

    (36, 'path/to/picture36-1.jpg'), 
    (36, 'path/to/picture36-2.jpg'), 
    (36, 'path/to/picture36-3.jpg'),

    (37, 'path/to/picture37-1.jpg'), 
    (37, 'path/to/picture37-2.jpg'), 
    (37, 'path/to/picture37-3.jpg'),

    (38, 'path/to/picture38-1.jpg'), 
    (38, 'path/to/picture38-2.jpg'), 
    (38, 'path/to/picture38-3.jpg'),

    (39, 'path/to/picture39-1.jpg'), 
    (39, 'path/to/picture39-2.jpg'), 
    (39, 'path/to/picture39-3.jpg'),

    (40, 'path/to/picture40-1.jpg'), 
    (40, 'path/to/picture40-2.jpg'), 
    (40, 'path/to/picture40-3.jpg'),

    (41, 'path/to/picture41-1.jpg'), 
    (41, 'path/to/picture41-2.jpg'), 
    (41, 'path/to/picture41-3.jpg'),

    (42, 'path/to/picture42-1.jpg'), 
    (42, 'path/to/picture42-2.jpg'), 
    (42, 'path/to/picture42-3.jpg'),

    (43, 'path/to/picture43-1.jpg'), 
    (43, 'path/to/picture43-2.jpg'), 
    (43, 'path/to/picture43-3.jpg'),

    (44, 'path/to/picture44-1.jpg'), 
    (44, 'path/to/picture44-2.jpg'), 
    (44, 'path/to/picture44-3.jpg'),

    (45, 'path/to/picture45-1.jpg'), 
    (45, 'path/to/picture45-2.jpg'), 
    (45, 'path/to/picture45-3.jpg'),

    (46, 'path/to/picture46-1.jpg'), 
    (46, 'path/to/picture46-2.jpg'), 
    (46, 'path/to/picture46-3.jpg'),

    (47, 'path/to/picture47-1.jpg'), 
    (47, 'path/to/picture47-2.jpg'), 
    (47, 'path/to/picture47-3.jpg'),

    (48, 'path/to/picture48-1.jpg'), 
    (48, 'path/to/picture48-2.jpg'), 
    (48, 'path/to/picture48-3.jpg');*/

/*-- Travel Bags*/
/* Inserting three pictures for each productID from 49 to 60 */
/*INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (49, 'path/to/picture49-1.jpg'), 
    (49, 'path/to/picture49-2.jpg'), 
    (49, 'path/to/picture49-3.jpg'),

    (50, 'path/to/picture50-1.jpg'), 
    (50, 'path/to/picture50-2.jpg'), 
    (50, 'path/to/picture50-3.jpg'),

    (51, 'path/to/picture51-1.jpg'), 
    (51, 'path/to/picture51-2.jpg'), 
    (51, 'path/to/picture51-3.jpg'),

    (52, 'path/to/picture52-1.jpg'), 
    (52, 'path/to/picture52-2.jpg'), 
    (52, 'path/to/picture52-3.jpg'),

    (53, 'path/to/picture53-1.jpg'), 
    (53, 'path/to/picture53-2.jpg'), 
    (53, 'path/to/picture53-3.jpg'),

    (54, 'path/to/picture54-1.jpg'), 
    (54, 'path/to/picture54-2.jpg'), 
    (54, 'path/to/picture54-3.jpg'),

    (55, 'path/to/picture55-1.jpg'), 
    (55, 'path/to/picture55-2.jpg'), 
    (55, 'path/to/picture55-3.jpg'),

    (56, 'path/to/picture56-1.jpg'), 
    (56, 'path/to/picture56-2.jpg'), 
    (56, 'path/to/picture56-3.jpg'),

    (57, 'path/to/picture57-1.jpg'), 
    (57, 'path/to/picture57-2.jpg'), 
    (57, 'path/to/picture57-3.jpg'),

    (58, 'path/to/picture58-1.jpg'), 
    (58, 'path/to/picture58-2.jpg'), 
    (58, 'path/to/picture58-3.jpg'),

    (59, 'path/to/picture59-1.jpg'), 
    (59, 'path/to/picture59-2.jpg'), 
    (59, 'path/to/picture59-3.jpg'),

    (60, 'path/to/picture60-1.jpg'), 
    (60, 'path/to/picture60-2.jpg'), 
    (60, 'path/to/picture60-3.jpg');
    */

/*-- Sports Bags*/
/* Inserting three pictures for each productID from 61 to 69 */
/*INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (61, 'path/to/picture61-1.jpg'), 
    (61, 'path/to/picture61-2.jpg'), 
    (61, 'path/to/picture61-3.jpg'),

    (62, 'path/to/picture62-1.jpg'), 
    (62, 'path/to/picture62-2.jpg'), 
    (62, 'path/to/picture62-3.jpg'),

    (63, 'path/to/picture63-1.jpg'), 
    (63, 'path/to/picture63-2.jpg'), 
    (63, 'path/to/picture63-3.jpg'),

    (64, 'path/to/picture64-1.jpg'), 
    (64, 'path/to/picture64-2.jpg'), 
    (64, 'path/to/picture64-3.jpg'),

    (65, 'path/to/picture65-1.jpg'), 
    (65, 'path/to/picture65-2.jpg'), 
    (65, 'path/to/picture65-3.jpg'),

    (66, 'path/to/picture66-1.jpg'), 
    (66, 'path/to/picture66-2.jpg'), 
    (66, 'path/to/picture66-3.jpg'),

    (67, 'path/to/picture67-1.jpg'), 
    (67, 'path/to/picture67-2.jpg'), 
    (67, 'path/to/picture67-3.jpg'),

    (68, 'path/to/picture68-1.jpg'), 
    (68, 'path/to/picture68-2.jpg'), 
    (68, 'path/to/picture68-3.jpg'),

    (69, 'path/to/picture69-1.jpg'), 
    (69, 'path/to/picture69-2.jpg'), 
    (69, 'path/to/picture69-3.jpg');*/




/*-- CategoryCategorizesProduct Table */
/* Inserting the categories for each productID */
/*-- HandBags*/
/* Inserting values into the CategoryCategorizesProduct table for productIDs 1-18 */
INSERT INTO `CategoryCategorizesProduct` (`categoryID`, `productID`) VALUES
    (1, 1), /* ProductID 1 (Main Category) */
    (6, 1), /* ProductID 1 (Subcategory) */
    (1, 2), 
    (6, 2), 
    (1, 3), 
    (6, 3), 
    (1, 4), 
    (7, 4), 
    (1, 5), 
    (7, 5), 
    (1, 6), 
    (7, 6), 
    (1, 7), 
    (8, 7), 
    (1, 8), 
    (8, 8), 
    (1, 9), 
    (8, 9), 
    (1, 10), 
    (9, 10), 
    (1, 11), 
    (9, 11), 
    (1, 12), 
    (9, 12), 
    (1, 13), 
    (10, 13), 
    (1, 14), 
    (10, 14), 
    (1, 15), 
    (10, 15), 
    (1, 16), 
    (11, 16), 
    (1, 17), 
    (11, 17), 
    (1, 18), 
    (11, 18);

/*-- Backpacks*/
/* Inserting values for productID 19-33 with main category 2 and subcategory IDs 12-16 */
insert into `CategoryCategorizesProduct` (`categoryID`, `productID`) values 
(2, 19),
(12, 19),
(2, 20),
(12, 20),
(2, 21),
(12, 21),
(2, 22),
(13, 22),
(2, 23),
(13, 23),
(2, 24),
(13, 24),
(2, 25),
(14, 25),
(2, 26),
(14, 26),
(2, 27),
(14, 27),
(2, 28),
(15, 28),
(2, 29),
(15, 29),
(2, 30),
(15, 30),
(2, 31),
(16, 31),
(2, 32),
(16, 32),
(2, 33),
(16, 33);

/*-- Luggage*/
/* Inserting values for productID 34-48 with main category 3 and subcategory IDs 17-21 */
insert into `CategoryCategorizesProduct` (`categoryID`, `productID`) values 
(3, 34),
(17, 34),
(3, 35),
(17, 35),
(3, 36),
(17, 36),
(3, 37),
(18, 37),
(3, 38),
(18, 38),
(3, 39),
(18, 39),
(3, 40),
(19, 40),
(3, 41),
(19, 41),
(3, 42),
(19, 42),
(3, 43),
(20, 43),
(3, 44),
(20, 44),
(3, 45),
(20, 45),
(3, 46),
(21, 46),
(3, 47),
(21, 47),
(3, 48),
(21, 48);

/*-- Travel Bags*/
/* Inserting values for productID 49-60 with main category 4 and subcategory IDs 22-25 */
insert into `CategoryCategorizesProduct` (`categoryID`, `productID`) values 
(4, 49),
(22, 49),
(4, 50),
(22, 50),
(4, 51),
(22, 51),
(4, 52),
(23, 52),
(4, 53),
(23, 53),
(4, 54),
(23, 54),
(4, 55),
(24, 55),
(4, 56),
(24, 56),
(4, 57),
(24, 57),
(4, 58),
(25, 58),
(4, 59),
(25, 59),
(4, 60),
(25, 60);

/*-- Sports Bags*/
/* Inserting values for productID 61-69 with main category 5 and subcategory IDs 26-28 */
insert into `CategoryCategorizesProduct` (`categoryID`, `productID`) values 
(5, 61),
(26, 61),
(5, 62),
(26, 62),
(5, 63),
(26, 63),
(5, 64),
(27, 64),
(5, 65),
(27, 65),
(5, 66),
(27, 66),
(5, 67),
(28, 67),
(5, 68),
(28, 68),
(5, 69),
(28, 69);




/* -- User Table */
/*-- Inserting 6 users (2 Product Managers, 2 Sales Managers, and 3 Customers)*/
insert into `User` (`name`, `email`, `username`, `password`) values
('Alice Johnson', 'alice.product@company.com', 'alicejohnson', SHA2('AJ123', 256)),
('Bob Smith', 'bob.product@company.com', 'bobsmith', SHA2('BS123', 256)), 

('Charlie Brown', 'charlie.sales@company.com', 'charliebrown', SHA2('CB123', 256)), 
('David Williams', 'david.sales@company.com', 'davidwilliams', SHA2('DW123', 256)),

('Eva Davis', 'eva.davis@gmail.com', 'evadavis', SHA2('ED123', 256)), 
('Frank Miller', 'frank.miller@yahoo.com', 'frankmiller', SHA2('FM123', 256)),
('Eve Green', 'eve.green@gmail.com', 'evegreen', SHA2('EG123', 256));




/*ProductManager Table*/
insert into `ProductManager` (`username`, `supplierID`) values
('alicejohnson', 1), /* Assuming supplierID 1 for Alice Johnson */
('bobsmith', 1); /* Assuming supplierID 2 for Bob Smith */




/*SalesManager Table*/
insert into `SalesManager` (`username`, `supplierID`) values
('charliebrown', 1),
('davidwilliams', 1);




/*Courier Table*/
insert into `Courier` (`name`, `phone`, `email`, `capacity`, `addressID`) values
('Swift Deliveries', 904412345678, 'contact@swiftdeliveries.com', 2500, 9),
('Quick Ship Logistics', 904712398765, 'info@quickshiplogistics.com', 1780, 10);




/* ProductManagerContactsCourier Table */
insert into `ProdManagerContactsCourier` (`deliveryAddressID`, `capacityPoints`, `productManagerUsername`, `courierID`) values
(9, 50, 'alicejohnson', 1),
(9, 60, 'bobsmith', 1),
(10, 75, 'alicejohnson', 2),
(10, 80, 'bobsmith', 2);




/* Customer Table */
insert into `Customer` (`username`, `addressID`, `phone`, `taxID`) values 
('evadavis', 1, 90689837852, NULL),
('frankmiller', 2, 90457822013, NULL),
('evegreen', 3, 90586735267, NULL);




/*Wishlist Table*/
insert into `Wishlist` (`customerID`) values 
(1),
(2),
(3);




/*WishlistItems Table*/
insert into `WishlistItems` (`wishlistID`, `productID`) values 
(1, 5),
(1, 12),
(1, 23),
(2, 34),
(2, 45),
(2, 51),
(3, 7),
(3, 61),
(3, 23),
(3, 18),
(3, 29),
(3, 34),
(3, 45),
(3, 51);




/*BillingInfo Table*/
INSERT INTO `BillingInfo` (`customerID`, `creditCardNo`, `creditCardEXP`, `addressID`) VALUES
(1, SHA2('4111111111111111', 256), '12/25', 4),
(2, SHA2('5500000000000004', 256), '11/25', 5),
(3, SHA2('340000000000009', 256), '10/25', 6),
(1, SHA2('30000000000004', 256), '09/26', 7),
(2, SHA2('6011000000000004', 256), '08/27', 8);




/*DeliveryRegion Table*/
INSERT INTO `DeliveryRegion` (`name`, `population`, `SEIFA`) VALUES
('Beşiktaş', 200000, 110),
('Kadıköy', 450000, 120),
('Şişli', 300000, 130),
('Üsküdar', 350000, 140),
('Fatih', 400000, 150),
('Bakırköy', 250000, 160),
('Beyoğlu', 250000, 170);




/*CourierDeliversToDeliveryRegion Table*/
INSERT INTO `CourierDeliversToDeliveryRegion` (`courierID`, `regionID`, `deliveryCost`) VALUES
(1, 1, 100),
(1, 2, 150),
(1, 3, 200),
(1, 5, 300),
(1, 6, 350),
(2, 1, 120),
(2, 2, 170),
(2, 3, 220),
(2, 4, 270),
(2, 5, 320),
(2, 6, 370),
(2, 7, 420);




/*Cart Table*/
INSERT INTO `Cart` (`totalPrice`, `numProducts`, `fingerprint`, `temporary`, `customerID`) VALUES
(234.97, 3, 'abc123', FALSE, 1),
(450.97, 5, 'def456', FALSE, 2),
(49.99, 1, 'ghi789', TRUE, 3);  /*when user logs in true cart is merged into false*/




/*CartContainsProduct Table*/
INSERT INTO `CartContainsProduct` (`cartID`, `productID`, `quantity`) VALUES
(1, 5, 1),
(1, 12, 1),
(1, 23, 1),     /*when cart is merged or linked to user, these values disappear and transferred to OrderOrderItemsProduct table*/
(2, 34, 1),
(2, 45, 1),
(2, 51, 1),
(2, 7, 1),
(2, 61, 1),
(3, 7, 1);




/*Order Table*/
INSERT INTO `Order` (`orderNumber`, `totalPrice`, `deliveryID`, `deliveryStatus`, `deliveryAddressID`, `estimatedArrival`, `courierID`, `cartID`, `customerID`) VALUES
(1001, 234.97, 123134, 'Processing', 4, '2023-12-10', 1, 1, 1),
(1002, 450.97, 324234, 'Shipped', 5, '2023-12-02', 2, 2, 2);




/*OrderOrderItemsProduct Table*/
INSERT INTO `OrderOrderItemsProduct` (`orderID`, `productID`, `quantity`, `purchasePrice`) VALUES
(1, 5, 1, 49.99),
(1, 12, 1, 84.99),
(1, 23, 1, 99.99),
(2, 34, 1, 99.99),
(2, 45, 1, 130.00),
(2, 51, 1, 105.00),
(2, 7, 1, 65.99),
(2, 61, 1, 49.99);




/*ProdManagerCreatesCategory Table*/
INSERT INTO `ProdManagerCreatesCategory` (`productManagerUsername`, `categoryID`) VALUES
('alicejohnson', 1),    /*Main Categories*/
('alicejohnson', 2),
('alicejohnson', 3),
('alicejohnson', 4),
('alicejohnson', 5),
('bobsmith', 6),        /*Sub Categories*/
('bobsmith', 7),
('bobsmith', 8),
('bobsmith', 9),
('bobsmith', 10),
('bobsmith', 11),
('alicejohnson', 12),
('alicejohnson', 13),
('bobsmith', 14),
('bobsmith', 15),
('alicejohnson', 16),
('bobsmith', 17),
('bobsmith', 18),
('alicejohnson', 19),
('alicejohnson', 20),
('bobsmith', 21),
('bobsmith', 22),
('bobsmith', 23),
('bobsmith', 24),
('bobsmith', 25),
('alicejohnson', 26),
('alicejohnson', 27),
('bobsmith', 28);




/*ProductManagerRestocksProduct Table*/
INSERT INTO `ProductManagerRestocksProduct` (`productID`, `productManagerUsername`, `quantity`) VALUES
(32, 'alicejohnson', 3),
(53, 'alicejohnson', 10),
(4, 'bobsmith', 18),
(12, 'alicejohnson', 24),
(23, 'bobsmith', 25),
(51, 'alicejohnson', 88),
(7, 'bobsmith', 3),
(61, 'bobsmith', 37),
(34, 'alicejohnson', 75);




/*SalesManagerManagesPriceProduct Table*/
INSERT INTO `SalesManagerManagesPriceProduct` (`productID`, `newPrice`, `discountPercent`, `salesManagerUsername`) VALUES
(1, 68.39, 10, 'davidwilliams'),
(12, 80.74, 5, 'davidwilliams'),
(33, 34.85, 15, 'charliebrown'),
(4, 47.18, 15, 'charliebrown'),
(45, 117.00, 10, 'davidwilliams'),
(26, 67.75, 50, 'charliebrown'),
(27, 97.49, 25, 'davidwilliams'),
(18, 15.80, 80, 'charliebrown'),
(9, 18.12, 75, 'charliebrown'),
(10, 27.99, 65, 'charliebrown');




/*Review Table*/
INSERT INTO `Review` (`reviewContent`, `reviewStars`, `customerID`, `productID`, `productManagerUsername`, `approvalStatus`) VALUES
('Great product, highly recommend!', 5, 1, 1, 'alicejohnson', TRUE),
('Good value for the price.', 4, 2, 12, 'alicejohnson', TRUE),
('Average quality, could be better.', 3, 3, 33, 'bobsmith', FALSE),
('Not satisfied with the product.', 2, 3, 4, 'alicejohnson', FALSE),
('Excellent quality and fast shipping.', 5, 2, 45, 'alicejohnson', TRUE),
('Product arrived damaged.', 1, 2, 26, 'alicejohnson', FALSE),
('Very comfortable and stylish.', 4, 1, 27, 'alicejohnson', TRUE),
('Would not buy again.', 2, 3, 18, 'bobsmith', FALSE),
('Exceeded my expectations!', 5, 1, 9, 'bobsmith', TRUE),
('Decent product for the price.', 3, 1, 10, 'bobsmith', TRUE);




/*Returns Table*/
INSERT INTO `Returns` (`returnStatus`, `reason`, `orderID`, `productID`, `quantity`, `customerID`) VALUES
('Pending', 'Product was damaged upon arrival.', 1, 23, 1, 2),
('Approved', 'Size was too big.', 2, 51, 1, 1);




/* SalesManagerApprovesRefundReturn Table */
INSERT INTO `SalesManagerApprovesRefundReturn` (`requestID`, `salesManagerUsername`, `approvalStatus`) VALUES
(1, 'davidwilliams', 'Pending'),
(2, 'charliebrown', 'Pending');

