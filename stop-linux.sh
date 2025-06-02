#!/bin/bash

echo "Deteniendo todos los servicios por sus puertos..."

# Lista de puertos y nombres de servicios
declare -A SERVICES=(
  [8085]="API Gateway"
  [8084]="Reporting Service"
  [8083]="Access Control Service"
  [8081]="Employee Service"
  [8080]="Auth Service"
)

for PORT in "${!SERVICES[@]}"; do
  SERVICE_NAME=${SERVICES[$PORT]}
  echo "Buscando proceso para $SERVICE_NAME (puerto $PORT)..."
  
  # Encontrar PID usando lsof
  PID=$(lsof -ti :$PORT)
  
  if [ -z "$PID" ]; then
    echo "$SERVICE_NAME no está en ejecución (nada escuchando en puerto $PORT)"
  else
    echo "Deteniendo $SERVICE_NAME (PID: $PID)..."
    kill -9 $PID
    # Verificar que se detuvo
    if lsof -ti :$PORT > /dev/null; then
      echo "Error: No se pudo detener $SERVICE_NAME"
    else
      echo "$SERVICE_NAME detenido correctamente"
    fi
  fi
done

echo "Proceso de detención completado"
