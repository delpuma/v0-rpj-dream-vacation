-- Run: psql $DATABASE_URL -f scripts/setup-deals.sql

CREATE TABLE IF NOT EXISTS dreamvacations.featured_deals (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  deal_type VARCHAR(50) NOT NULL, -- 'cruise', 'resort', 'package', 'river-cruise'
  cruise_line VARCHAR(255),
  destination VARCHAR(255),
  ship_name VARCHAR(255),
  departure_port VARCHAR(255),
  departure_date DATE,
  return_date DATE,
  nights INTEGER,
  price_from DECIMAL(10,2),
  price_original DECIMAL(10,2),
  cabin_type VARCHAR(100),
  inclusions TEXT[] DEFAULT '{}',
  highlights TEXT,
  image_url TEXT,
  booking_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_dv_deals_published ON dreamvacations.featured_deals(is_published);
CREATE INDEX IF NOT EXISTS idx_dv_deals_featured ON dreamvacations.featured_deals(is_featured);
CREATE INDEX IF NOT EXISTS idx_dv_deals_type ON dreamvacations.featured_deals(deal_type);
CREATE INDEX IF NOT EXISTS idx_dv_deals_expires ON dreamvacations.featured_deals(expires_at);

-- Seed with sample deals Richard can update
INSERT INTO dreamvacations.featured_deals (title, slug, deal_type, cruise_line, destination, ship_name, departure_port, departure_date, nights, price_from, price_original, cabin_type, inclusions, highlights, is_featured) VALUES
('7-Night Western Caribbean Cruise', 'royal-caribbean-western-caribbean-7nt', 'cruise', 'Royal Caribbean', 'Caribbean', 'Icon of the Seas', 'Port Canaveral, FL', '2026-06-15', 7, 899, 1299, 'Interior', ARRAY['All meals','Entertainment','Kids club','Pool & waterslides'], 'Sail from Port Canaveral on the world''s largest cruise ship! Perfect for families.', true),
('10-Night Danube River Cruise', 'viking-danube-christmas-markets', 'river-cruise', 'Viking', 'Danube River', 'Viking Longship', 'Budapest', '2026-12-01', 10, 3499, 4299, 'French Balcony', ARRAY['All excursions','Wine with dinner','Free WiFi','Airport transfers'], 'Experience Europe''s magical Christmas markets along the Danube.', true),
('5-Night Sandals Jamaica All-Inclusive', 'sandals-jamaica-5nt-all-inclusive', 'resort', 'Sandals Resorts', 'Jamaica', NULL, NULL, '2026-07-01', 5, 1899, 2499, 'Luxury Room', ARRAY['Unlimited dining','Premium drinks','Water sports','Scuba diving','Airport transfers'], 'Luxury Included® at Sandals Montego Bay — perfect for couples.', true),
('14-Night Mediterranean Cruise', 'celebrity-mediterranean-14nt', 'cruise', 'Celebrity Cruises', 'Mediterranean', 'Celebrity Beyond', 'Barcelona', '2026-09-10', 14, 2199, 3199, 'Balcony', ARRAY['Classic drinks package','WiFi','Gratuities included','Shore excursion credit'], 'Visit Santorini, Mykonos, Rome, Naples & Barcelona on Celebrity''s newest ship.', true),
('7-Night Alaska Inside Passage', 'princess-alaska-inside-passage', 'cruise', 'Princess Cruises', 'Alaska', 'Discovery Princess', 'Seattle', '2026-07-20', 7, 1099, 1599, 'Balcony', ARRAY['Princess Plus package','Drinks','WiFi','Gratuities','Desserts'], 'Glacier viewing, whale watching & Denali rail extension available.', true),
('Seabourn 12-Day Southern Caribbean', 'seabourn-southern-caribbean-12d', 'cruise', 'Seabourn', 'Caribbean', 'Seabourn Ovation', 'Bridgetown, Barbados', '2026-11-15', 12, 5999, 7999, 'Veranda Suite', ARRAY['All-suite ship','Open bar','Fine dining','Spa credits','Shore excursions'], 'Ultra-luxury Caribbean escape with Seabourn''s legendary service.', true);
