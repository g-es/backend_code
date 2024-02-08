import pool from '../../db.js';

export async function getAllConfigurations(modelId) {
  try {
    const result = await pool.query('SELECT * FROM configurations WHERE model_id = $1', [modelId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedConfigurations(modelId) {
  try {
    const result = await pool.query('SELECT * FROM configurations WHERE model_id = $1 AND testing_status = $2', [modelId, 'production']);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function getConfigurationById(modelId, configId) {
  try {
    const result = await pool.query('SELECT * FROM configurations WHERE model_id = $1 AND id = $2', [modelId, configId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}