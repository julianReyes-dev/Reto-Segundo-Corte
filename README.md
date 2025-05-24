# Segundo Reto - Sistema de Control de Acceso Peatonal

## AuthService - Microservicio de Autenticación

### 📌 Descripción
Microservicio encargado de la autenticación y gestión de usuarios administradores del sistema, implementado con arquitectura hexagonal y Spring Security con JWT.

### 🏗️ Arquitectura Hexagonal
```
auth-service/
├── domain/            # Núcleo del negocio
│   ├── model/         # Entidades de dominio
│   └── ports/         # Interfaces de entrada/salida
├── application/       # Casos de uso y servicios
└── infrastructure/    # Implementaciones técnicas
    ├── config/        # Configuraciones
    ├── controllers/   # Endpoints REST
    ├── jwt/           # Lógica JWT
    └── repositories/  # Persistencia
```

### 🔧 Prerrequisitos
- Java 17+
- PostgreSQL 13.0+
- Maven 3.8+

### ⚙️ Configuración
1. Crear base de datos:
```sql
CREATE DATABASE LoginDB;
```

2. Configurar `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/LoginDB
spring.datasource.username=root
spring.datasource.password=tu_contraseña

jwt.secret=clave-secreta-256-bits
jwt.expiration=3600000 # 1 hora
```

### 🚀 Endpoints Principales

| Método | Endpoint            | Descripción                     | Body de Ejemplo                  |
|--------|---------------------|---------------------------------|----------------------------------|
| POST   | `/api/auth/create`  | Crear usuario administrador     | `{"userId": 1001, "password": "admin123"}` |
| POST   | `/api/auth/login`   | Iniciar sesión                  | `{"userId": 1001, "password": "admin123"}` |
| POST   | `/api/auth/validate`| Validar token                   | Header: `Authorization: Bearer <token>` |

### 🔍 Probar con cURL

**1. Crear usuario:**
```bash
curl -X POST http://localhost:8080/api/auth/create \
  -H "Content-Type: application/json" \
  -d '{"userId": 1001, "password": "admin123"}'
```
![image](https://github.com/user-attachments/assets/2d5c7cff-7324-4b48-9cbc-b5c00d333756)


**2. Login (obtener token):**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId": 1001, "password": "admin123"}'
```
![image](https://github.com/user-attachments/assets/beaec10b-d0dc-482f-a510-e98e9e558b2a)


**3. Validar token:**
```bash
curl -X POST http://localhost:8080/api/auth/validate \
  -H "Authorization: Bearer TOKEN_GENERADO" \
  -H "Content-Type: application/json"
```
![image](https://github.com/user-attachments/assets/52abbacb-12e1-4f45-a17c-9ad082eb5503)



### 🛡️ Seguridad JWT
- Tokens firmados con algoritmo HS256
- Expiración configurable
- Validación de firma y timestamp


### 📊 Diagrama de Flujo
```mermaid
sequenceDiagram
    Client->>AuthService: POST /login (credenciales)
    AuthService->>DB: Verificar usuario
    DB-->>AuthService: Datos usuario
    AuthService->>Client: JWT Token
    Client->>AuthService: POST /validate (token)
    AuthService-->>Client: true/false
```

### 🚨 Troubleshooting
- **Error 403**: Verificar que el token esté en header `Authorization`
- **Token inválido**: Revisar logs para mensajes de error específicos
- **Conexión DB**: Verificar credenciales en application.properties
