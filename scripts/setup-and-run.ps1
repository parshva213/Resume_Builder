$ErrorActionPreference = 'Stop'
Write-Host "Installing server deps..." -ForegroundColor Cyan
Push-Location server
npm install --no-audit --no-fund
Write-Host "Starting server on port 3001..." -ForegroundColor Cyan
npm start
Pop-Location

