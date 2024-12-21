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
INSERT INTO Category (name, description, parentCategoryID, image) VALUES
('Tote Bags', 'Spacious, open-top bags perfect for work, shopping, or everyday use, with plenty of room for your essentials and more.', 1, 'tote-bags.jpg'),
('Crossbody Bags', 'Hands-free, stylish bags that combine comfort and security with a long strap, perfect for a day out or travel.', 1, 'crossbody-bags.jpg'),
('Clutch Bags', 'Elegant, compact bags for evening events and formal occasions, with just enough space for your must-haves.', 1, 'clutch-bags.jpg'),
('Satchels', 'Classic structured bags with a top handle and adjustable strap, perfect for both professional and casual settings.', 1, 'satchel-bags.jpg'),
('Shoulder Bags', 'Stylish and comfortable bags with single or double shoulder straps, ideal for everyday use.', 1, 'shoulder-bags.jpg'),
('Hobo Bags', 'Soft, slouchy bags that offer a relaxed look and feel, with ample space for daily essentials.', 1, 'hobo-bags.jpg');

/*-- Subcategories for Backpacks*/
INSERT INTO Category (name, description, parentCategoryID, image) VALUES
('Casual Backpacks', 'Lightweight backpacks perfect for everyday needs, offering comfort and style for urban living or casual outings.', 2, 'casual-backpacks.jpg'),
('Laptop Backpacks', 'Backpacks with padded compartments for laptops, designed to keep your devices and essentials safe and organized.', 2, 'laptop-backpacks.jpg'),
('Hiking Backpacks', 'Sturdy backpacks with added support and compartments for outdoor adventures, including water bottle holders and gear loops.', 2, 'hiking-backpacks.jpg'),
('Travel Backpacks', 'Spacious backpacks with multiple compartments, designed for travelers who need organization and comfort on the go.', 2, 'travel-backpacks.jpg'),
('Mini Backpacks', 'Compact, fashionable backpacks for carrying essentials with style, ideal for casual outings or weekend events.', 2, 'mini-backpacks.jpg');

/*-- Subcategories for Luggage*/
INSERT INTO Category (name, description, parentCategoryID, image) VALUES
('Carry-On Bags', 'Compact bags designed to fit airline carry-on requirements, with organized compartments for easy access to essentials.', 3, 'carry-on-luggage.jpg'),
('Checked Luggage', 'Durable, spacious luggage for checked-in travel, offering ample room for all your needs on longer trips.', 3, 'checked-luggage.jpg'),
('Duffel Bags', 'Flexible and lightweight bags, perfect for short trips or as a secondary travel bag for additional storage.', 3, 'duffel-bags.jpg'),
('Garment Bags', 'Protective bags designed to keep clothes wrinkle-free, ideal for business trips and special events.', 3, 'garment-bags.jpg'),
('Luggage Sets', 'Matching sets of luggage that offer versatile storage options, perfect for organized travelers needing multiple bags.', 3, 'luggage-sets.jpg');

/*-- Subcategories for Travel Bags*/
INSERT INTO Category (name, description, parentCategoryID, image) VALUES
('Weekender Bags', 'Stylish, compact bags ideal for weekend trips or overnight stays, with enough space for the essentials.', 4, 'weekender-bags.jpg'),
('Rolling Bags', 'Travel bags equipped with wheels for easy movement, making them perfect for longer trips with heavier loads.', 4, 'rolling-bags.jpg'),
('Messenger Bags', 'Crossbody bags with an adjustable strap, ideal for daily commuting or as a carry-on for travel.', 4, 'messenger-bags.jpg'),
('Toiletry Bags', 'Compact and organized bags to hold toiletries and grooming essentials, perfect for both travel and gym use.', 4, 'toiletry-bags.jpg');

