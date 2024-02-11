CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    model_name VARCHAR(255) UNIQUE NOT NULL
);

-- Should testing_status be enum?
CREATE TABLE IF NOT EXISTS configurations (
    id SERIAL PRIMARY KEY, 
    model_id INT REFERENCES models(id), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    bluetooth_mtu INT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    testing_status VARCHAR(50) NOT NULL,
    -- other data like ble_advertising_names, bluetooth_data_chunks, features, firmware, product_name, provisioning, testing_whitelist
    data JSONB
);

--TODO, initially I thought each JSON file would only have 1 'production', but it seems to be wrong?
-- CREATE UNIQUE INDEX idx_production_model ON configurations (model_id) WHERE testing_status = 'production';


-- Add an index on model_name for better search performance
CREATE INDEX idx_model_name ON models (model_name);

-- Index on model_id for better performance in joins or filtering
CREATE INDEX idx_model_id ON configurations (model_id);

-- If we mainly search for where status = 'production', might be better to do partial indexing?
CREATE INDEX idx_testing_prod_status ON configurations (testing_status) where testing_status = 'production';
-- CREATE INDEX idx_testing_status ON configurations (testing_status);

-- Index on brand column
CREATE INDEX IF NOT EXISTS idx_brand ON configurations (brand);

-- For future use, we can index on a specific key within the data JSONB column
-- CREATE INDEX idx_data_key ON configurations USING GIN ((data->'some_key'));
