package uptc.edu.swii.employeeservice.infrastructure.persistence.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import uptc.edu.swii.employeeservice.infrastructure.persistence.documents.EmployeeDocument;

public interface EmployeeMongoRepository extends MongoRepository<EmployeeDocument, String> {
    // Consultas personalizadas si son necesarias
}