/*-- Subcategories for Sports Bags*/
INSERT INTO Category (name, description, parentCategoryID, image) VALUES
('Gym Bags', 'Spacious and durable bags with compartments for gym clothes, shoes, and essentials, perfect for fitness enthusiasts.', 5, 'gym-bags.jpg'),
('Sports Duffle Bags', 'Roomy duffle bags designed to carry sports gear with ease and organization, ideal for athletes and active individuals.', 5, 'duffle-bags.jpg'),
('Cooler Bags', 'Insulated bags perfect for keeping food and drinks cool, ideal for picnics, gym snacks, or outdoor events.', 5, 'cooler-bags.jpg');



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
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(0, 'Sahar Voyage', 75.99, 0, 10, 'A versatile tote for daily adventures.', 'Terre Nomade', 1, 'Canvas', 15.5, 12, 'SN-TB-S01', 85, 'Khaki'),
(40, 'Zad Pérégrin', 69.99, 0, 5, 'Stylish and functional for urban explorers.', 'Étoile du Voyage', 1, 'Leather', 13.0, 12, 'SN-TB-S02', 92, 'Black'),
(30, 'Atlas Errant', 89.99, 0, 8, 'A spacious tote inspired by journeys.', 'Évasion', 1, 'Recycled Polyester', 16.2, 12, 'SN-TB-S03', 77, 'Navy');

/*-- Products for Crossbody Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(60, 'Mousafir', 55.50, 0, 15, 'Compact and secure for all adventures.', 'Chemin', 1, 'Nylon', 6.0, 6, 'SN-CB-S01', 65, 'Grey'),
(45, 'Roam Libre', 49.99, 0, 10, 'Lightweight and stylish for freedom of movement.', 'Étoile Nomade', 1, 'Leather', 5.5, 6, 'SN-CB-S02', 83, 'Brown'),
(55, 'Boussole', 52.99, 0, 12, 'Perfect for hands-free exploration.', 'Urbaine Voyageur', 1, 'Canvas', 6.8, 6, 'SN-CB-S03', 78, 'Beige');

/*-- Products for Clutch Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(25, 'Layla', 65.99, 0, 5, 'An elegant clutch for evening occasions.', 'Vagabonde', 1, 'Suede', 2.0, 12, 'SN-CL-S01', 73, 'Wine Red'),
(35, 'Zad Éclat', 59.50, 0, 8, 'Elegant design for a touch of adventure.', 'Odyssée', 1, 'Leather', 1.8, 12, 'SN-CL-S02', 88, 'Black'),
(20, 'Sahara Bijou', 72.50, 0, 10, 'The ideal clutch for a night out.', 'Rêve Voyageur', 1, 'Velvet', 2.2, 12, 'SN-CL-S03', 69, 'Midnight Blue');

/*-- Products for Satchels */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(40, 'Moussafir Classique', 79.99, 0, 5, 'A reliable companion for long journeys.', 'Terre Nomade', 1, 'Canvas', 14.0, 18, 'SN-ST-S01', 82, 'Olive Green'),
(30, 'Expédition Héritage', 89.99, 0, 7, 'A timeless satchel inspired by travel.', 'Zad Héritage', 1, 'Leather', 13.5, 18, 'SN-ST-S02', 95, 'Tan'),
(45, 'Voyageur Errant', 84.99, 0, 6, 'A reliable bag for city excursions.', 'Rêve Vagabond', 1, 'Polyester', 12.0, 18, 'SN-ST-S03', 90, 'Charcoal');

