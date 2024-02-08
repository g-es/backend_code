const handlePostgresError = (error, response) => {
  console.error('PostgreSQL Error:', error);

  if (error.code === '42P01') {
    return response.status(404).json({ error: 'Table not found' });
  } else if (error.code === '23505') {
    return response.status(409).json({ error: 'Unique violation' });
  } else if (error.code === '23502') {
    return response.status(400).json({ error: 'Not-null violation' });
  } else if (error.code === '42703') {
    return response.status(400).json({ error: 'Undefined column' });
  } else {
    // Other PostgreSQL errors
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { handlePostgresError };