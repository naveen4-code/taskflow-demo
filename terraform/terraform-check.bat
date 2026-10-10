@echo off
setlocal
cd /d "%~dp0"

echo === Terraform Format Check ===
terraform fmt -check -recursive
if errorlevel 1 exit /b 1

echo === Terraform Initialize ===
terraform init -backend=false -input=false
if errorlevel 1 exit /b 1

echo === Terraform Validate ===
terraform validate
if errorlevel 1 exit /b 1

echo === Terraform validation completed successfully ===
exit /b 0