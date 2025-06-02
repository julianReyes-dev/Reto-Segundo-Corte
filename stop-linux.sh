#!/bin/bash

echo "Deteniendo todos los servicios..."

# Nombres de los JARs que se usan para identificar los procesos
JARS=(
  "authservice-0.0.1-SNAPSHOT.jar"
  "accesscontrolservice-0.0.1-SNAPSHOT.jar"
  "employeeservice-0.0.1-SNAPSHOT.jar"
  "reportingservice-0.0.1-SNAPSHOT.jar"
  "gateway-0.0.1-SNAPSHOT.jar"
)

for jar in "${JARS[@]}"; do
  PID=$(ps aux | grep "$jar" | grep -v grep | awk '{print $2}')
  if [ -n "$PID" ]; then
    kill "$PID"
    echo "Proceso $jar (PID $PID) detenido."
  else
    echo "No se encontró proceso para $jar."
  fi
done

echo "Todos los servicios han sido detenidos."
