CREATE TYPE payment_mode_enum AS ENUM ('Cash', 'Card', 'Online', 'Other');
CREATE TYPE payment_type AS ENUM('cash_in', 'cash_out');

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Table to store user information
CREATE TABLE users (
    -- highlight-start
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- highlight-end
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    provider_name VARCHAR(50),
    provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for users table
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

---

-- Table for categories
CREATE TABLE categories (
    -- highlight-start
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID, -- NULL for default categories available to all
    -- highlight-end
    name VARCHAR(100) NOT NULL,
    -- highlight-start
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    -- highlight-end
);

---

-- Table to store the "Expense Books" or "Cashbooks"
CREATE TABLE cashbooks (
    -- highlight-start
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    -- highlight-end
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_favorited BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- highlight-start
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    -- highlight-end
);

-- Trigger for cashbooks table
CREATE TRIGGER set_timestamp_cashbooks
BEFORE UPDATE ON cashbooks
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

---

-- Table to store individual transactions
CREATE TABLE transactions (
    -- highlight-start
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cashbook_id UUID NOT NULL,
    category_id UUID NOT NULL,
    -- highlight-end
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    payment_mode payment_mode_enum NOT NULL DEFAULT 'Cash',
    transaction_type payment_type NOT NULL,
    transaction_datetime TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- highlight-start
    FOREIGN KEY (cashbook_id) REFERENCES cashbooks(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
    -- highlight-end
);

-- Trigger for transactions table
CREATE TRIGGER set_timestamp_transactions
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


--indexces
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_cashbooks_user_id ON cashbooks(user_id);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_transactions_cashbook_id ON transactions(cashbook_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);

