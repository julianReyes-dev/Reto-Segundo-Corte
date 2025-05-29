package uptc.edu.swii.employeeservice.application.mapper;

import org.springframework.stereotype.Component;

import uptc.edu.swii.employeeservice.application.dto.EmployeeDTO;
import uptc.edu.swii.employeeservice.domain.model.Employee;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.Email;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.PhoneNumber;

@Component
public class EmployeeMapper {
    public Employee toDomain(EmployeeDTO dto) {
        return new Employee(
            new EmployeeId(dto.getDocument()),
            dto.getFirstName(),
            dto.getLastName(),
            new Email(dto.getEmail()),
            new PhoneNumber(dto.getPhone()),
            dto.isStatus()
        );
    }

    public EmployeeDTO toDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setDocument(employee.getId().getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail().getAddress());
        dto.setPhone(employee.getPhone().getNumber());
        dto.setStatus(employee.isActive());
        return dto;
    }
}
