CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  subtitle VARCHAR(255) DEFAULT '',
  body TEXT,
  image_url VARCHAR(500) DEFAULT '',
  seo_title VARCHAR(180) DEFAULT '',
  seo_description VARCHAR(320) DEFAULT '',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  summary TEXT,
  details TEXT,
  image_url VARCHAR(500) DEFAULT '',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  location VARCHAR(180) DEFAULT '',
  area_sqft VARCHAR(50) DEFAULT '',
  description TEXT,
  image_url VARCHAR(500) DEFAULT '',
  sort_order INT DEFAULT 0,
  is_featured TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO pages (slug,title,subtitle,body,seo_title,seo_description) VALUES
('home','GGA MEP Design Consultants','Thoughtful MEP design for buildings that work better.','GGA Design Consultants provides coordinated mechanical, electrical and plumbing design support for residential, commercial, institutional and other building projects. Our profile describes more than 10 years of experience across India and Gulf MEP projects.','GGA MEP Design Consultants | Plumbing, Electrical & Fire Fighting','MEP design consultants offering plumbing, electrical, firefighting, fire alarm and HVAC design services for building projects.'),
('about-us','About GGA','Practical engineering. Coordinated design.','GGA Design Consultants works with project stakeholders to support detailed MEP design development, coordination and technical documentation. The company profile describes experience in India and Gulf MEP projects.','About GGA MEP Design Consultants','Learn about GGA Design Consultants and its MEP design coordination, technical support and building-services design experience.'),
('services','MEP Design Services','Integrated building-services design support.','Explore our plumbing, electrical, firefighting, fire alarm and HVAC service areas. Scope is confirmed for each project based on requirements and applicable standards.','MEP Design Services | GGA','Explore plumbing, electrical, firefighting, fire alarm and HVAC design services from GGA MEP Design Consultants.'),
('projects','Selected Projects','Building-services design across a range of project types.','The company profile lists residential, commercial, institutional, industrial and public-building projects across multiple locations. The list on this website should be checked and approved by GGA before launch.','GGA MEP Projects and Experience','View selected residential, commercial, institutional and public-building projects listed in the GGA company profile.'),
('contact-us','Contact GGA','Discuss your next MEP design requirement.','Contact GGA MEP Design Consultants to discuss project scope, design coordination, technical support and documentation requirements.','Contact GGA MEP Design Consultants','Contact GGA for plumbing, electrical, firefighting, fire alarm and HVAC design enquiries.');

INSERT IGNORE INTO services (title,slug,summary,details,sort_order) VALUES
('Plumbing Design','plumbing-design','Water supply, drainage and water-management systems for buildings.','Services listed in the company profile include drainage collection and disposal, internal and external plumbing, water supply and distribution, booster systems, storm-water discharge, rainwater harvesting, sewage treatment plants and water treatment plants.',1),
('Electrical Design','electrical-design','Building electrical systems designed around project requirements.','Services listed in the company profile include load calculations, power distribution, earthing, low-voltage building automation and communication/safety/surveillance networks, HT/LT distribution, panels and cabling, lighting design, DC distribution, DG sets, transformers and UPS systems.',2),
('Fire Fighting Design','fire-fighting-design','Fire-protection system design and supporting calculations.','Services listed in the company profile include internal and external hydrants, fire pump rooms, sprinkler systems, hydraulic calculations, fire extinguishers and fire signage.',3),
('Fire Alarm Systems','fire-alarm-systems','Fire-alarm design as part of building safety systems.','The company profile includes fire alarm systems in its listed service areas. Project scope and code requirements should be confirmed during consultation.',4),
('HVAC Design','hvac-design','Heating, ventilation and air-conditioning design coordination.','HVAC is listed on the GGA Design Consultants business card. Confirm project-specific scope directly with GGA.',5);

INSERT IGNORE INTO site_settings (setting_key,setting_value) VALUES
('company_name','GGA Design Consultants'),
('tagline','GET GREAT ADVICE'),
('director_name','M. Arumugam'),
('contact_email','ggamepconsultant@gmail.com'),
('contact_phone','+91 8489274385'),
('whatsapp_number','918489274385'),
('office_address','Flat No B, Vallabari Apartment, Vallal Pari Street, Ram Nagar, Police Check Post, Madipakkam, Chennai, Tamil Nadu 600091');
