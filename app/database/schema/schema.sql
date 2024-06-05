USE lister_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  sub VARCHAR(255) UNIQUE NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  owner_sub VARCHAR(255) REFERENCES users(sub),
  shared_with_sub VARCHAR(255)[] DEFAULT ARRAY[]::VARCHAR(255)[],
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES lists(id),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(255),
  owner_sub VARCHAR(255) REFERENCES users(sub),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
