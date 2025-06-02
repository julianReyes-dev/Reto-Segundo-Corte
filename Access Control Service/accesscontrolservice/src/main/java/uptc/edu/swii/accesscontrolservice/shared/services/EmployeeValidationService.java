package uptc.edu.swii.accesscontrolservice.shared.services;

import feign.FeignException;
import uptc.edu.swii.accesscontrolservice.shared.clients.EmployeeClient;
import uptc.edu.swii.accesscontrolservice.shared.dtos.EmployeeDTO;
import uptc.edu.swii.accesscontrolservice.shared.exceptions.InvalidEmployeeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeValidationService {

    private final EmployeeClient employeeClient;

    public void validateEmployee(String employeeId) {
        try {
            EmployeeDTO employee = employeeClient.getEmployeeById(employeeId);
            
            if (employee == null) {
                throw new InvalidEmployeeException("Employee with ID " + employeeId + " does not exist");
            }
            
            if (!employee.isStatus()) {
                throw new InvalidEmployeeException("Employee with ID " + employeeId + " is inactive");
            }
        } catch (FeignException.NotFound ex) {
            throw new InvalidEmployeeException("Employee with ID " + employeeId + " does not exist");
        }
    }
}