/*-- Products for Shoulder Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(35, 'Aventurier', 74.50, 0, 10, 'Comfortable design for all-day use.', 'Nomade', 1, 'Cotton', 10.0, 12, 'SN-SB-S01', 70, 'Beige'),
(50, 'Odysée', 68.99, 0, 8, 'Perfect for urban explorers.', 'Chemin', 1, 'Leather', 11.0, 12, 'SN-SB-S02', 88, 'Cognac'),
(30, 'Navigateur', 72.99, 0, 12, 'Stylish and practical for urban escapes.', 'Zad Classique', 1, 'Synthetic', 9.5, 12, 'SN-SB-S03', 75, 'Grey');

/*-- Products for Hobo Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(40, 'Rover Hobo', 76.50, 0, 10, 'Soft and flexible, perfect for everyday use.', 'Terre Nomade', 1, 'Canvas', 14.0, 12, 'SN-HB-S01', 73, 'Mustard'),
(25, 'Nomade Bohémienne', 81.00, 0, 7, 'Casual bag with a relaxed style.', 'Zad Voyage', 1, 'Leather', 12.5, 12, 'SN-HB-S02', 81, 'Chestnut'),
(35, 'Luxe Vagabond', 78.99, 0, 9, 'Comfort and elegance for any occasion.', 'Évasion', 1, 'Suede', 13.0, 12, 'SN-HB-S03', 69, 'Camel');

/*-- Backpacks*/
/*-- Products for Casual Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(1, 'Sahra Casual', 45.99, 0, 10, 'Perfect for everyday casual use.', 'Chemin Libre', 1, 'Polyester', 18.0, 6, 'SN-CB-B01', 80, 'Grey'),
(70, 'Errant Urbain', 55.50, 0, 5, 'A casual backpack for urban travelers.', 'Étoile Nomade', 1, 'Canvas', 20.0, 6, 'SN-CB-B02', 95, 'Khaki'),
(50, 'Voyage Quotidien', 52.99, 0, 8, 'Stylish and spacious for daily adventures.', 'Rêve Nomade', 1, 'Nylon', 22.0, 6, 'SN-CB-B03', 90, 'Navy');

/*-- Products for Laptop Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(45, 'Sahra Tech', 85.99, 0, 12, 'Secure laptop backpack for professionals.', 'Terre Moderne', 1, 'Waterproof Nylon', 25.0, 12, 'SN-LB-B01', 88, 'Black'),
(35, 'Odysée Électronique', 99.99, 0, 10, 'Protective and stylish for tech enthusiasts.', 'Zad Classique', 1, 'Leather', 27.0, 12, 'SN-LB-B02', 95, 'Brown'),
(50, 'Garde Nomade', 89.99, 0, 8, 'Convenient design for laptops and essentials.', 'Évasion', 1, 'Polyester', 24.5, 12, 'SN-LB-B03', 82, 'Charcoal');

/*-- Products for Hiking Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(40, 'Mousafir Trek', 120.00, 0, 15, 'Built for tough trails and rugged adventures.', 'Terre Sauvage', 1, 'Ripstop Nylon', 50.0, 18, 'SN-HK-B01', 90, 'Forest Green'),
(30, 'Jabal Évasion', 135.50, 0, 12, 'Durable hiking bag for high altitudes.', 'Chemin des Cimes', 1, 'Canvas', 55.0, 18, 'SN-HK-B02', 97, 'Olive Green'),
(25, 'Atlas Randonnée', 129.99, 0, 10, 'Spacious and comfortable for long treks.', 'Voyage Aventureux', 1, 'Waterproof Nylon', 48.0, 18, 'SN-HK-B03', 88, 'Cobalt Blue');

/*-- Products for Travel Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(60, 'Sahar Global', 110.99, 0, 10, 'Designed for world travelers and wanderers.', 'Odyssée', 1, 'Polyester', 40.0, 24, 'SN-TB-B01', 85, 'Dark Grey'),
(45, 'Ofok Nomade', 119.99, 0, 8, 'Perfect for international journeys.', 'Voyage Infini', 1, 'Canvas', 42.0, 24, 'SN-TB-B02', 90, 'Sand Beige'),
(35, 'Chemin Liberté', 115.50, 0, 12, 'Versatile for adventures near and far.', 'Rêve Nomade', 1, 'Waterproof Nylon', 41.0, 24, 'SN-TB-B03', 78, 'Steel Blue');

/*-- Products for Mini Backpacks */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(75, 'Zad Petit', 38.99, 0, 5, 'Compact and stylish for minimalists.', 'Chemin Urbain', 1, 'Polyester', 8.0, 6, 'SN-MB-B01', 85, 'Black'),
(65, 'Éclat de Nur', 42.50, 0, 7, 'Small but spacious for daily essentials.', 'Étoile Nomade', 1, 'Leather', 9.0, 6, 'SN-MB-B02', 90, 'Burgundy'),
(80, 'Mousafir Benjamin', 40.99, 0, 6, 'Lightweight backpack for quick outings.', 'Zad Voyage', 1, 'Canvas', 7.5, 6, 'SN-MB-B03', 87, 'Tan');

