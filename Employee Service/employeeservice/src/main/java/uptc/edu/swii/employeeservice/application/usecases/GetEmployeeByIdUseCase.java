package uptc.edu.swii.employeeservice.application.usecases;

import uptc.edu.swii.employeeservice.application.dto.EmployeeDTO;

public interface GetEmployeeByIdUseCase {
    EmployeeDTO getEmployeeById(String employeeId);
}