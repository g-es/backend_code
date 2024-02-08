import fs from 'fs';
import pool from './src/db.js';

function insertDataFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, jsonData) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        reject(err);
        return;
      }

      const data = JSON.parse(jsonData);

      // Assuming 'model' and 'configurations' are always present
      const { model, configurations } = data;

      pool.query(
        'INSERT INTO models (model_name) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id',
        [model],
        (modelError, modelResult) => {
          if (modelError) {
            console.error(`Error inserting model from file ${filePath}:`, modelError);
            reject(modelError);
            return;
          }

          const modelId = modelResult.rows[0]?.id;

          if (!modelId) {
            console.error(`Model already exists for file ${filePath}`);
            resolve(); // Model already exists, resolve without inserting configurations
            return;
          }

          // Insert configurations
          const insertConfigurations = configurations.map((config) => {
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

            return new Promise((configResolve, configReject) => {
              pool.query(
                `
                INSERT INTO configurations (
                  model_id, 
                  bluetooth_mtu, 
                  brand, 
                  testing_status, 
                  data
                ) VALUES ($1, $2, $3, $4, $5)
                `,
                [
                  modelId,
                  config.bluetoothMTU,
                  config.brand,
                  config.testing.status,
                  sanitizedConfig,
                ],
                (configError) => {
                  if (configError) {
                    console.error(`Error inserting configuration from file ${filePath}:`, configError);
                    configReject(configError);
                  } else {
                    configResolve();
                  }
                }
              );
            });
          });

          Promise.all(insertConfigurations)
            .then(() => {
              console.log(`Inserted data from file: ${filePath}`);
              resolve();
            })
            .catch((configErrors) => {
              console.error(`Error inserting configurations from file ${filePath}:`, configErrors);
              reject(configErrors);
            });
        }
      );
    });
  });
}

const jsonFilesBasePath = 'migration_source_data/models';
const filePromises = [];

// Loop through each JSON file and create an array of promises
fs.readdirSync(jsonFilesBasePath).forEach((jsonFile) => {
  const fullJsonFilePath = `${jsonFilesBasePath}/${jsonFile}`;
  filePromises.push(insertDataFromFile(fullJsonFilePath));
});

// Wait for all promises to resolve before closing the pool
Promise.all(filePromises)
  .then(() => {
    console.log('All files processed. Closing the database connection pool...');
    pool.end();
  })
  .catch((error) => {
    console.error('Error processing files:', error);
    pool.end();
  });