/*-- Luggage*/
/*-- Products for Carry-On Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(40, 'Zad Volant', 99.99, 0, 10, 'Perfect carry-on for frequent flyers.', 'Voyage Essentiel', 1, 'Polycarbonate', 35.0, 24, 'SN-CO-L01', 92, 'Silver'),
(35, 'Évasion Léger', 89.50, 0, 12, 'Compact and lightweight for cabin use.', 'Libre Ailes', 1, 'ABS Plastic', 32.0, 24, 'SN-CO-L02', 85, 'Black'),
(30, 'Sahra Horizon', 95.00, 0, 8, 'Smooth gliding and easy to carry onboard.', 'Terre Infinie', 1, 'Aluminum', 33.5, 24, 'SN-CO-L03', 88, 'Champagne');

/*-- Products for Checked Luggage */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(25, 'Atlas Marocain', 150.99, 0, 15, 'Spacious and durable for long journeys.', 'Terre Aventure', 1, 'Polycarbonate', 100.0, 36, 'SN-CL-L01', 97, 'Navy'),
(20, 'Odysée Voyage', 160.50, 0, 10, 'Ideal for extended trips.', 'Zad Classique', 1, 'ABS Plastic', 95.0, 36, 'SN-CL-L02', 92, 'Dark Grey'),
(15, 'Sabil Durable', 140.99, 0, 12, 'Large capacity with reinforced frame.', 'Étoile Nomade', 1, 'Aluminum', 105.0, 36, 'SN-CL-L03', 89, 'Graphite');

/*-- Products for Duffel Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(50, 'Voyageur Classique', 80.99, 0, 10, 'Spacious duffel for easy packing.', 'Chemin Aventure', 1, 'Canvas', 55.0, 12, 'SN-DF-L01', 85, 'Beige'),
(45, 'Sahara Wanderer', 75.99, 0, 8, 'Perfect for short weekend trips.', 'Libre Horizon', 1, 'Polyester', 50.0, 12, 'SN-DF-L02', 83, 'Olive Green'),
(40, 'Rêve Nomade', 85.50, 0, 7, 'Lightweight duffel with sturdy straps.', 'Odyssée Urbaine', 1, 'Nylon', 48.0, 12, 'SN-DF-L03', 88, 'Black');

/*-- Products for Garment Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(30, 'Valise Élégance', 120.99, 0, 15, 'Keeps formal wear wrinkle-free on the go.', 'Élégance Voyage', 1, 'Polyester', 15.0, 24, 'SN-GB-L01', 90, 'Navy'),
(25, 'Sahra Chic', 115.50, 0, 10, 'Stylish garment bag for business trips.', 'Zad Couture', 1, 'Canvas', 18.0, 24, 'SN-GB-L02', 85, 'Charcoal'),
(20, 'Départ Prestige', 130.00, 0, 12, 'Ideal for suits and dresses.', 'Chemin Luxe', 1, 'Leather', 20.0, 24, 'SN-GB-L03', 92, 'Dark Brown');

/*-- Products for Luggage Sets */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(15, 'Voyage Éternel Set', 220.99, 0, 20, 'Three-piece luggage set for all travel needs.', 'Voyage Aventureux', 1, 'Polycarbonate', 160.0, 36, 'SN-LS-L01', 98, 'Silver'),
(12, 'Étoile Collection', 210.50, 0, 18, 'Elegant and matching travel set.', 'Étoile de Voyage', 1, 'ABS Plastic', 150.0, 36, 'SN-LS-L02', 93, 'Black'),
(10, 'Astrolab du Voyageur', 230.00, 0, 15, 'Stylish set for frequent flyers.', 'Libre Monde', 1, 'Aluminum', 165.0, 36, 'SN-LS-L03', 95, 'Champagne');

