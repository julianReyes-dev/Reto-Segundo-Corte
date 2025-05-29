package uptc.edu.swii.employeeservice.application.usecases;

import java.util.List;

import uptc.edu.swii.employeeservice.application.dto.EmployeeDTO;

public interface GetAllEmployeesUseCase {
    List<EmployeeDTO> getAllEmployees();
}