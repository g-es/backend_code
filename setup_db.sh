source .env

# Create tables
PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_HOST -U $DATABASE_USERNAME -d $DATABASE_NAME -p $DATABASE_PORT -a -f ./migrations/001_create_tables.sql

echo "database setup complete!"