/* -- P.S. Here I peer pressured chatgpt to give more balanced arabic-french names to the products.*/
/*-- Travel Bags*/
/*-- Products for Weekender Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(45, 'Bagage Rihla', 89.99, 0, 10, 'Perfect weekender for short getaways.', 'Voyage Maqsoud', 1, 'Canvas', 50.0, 12, 'SN-WB-T01', 88, 'Beige'),
(40, 'Sahra Escape', 95.50, 0, 8, 'Durable and compact for weekend trips.', 'Libre Safar', 1, 'Polyester', 45.0, 12, 'SN-WB-T02', 85, 'Grey'),
(35, 'Jisr el Amani', 105.00, 0, 12, 'Spacious yet light for all your travel essentials.', 'Rihla Aventure', 1, 'Nylon', 52.5, 12, 'SN-WB-T03', 90, 'Navy');

/*-- Products for Rolling Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(50, 'Zad à Roulettes', 110.00, 0, 15, 'Smooth-rolling for ease and convenience.', 'Tariq Nomade', 1, 'Polycarbonate', 75.0, 24, 'SN-RB-T01', 92, 'Silver'),
(45, 'Roulé Sahara', 120.99, 0, 10, 'Stylish and durable with high mobility.', 'Horizon Aventureux', 1, 'ABS Plastic', 80.0, 24, 'SN-RB-T02', 89, 'Black'),
(40, 'Amani Émeraude', 125.50, 0, 12, 'Ideal for travel with smooth handling and design.', 'Ahlam Voyage', 1, 'Aluminum', 77.5, 24, 'SN-RB-T03', 91, 'Champagne');

/*-- Products for Messenger Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(60, 'Zad Banane', 69.99, 0, 10, 'Sleek messenger bag for city travels.', 'Ahlam Ville', 1, 'Leather', 15.0, 12, 'SN-MB-T01', 87, 'Brown'),
(55, 'Rihla Vive', 75.00, 0, 12, 'Perfect for carrying essentials and quick access.', 'Rihla Al-Bilad', 1, 'Canvas', 13.5, 12, 'SN-MB-T02', 85, 'Khaki'),
(50, 'Hayat Voyageur', 80.99, 0, 8, 'Compact yet spacious for daily travel.', 'Liberté Nomade', 1, 'Polyester', 14.0, 12, 'SN-MB-T03', 90, 'Charcoal');

/*-- Products for Toiletry Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(70, 'Hada Voyage', 39.99, 0, 5, 'Compact toiletry bag for essential grooming items.', 'Sahara Voyage', 1, 'Nylon', 5.0, 6, 'SN-TB-T01', 78, 'Black'),
(65, 'Zahra Élégant', 45.50, 0, 8, 'Durable and water-resistant for toiletries on the go.', 'Jadid Rihla', 1, 'Canvas', 6.5, 6, 'SN-TB-T02', 80, 'Beige'),
(60, 'Zad du Clandestin', 50.00, 0, 10, 'Travel-friendly with multiple compartments.', 'Marhaba Nomade', 1, 'Polyester', 5.5, 6, 'SN-TB-T03', 85, 'Grey');

/*-- Sports Bags*/
/*-- Products for Gym Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(3, 'Rihla Gym', 49.99, 0, 10, 'Perfect bag for your gym essentials with a spacious compartment.', 'Sport Étoile', 1, 'Polyester', 30.0, 12, 'SN-GB-F01', 95, 'Black'),
(75, 'Athlète Forme', 55.00, 0, 8, 'Durable and lightweight, designed for your workout gear.', 'Vitesse Actif', 1, 'Nylon', 32.0, 12, 'SN-GB-F02', 90, 'Grey'),
(70, 'Gym Elité', 59.99, 0, 12, 'Perfect gym bag with multiple pockets and strong zippers.', 'Élan Sportif', 1, 'Canvas', 28.0, 12, 'SN-GB-F03', 88, 'Navy');

/*-- Products for Sports Duffle Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(90, 'Duffle Champion', 69.99, 0, 12, 'Spacious sports duffle bag with reinforced handles and straps.', 'Force Athlétique', 1, 'Leather', 70.0, 12, 'SN-SDB-F01', 93, 'Brown'),
(85, 'Athlète Voyageur', 75.00, 0, 10, 'Perfect for all your sports equipment, with a durable design.', 'Vitesse Sport', 1, 'Nylon', 68.0, 12, 'SN-SDB-F02', 90, 'Dark Grey'),
(80, 'Duffle Pro', 80.00, 0, 15, 'Spacious, heavy-duty duffle bag for athletes and adventurers.', 'Élan Athlétique', 1, 'Canvas', 72.0, 12, 'SN-SDB-F03', 92, 'Olive');

/*-- Products for Cooler Bags */
INSERT INTO Product (stock, name, unitPrice, overallRating, discountPercentage, description, brand, supplierID, material, capacityLitres, warrantyMonths, serialNumber, popularity, color)
VALUES
(70, 'Zad Rafraîchissant', 45.00, 0, 10, 'Insulated cooler bag to keep your food and drinks fresh on the go.', 'Chill Étoile', 1, 'Insulated Fabric', 20.0, 6, 'SN-CB-F01', 85, 'Blue'),
(65, 'Sahra polaire', 49.99, 0, 8, 'Compact and reliable cooler for weekend trips and outdoor activities.', 'Ahlam Voyage', 1, 'PVC', 18.0, 6, 'SN-CB-T02', 87, 'Light Grey'),
(60, 'Isotherme Voyage', 55.00, 0, 12, 'Perfect for keeping your beverages and snacks cold during adventures.', 'Chaleur Cool', 1, 'Polyester', 22.0, 6, 'SN-CB-F03', 90, 'Green');


