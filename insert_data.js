import fs from 'fs';
import pool from './src/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function insertModel(model) {
  try {
    const modelResult = await pool.query(
      'INSERT INTO models (model_name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id',
      [model]
    );
    return modelResult.rows[0]?.id;
  } catch (error) {
    console.error('Error inserting model:', error);
    throw error;
  }
}

async function insertConfiguration(modelId, config, filePath) {
  try {
    const sanitizedConfig = {
      ...config,
      model_id: undefined,
      bluetoothMTU: undefined,
      brand: undefined,
    };
    sanitizedConfig.testing = {
      whitelist: config.testing.whitelist,
      status: undefined,
    };
    await pool.query(`
      INSERT INTO configurations (model_id, bluetooth_mtu, brand, testing_status, data)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [modelId, config.bluetoothMTU, config.brand, config.testing.status, sanitizedConfig]
    );
    console.log(`Inserted data from file: ${filePath}`);
  } catch (error) {
    console.error(`Error inserting configuration from file ${filePath}:`, error);
    throw error;
  }
}

async function insertDataFromFile(filePath) {
  try {
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    const { model, configurations } = data;
    // Insert model
    const modelId = await insertModel(model);
    if (!modelId) {
      console.error(`Model already exists for file ${filePath}`);
      return;
    }
    // Insert configurations
    const insertConfigPromises = configurations.map((config) =>
      insertConfiguration(modelId, config, filePath)
    );
    await Promise.all(insertConfigPromises);
  } catch (error) {
    console.error(`Error inserting data ${filePath}:`, error);
    throw error;
  }
}

async function processFiles() {
  const jsonFilesBasePath = path.join(__dirname, '/migration_source_data/models');
  try {
    const files = await fs.promises.readdir(jsonFilesBasePath);

    for (const file of files) {
      const fullJsonFilePath = path.join(jsonFilesBasePath, file);
      try {
        await insertDataFromFile(fullJsonFilePath);
      } catch (error) {
        console.error(`Error processing file ${fullJsonFilePath}:`, error);
      }
    }
    console.log('All files processed. Closing the database connection pool...');
  } catch (error) {
    console.error('Error reading directory:', error);
  } finally {
    pool.end();
  }
}

processFiles();