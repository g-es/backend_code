-- TODO this file is not used, just thinking about how to make code more readable. 
-- a. creating this function + call it in insert_data.js
-- b. creating this function + use a pg_ls_dir to read files, then call it
-- c. current insert_data.js logic

CREATE OR REPLACE FUNCTION insert_data_from_json(data jsonb)
RETURNS VOID AS $$
DECLARE
    entry_data jsonb;
    model_id INT;
    sanitized_data jsonb;
BEGIN
    FOR entry_data IN SELECT * FROM jsonb_array_elements(data->'configurations')
LOOP
    SELECT id INTO model_id FROM models WHERE model_name = (SELECT data->>'model');
    IF model_id IS NULL THEN
        INSERT INTO models (model_name)
        VALUES ((SELECT data->>'model'))
        RETURNING id INTO model_id;
    END IF;

    sanitized_data := jsonb_build_object(
        'bleAdvertisingNames', (entry_data->'bleAdvertisingNames'),
        'bluetoothDataChunks', (entry_data->>'bluetoothDataChunks')::BOOLEAN,
        'testing', (jsonb_build_object('whitelist', (entry_data->'testing'->'whitelist')::JSONB)),
        'features', (entry_data->'features')::JSONB,
        'firmware', (entry_data->'firmware')::JSONB,
        'productName', (entry_data->>'productName'),
        'provisioning', (entry_data->'provisioning')::JSONB
    );
    -- sanitized_data := jsonb_object_agg(
    --     key,
    --     CASE
    --         WHEN key = 'brand' OR key = 'bluetoothMTU' THEN NULL
    --         ELSE entry_data->key
    --     END
    -- )
    -- FROM jsonb_each(entry_data);

    -- Insert data into configurations table
    INSERT INTO configurations (model_id, bluetooth_mtu, brand, testing_status, data)
    VALUES (model_id, 
            (entry_data->>'bluetoothMTU')::INT,
            entry_data->>'brand',
            entry_data->'testing'->>'status',
            sanitized_data)
    ON CONFLICT DO NOTHING;
    -- need to handle exception

    END LOOP;
END;
$$ LANGUAGE plpgsql;