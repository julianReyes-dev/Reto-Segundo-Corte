#!/bin/bash

echo "Compilando y ejecutando todos los servicios en secuencia..."

# Ruta base
BASE_DIR=$(pwd)

# Crear directorio de logs si no existe
mkdir -p logs

# Función para compilar un servicio
compile_service() {
  local service_dir="$1"
  local service_name="$2"
  
  echo "Compilando $service_name..."
  "$BASE_DIR/$service_dir/mvnw" clean package -DskipTests -f "$BASE_DIR/$service_dir/pom.xml"
  if [ $? -ne 0 ]; then
    echo "Error al compilar $service_name"
    exit 1
  fi
}

# Función para verificar si un servicio está listo
check_service_ready() {
  local port=$1
  local service_name=$2
  local max_attempts=30
  local attempt=0
  
  echo "Verificando disponibilidad de $service_name..."
  
  while [ $attempt -lt $max_attempts ]; do
    nc -z localhost $port 2>/dev/null
    if [ $? -eq 0 ]; then
      echo "$service_name está listo en el puerto $port"
      return 0
    fi
    attempt=$((attempt + 1))
    sleep 5
    echo "Esperando a $service_name... (Intento $attempt/$max_attempts)"
  done
  
  echo "Error: $service_name no se inició correctamente después de $max_attempts intentos"
  return 1
}

# Compilar todos los servicios
compile_service "Auth Service/authservice" "Auth Service"
compile_service "Employee Service/employeeservice" "Employee Service"
compile_service "Access Control Service/accesscontrolservice" "Access Control Service"
compile_service "Reporting Service/reportingservice" "Reporting Service"
compile_service "Api Gateway/gateway" "API Gateway"

# Iniciar Auth Service
echo "Iniciando Auth Service..."
java -jar "$BASE_DIR/Auth Service/authservice/target/authservice-0.0.1-SNAPSHOT.jar" > logs/auth.log 2>&1 &
AUTH_PID=$!
check_service_ready 8080 "Auth Service" || { kill $AUTH_PID; exit 1; }

# Iniciar Employee Service
echo "Iniciando Employee Service..."
java -jar "$BASE_DIR/Employee Service/employeeservice/target/employeeservice-0.0.1-SNAPSHOT.jar" > logs/employee.log 2>&1 &
EMPLOYEE_PID=$!
check_service_ready 8081 "Employee Service" || { kill $AUTH_PID $EMPLOYEE_PID; exit 1; }

# Iniciar Access Control Service
echo "Iniciando Access Control Service..."
java -jar "$BASE_DIR/Access Control Service/accesscontrolservice/target/accesscontrolservice-0.0.1-SNAPSHOT.jar" > logs/access.log 2>&1 &
ACCESS_PID=$!
check_service_ready 8083 "Access Control Service" || { kill $AUTH_PID $EMPLOYEE_PID $ACCESS_PID; exit 1; }

# Iniciar Reporting Service
echo "Iniciando Reporting Service..."
java -jar "$BASE_DIR/Reporting Service/reportingservice/target/reportingservice-0.0.1-SNAPSHOT.jar" > logs/reporting.log 2>&1 &
REPORTING_PID=$!
check_service_ready 8084 "Reporting Service" || { kill $AUTH_PID $EMPLOYEE_PID $ACCESS_PID $REPORTING_PID; exit 1; }

# Iniciar API Gateway
echo "Iniciando API Gateway..."
java -jar "$BASE_DIR/Api Gateway/gateway/target/gateway-0.0.1-SNAPSHOT.jar" > logs/gateway.log 2>&1 &
GATEWAY_PID=$!
check_service_ready 8085 "API Gateway" || { kill $AUTH_PID $EMPLOYEE_PID $ACCESS_PID $REPORTING_PID $GATEWAY_PID; exit 1; }

echo "Todos los servicios han sido compilados e iniciados exitosamente y están listos para recibir peticiones."
echo "PIDs de los procesos:"
echo " - Auth Service: $AUTH_PID"
echo " - Employee Service: $EMPLOYEE_PID"
echo " - Access Control Service: $ACCESS_PID"
echo " - Reporting Service: $REPORTING_PID"
echo " - API Gateway: $GATEWAY_PID"
