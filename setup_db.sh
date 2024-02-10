# Source environment variables
if [ -f .env ]; then
  source .env
  echo "Environment variables sourced from .env file."
else
  echo ".env file not found. Please create one and populate it with the required variables."
  exit 1
fi

# Create tables
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -p $DATABASE_PORT -a -f ./migrations/001_create_tables.sql

# Check the exit status
if [ $? -eq 0 ]; then
  echo "Database setup complete!"
else
  echo "Error setting up the database. Please check the logs for details."
fi