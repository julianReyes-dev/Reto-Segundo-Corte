#!/bin/bash

echo "Iniciando todos los servicios en secuencia..."

# Ruta base
BASE_DIR=$(pwd)

# Crear directorio de logs si no existe
mkdir -p logs

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


# Iniciar API Gateway
echo "Iniciando API Gateway..."
java -jar "$BASE_DIR/Api Gateway/gateway/target/gateway-0.0.1-SNAPSHOT.jar" > logs/gateway.log 2>&1 &
GATEWAY_PID=$!
check_service_ready 8085 "API Gateway" || { kill $AUTH_PID $EMPLOYEE_PID $ACCESS_PID $REPORTING_PID $GATEWAY_PID; exit 1; }

echo "Todos los servicios han sido iniciados exitosamente y están listos para recibir peticiones."
echo "PIDs de los procesos:"
echo " - API Gateway: $GATEWAY_PID"
