# Sistema de Control de Acceso Peatonal

Este proyecto implementa un sistema completo para el control de acceso peatonal a instalaciones empresariales, utilizando una arquitectura de microservicios con Spring Boot y un frontend en React.

## Requisitos Previos

- Docker y Docker Compose instalados
- JDK 17+
- Node.js 16+ (para el frontend)
- Maven 3.8+

## Configuración Inicial

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/control-acceso.git
cd control-acceso
```

2. Iniciar los servicios con Docker Compose:
```bash
docker-compose up -d
```

Esto iniciará:
- Servicios backend (Auth, Employee, Access Control, Reporting)
- API Gateway (puerto 8085)
- Bases de datos (MySQL, MongoDB)
- Kafka para eventos
- Prometheus (puerto 9090)
- Grafana (puerto 3005)

## Creación de Usuario Administrador

Para crear un usuario administrador (solo mediante API):

```bash
curl -X POST "http://localhost:8085/api/auth/create" \
-H "Content-Type: application/json" \
-d '{"userId": "1001", "password": "Admin@123"}'
```

Respuesta esperada:
```json
{"message": "User created successfully"}
```

## Autenticación

Para obtener un token JWT:

```bash
curl -X POST "http://localhost:8085/api/auth/login" \
-H "Content-Type: application/json" \
-d '{"userId": "1001", "password": "Admin@123"}'
```

Respuesta esperada:
```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

Guarde este token para autenticar las siguientes solicitudes.
Recuerde hacerlas a http://localhost:8085/

## Endpoints Disponibles

### Servicio de Autenticación (Auth Service)
- `POST /api/auth/login`: Autenticar usuario
- `POST /api/auth/create`: Crear usuario (solo API)
- `POST /api/auth/validate`: Validar token JWT

### Servicio de Empleados (Employee Service)
- `POST /employee/createemployee`: Crear empleado
- `POST /employee/updateemployee`: Actualizar empleado
- `POST /employee/disableemployee`: Desactivar empleado
- `GET /employee/findbyid`: Buscar empleado por documento
- `GET /employee/findallemployees`: Listar todos los empleados

### Servicio de Control de Acceso (Access Control Service)
- `POST /api/access/command/check-in`: Registrar entrada
- `POST /api/access/command/check-out`: Registrar salida
- `GET /api/access/query/employee/{id}`: Obtener accesos por empleado
- `GET /api/access/query/date/{date}`: Obtener accesos por fecha

### Servicio de Reportes (Reporting Service)
- `GET /api/reports/allemployeesbydate`: Reporte diario de accesos
- `GET /api/reports/employeebydates`: Reporte por empleado y rango de fechas

### Herramientas de Monitoreo
- **Prometheus**: `http://localhost:8085/prometheus`
- **Grafana**: `http://localhost:8085/grafana` (usuario: admin, contraseña: admin)
- **Swagger UI**: `http://localhost:8085/swagger-ui.html`

## Ejemplos de Uso

### Con Postman

1. Importar la colección de Postman desde `docs/postman_collection.json`
2. Configurar la variable de entorno `token` con el JWT obtenido
3. Ejecutar los requests de ejemplo

### Con cURL

**Crear empleado:**
```bash
curl -X POST "http://localhost:8085/employee/createemployee" \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "document": "123456789",
  "firstname": "Juan",
  "lastname": "Perez",
  "email": "juan@empresa.com",
  "phone": "3001234567",
  "status": true
}'
```

**Registrar entrada:**
```bash
curl -X POST "http://localhost:8085/api/access/command/check-in" \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{"employeeId": "123456789"}'
```

**Generar reporte diario:**
```bash
curl -X GET "http://localhost:8085/api/reports/allemployeesbydate?date=2023-10-15" \
-H "Authorization: Bearer $TOKEN"
```

## Frontend

Para iniciar el frontend:

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
control-acceso/
├── api-gateway/          # API Gateway (Spring Cloud Gateway)
├── auth-service/         # Servicio de autenticación
├── employee-service/     # Servicio de gestión de empleados
├── access-service/       # Servicio de control de accesos
├── reporting-service/    # Servicio de reportes
├── frontend/             # Aplicación React
├── docker-compose.yml    # Configuración Docker
└── README.md             # Este archivo
```

## Monitoreo

El sistema incluye configuración para monitoreo con:

1. **Prometheus**: Recoge métricas de los microservicios
```bash
http://localhost:9090/targets
```
3. **Grafana**: Dashboards para visualizar las métricas
```bash
http://localhost:3005/login
```
   - Usuario: admin
   - Contraseña: uptc2024
   - Dashboards preconfigurados para:
     - Uso de CPU/Memoria
     - Tasa de requests HTTP
     - Tiempos de respuesta

Data Source: http://prometheus:9090
Dashboard ID: 11378

## Documentación Adicional

La documentación completa de la API está disponible via Swagger UI:
```bash
http://localhost:8080/swagger-ui/index.html
```
```bash
http://localhost:8081/swagger-ui/index.html
```
```bash
http://localhost:8083/swagger-ui/index.html
```
```bash
http://localhost:8084/swagger-ui/index.html
```

