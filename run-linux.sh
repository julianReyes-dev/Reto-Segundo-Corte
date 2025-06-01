#!/bin/bash

echo "Iniciando todos los servicios..."

# Ruta base
BASE_DIR=$(pwd)

# Ejecutar cada jar en segundo plano y guardar logs
java -jar "$BASE_DIR/Auth Service/authservice/target/authservice-0.0.1-SNAPSHOT.jar" > logs/auth.log 2>&1 &
echo "Auth Service iniciado."

java -jar "$BASE_DIR/Access Control Service/accesscontrolservice/target/accesscontrolservice-0.0.1-SNAPSHOT.jar" > logs/access.log 2>&1 &
echo "Access Control Service iniciado."

java -jar "$BASE_DIR/Employee Service/employeeservice/target/employeeservice-0.0.1-SNAPSHOT.jar" > logs/employee.log 2>&1 &
echo "Employee Service iniciado."

java -jar "$BASE_DIR/Reporting Service/reportingservice/target/reportingservice-0.0.1-SNAPSHOT.jar" > logs/reporting.log 2>&1 &
echo "Reporting Service iniciado."

echo "Todos los servicios han sido lanzados. Revisa los archivos .log para monitorear su salida."