/*-- Pictures Table*/
/* Inserting three pictures for each productID*/
/*-- HandBags*/
INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (1, 'assets/images/1.png'), 
    (2, 'assets/images/2.png'),
    (3, 'assets/images/3.png'), 
    (4, 'assets/images/4.png'),
    (5, 'assets/images/5.png'), 
    (6, 'assets/images/6.png'),
    (7, 'assets/images/7.png'), 
    (8, 'assets/images/8.png'),
    (9, 'assets/images/9.png'), 
    (10, 'assets/images/10.png'),
    (11, 'assets/images/11.png'), 
    (12, 'assets/images/12.png'),
    (13, 'assets/images/13.png'), 
    (14, 'assets/images/14.png'),
    (15, 'assets/images/15.png'), 
    (16, 'assets/images/16.png'),
    (17, 'assets/images/17.png'), 
    (18, 'assets/images/18.png');

/*-- Backpacks*/
INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (19, 'assets/images/19.png'), 
    (20, 'assets/images/20.png'),
    (21, 'assets/images/21.png'), 
    (22, 'assets/images/22.png'),
    (23, 'assets/images/23.png'), 
    (24, 'assets/images/24.png'),
    (25, 'assets/images/25.png'), 
    (26, 'assets/images/26.png'),
    (27, 'assets/images/27.png'), 
    (28, 'assets/images/28.png'),
    (29, 'assets/images/29.png'), 
    (30, 'assets/images/30.png'), 
    (31, 'assets/images/31.png'),
    (32, 'assets/images/32.png'), 
    (33, 'assets/images/33.png');

/*-- Luggage*/
INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (34, 'assets/images/34.png'), 
    (35, 'assets/images/35.png'), 
    (36, 'assets/images/36.png'),
    (37, 'assets/images/37.png'), 
    (38, 'assets/images/38.png'),
    (39, 'assets/images/39.png'), 
    (40, 'assets/images/40.png'),
    (41, 'assets/images/41.png'), 
    (42, 'assets/images/42.png'),
    (43, 'assets/images/43.png'), 
    (44, 'assets/images/44.png'),
    (45, 'assets/images/45.png'), 
    (46, 'assets/images/46.png'),
    (47, 'assets/images/47.png'), 
    (48, 'assets/images/48.png');

/*-- Travel Bags*/
INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (49, 'assets/images/49.png'), 
    (50, 'assets/images/50.png'),
    (51, 'assets/images/51.png'), 
    (52, 'assets/images/52.png'),
    (53, 'assets/images/53.png'), 
    (54, 'assets/images/54.png'),
    (55, 'assets/images/55.png'), 
    (56, 'assets/images/56.png'),
    (57, 'assets/images/57.png'), 
    (58, 'assets/images/58.png'),
    (59, 'assets/images/59.png'), 
    (60, 'assets/images/60.png');

