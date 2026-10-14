-- Seed Materials (Official Categories: Inks, Stationary, Photo Papers, Lamination Films, Hardwares, Delivery Service)
INSERT INTO materials (name, category, price, unit) VALUES
('Eco-Solvent Wide Format Printing Ink CMYK (1 Liter)', 'Inks', 1250.00, 'per 4-pack'),
('Heavy-Duty Rotary Paper Trimmer & Cutter (A3/A4)', 'Stationary', 480.00, 'per unit'),
('Premium High-Gloss RC Photo Paper 260gsm (A4)', 'Photo Papers', 350.00, 'per pack'),
('Thermal Lamination Film Roll Gloss (320mm x 50m)', 'Lamination Films', 450.00, 'per roll'),
('Large Format Digital Clamshell Heat Press Machine', 'Hardwares', 3800.00, 'per unit'),
('Nationwide Express Dispatch & Doorstep Logistics', 'Delivery Service', 150.00, 'per delivery');

-- Seed Cars
INSERT INTO cars (model_name, year, price, status) VALUES
('Toyota Yaris 2018', 2018, 85000.00, 'available'),
('Hyundai Accent 2019', 2019, 92000.00, 'available'),
('Toyota Corolla 2016', 2016, 78000.00, 'sold');
