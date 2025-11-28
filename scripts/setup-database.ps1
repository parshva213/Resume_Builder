Write-Host "Setting up PostgreSQL database for ResumeBuilder..." -ForegroundColor Cyan

# Database connection parameters
$DB_HOST = "localhost"
$DB_PORT = "2103"
$DB_USER = "postgres"
$DB_PASSWORD = "PARSHVAshah"
$DB_NAME = "reactra"

Write-Host "Creating database and tables..." -ForegroundColor Yellow

# Create database and run SQL
$env:PGPASSWORD = $DB_PASSWORD
$env:PGUSER = $DB_USER
$env:PGHOST = $DB_HOST
$env:PGPORT = $DB_PORT

# Create database (ignore error if exists)
psql -c "CREATE DATABASE $DB_NAME;" 2>$null

# Connect to database and run schema
psql -d $DB_NAME -f "server/database.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database setup completed successfully!" -ForegroundColor Green
    Write-Host "Database: $DB_NAME" -ForegroundColor Cyan
    Write-Host "Host: $DB_HOST:$DB_PORT" -ForegroundColor Cyan
} else {
    Write-Host "Database setup failed. Please check your PostgreSQL connection." -ForegroundColor Red
}
