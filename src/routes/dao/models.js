import pool from '../../db.js';

export async function getAllModels() {
  try {
    const result = await pool.query('SELECT * FROM models');
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function getModelById(id) {
  try {
    const result = await pool.query('SELECT * FROM models WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}