/*-- Sports Bags*/
INSERT INTO `Pictures` (`productID`, `picturePath`) VALUES 
    (61, 'assets/images/61.png'), 
    (62, 'assets/images/62.png'), 
    (63, 'assets/images/63.png'),
    (64, 'assets/images/64.png'), 
    (65, 'assets/images/65.png'),
    (66, 'assets/images/66.png'), 
    (67, 'assets/images/67.png'),
    (68, 'assets/images/68.png'), 
    (69, 'assets/images/69.png');




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
('Alice Johnson', 'alice.product@company.com', 'alicejohnson', '$2b$12$EGE5qYOuRRHhMujtiaAq/emPDYdnTip.wRFWevb56Yn1fyT.X.eZK'), /*password: AJ123*/
('Bob Smith', 'bob.product@company.com', 'bobsmith', '$2b$12$XazL/WqkSUkcKc9eVNBbqeWEsDmiJjSEUER/ojrgMJPpX8NT.dXCu'), /*password: BS123*/

('Charlie Brown', 'charlie.sales@company.com', 'charliebrown', '$2b$12$B23U7bCQBQgH48XYdMXAw.mbKvbI/xPS2WrDc6fK3V74uxfXdMgWG'), /*password: CB123*/
('David Williams', 'david.sales@company.com', 'davidwilliams', '$2b$12$pTJ2KOQlyXFEJkcV8RnL6OlWVvl.xekWmt1GkZG29QIWJ6ZGvsvmq'), /*password: DW123*/

('Eva Davis', 'eva.davis@gmail.com', 'evadavis', '$2b$12$Am60sgiHr6mu1BPfPpX5n.JqOUKsMGVsgocnXISyWsG/WeERalurW'), /*password: ED123*/
('Frank Miller', 'frank.miller@yahoo.com', 'frankmiller', '$2b$12$4ttyt.gmQi6Ov3sG4TbI2ulaeDfcA7PaudhIcVyNi/oNRQR0zKFky'), /*password: FM123*/
('Eve Green', 'eve.green@gmail.com', 'evegreen', '$2b$12$4Awi28tlIbNQ2nt15DDAZ.WJdxHPGXpaS7X6Z/1Lxm5ojBQxK2LYO'); /*password: EG123*/




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
(49.99, 1, 'ghi789', TRUE, null);  /*when user logs in true cart is merged into false*/




/*CartContainsProduct Table*/
INSERT INTO `CartContainsProduct` (`cartID`, `productID`, `quantity`) VALUES
(3, 7, 1);      /*when user orders, these values disappear and transferred to OrderOrderItemsProduct table*/




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
('Great product, highly recommend!', 5, 1, 1, 'alicejohnson', 1),
('Good value for the price.', 4, 2, 12, 'alicejohnson', 1),
('Average quality, could be better.', 3, 3, 33, 'bobsmith', 2),
('Not satisfied with the product.', 2, 3, 4, 'alicejohnson', 2),
('Excellent quality and fast shipping.', 5, 2, 45, 'alicejohnson', 1),
('Product arrived damaged.', 1, 2, 26, 'alicejohnson', 2),
('Very comfortable and stylish.', 4, 1, 27, 'alicejohnson', 1),
('Would not buy again.', 2, 3, 18, 'bobsmith', 2),
('Exceeded my expectations!', 5, 1, 9, 'bobsmith', 1),
('Decent product for the price.', 3, 1, 10, 'bobsmith', 1);




/*Returns Table*/
INSERT INTO `Returns` (`returnStatus`, `reason`, `orderID`, `productID`, `quantity`, `customerID`) VALUES
('Pending', 'Product was damaged upon arrival.', 1, 23, 1, 2),
('Approved', 'Size was too big.', 2, 51, 1, 1);




/* SalesManagerApprovesRefundReturn Table */
INSERT INTO `SalesManagerApprovesRefundReturn` (`requestID`, `salesManagerUsername`, `approvalStatus`) VALUES
(1, 'davidwilliams', 'Pending'),
(2, 'charliebrown', 'Pending');

