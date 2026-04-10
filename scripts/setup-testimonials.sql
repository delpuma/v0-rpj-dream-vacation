-- Run this in Neon console or via: psql $DATABASE_URL -f scripts/setup-testimonials.sql

CREATE TABLE IF NOT EXISTS dreamvacations.testimonials (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_location VARCHAR(255),
  trip_type VARCHAR(100),
  destination VARCHAR(255),
  cruise_line VARCHAR(255),
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  trip_date VARCHAR(50),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dv_testimonials_published ON dreamvacations.testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_dv_testimonials_destination ON dreamvacations.testimonials(destination);
CREATE INDEX IF NOT EXISTS idx_dv_testimonials_trip_type ON dreamvacations.testimonials(trip_type);

-- Seed with realistic testimonials (these should be replaced with real ones from Richard)
INSERT INTO dreamvacations.testimonials (client_name, client_location, trip_type, destination, cruise_line, rating, quote, trip_date) VALUES
('The Martinez Family', 'Winter Garden, FL', 'Family Vacation', 'Caribbean', 'Royal Caribbean', 5, 'Richard planned our first family cruise and it was absolutely perfect. He found us connecting staterooms, booked the kids club in advance, and even arranged a surprise birthday cake for our daughter. We saved over $800 compared to what we found online, plus got onboard credit. We will never book without him again.', 'March 2026'),
('Jennifer & Mark S.', 'Orlando, FL', 'Honeymoon', 'St. Lucia', 'Sandals Resorts', 5, 'Our Sandals honeymoon in St. Lucia was a dream come true. Richard handled everything — the overwater bungalow, the candlelit dinner on the beach, even our airport transfers. He got us a room upgrade we never would have gotten booking direct. Cannot recommend him enough!', 'January 2026'),
('Robert & Linda K.', 'Windermere, FL', 'River Cruise', 'Danube River', 'Viking', 5, 'We have used Richard for three Viking river cruises now and he consistently delivers. For our Danube Christmas markets cruise, he secured a French balcony upgrade and pre-cruise hotel in Budapest. His attention to detail is remarkable — he even reminded us about visa requirements.', 'December 2025'),
('The Thompson Group', 'Clermont, FL', 'Group Travel', 'Bahamas', 'Royal Caribbean', 5, 'Richard coordinated a 50th birthday celebration cruise for 22 of us. Managing that many cabins, dining preferences, and shore excursions could have been a nightmare, but Richard made it seamless. Everyone had an incredible time and we are already planning the next one.', 'November 2025'),
('Sarah & David P.', 'Ocoee, FL', 'Destination Wedding', 'Jamaica', 'Sandals Resorts', 5, 'Planning a destination wedding from Florida seemed overwhelming until we found Richard. He coordinated travel for 35 guests, handled the room block, arranged the ceremony package, and even helped with welcome bags. Our wedding at Sandals Montego Bay was magical.', 'October 2025'),
('Patricia M.', 'Lake Nona, FL', 'Luxury Travel', 'Mediterranean', 'Seabourn', 5, 'I am a seasoned traveler and very particular about my cruises. Richard recommended Seabourn for my Mediterranean voyage and it exceeded every expectation. He secured a veranda suite upgrade and $500 in shipboard credit. His knowledge of luxury cruise lines is exceptional.', 'September 2025'),
('The Garcia Family', 'Kissimmee, FL', 'Family Vacation', 'Alaska', 'Princess Cruises', 5, 'Our Alaska cruise was the trip of a lifetime. Richard suggested Princess because of their wilderness excursions and he was right — the glacier viewing and whale watching were incredible. He also booked us the Denali rail extension which was the highlight of the whole trip.', 'July 2025'),
('Amanda & Chris W.', 'Winter Park, FL', 'All-Inclusive Resort', 'Cancun', NULL, 5, 'Richard found us an all-inclusive in Cancun that was half the price of what we were seeing online, with a better room category. He knew exactly which resort would match our vibe — adults-only, great food, beautiful beach. We are already planning our next trip with him.', 'August 2025');
