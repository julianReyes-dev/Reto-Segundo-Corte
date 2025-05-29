package uptc.edu.swii.employeeservice.infrastructure.persistence.repositories;

import org.springframework.stereotype.Component;

import uptc.edu.swii.employeeservice.domain.model.Employee;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.Email;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.PhoneNumber;
import uptc.edu.swii.employeeservice.infrastructure.persistence.documents.EmployeeDocument;

@Component
public class EmployeeMapperPersistence {
    public EmployeeDocument toDocument(Employee employee) {
        return new EmployeeDocument(
            employee.getId().getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail().getAddress(),
            employee.getPhone().getNumber(),
            employee.isActive()
        );
    }

    public Employee toDomain(EmployeeDocument document) {
        return new Employee(
            new EmployeeId(document.getDocument()),
            document.getFirstName(),
            document.getLastName(),
            new Email(document.getEmail()),
            new PhoneNumber(document.getPhone()),
            document.isStatus()
        );
    }
}