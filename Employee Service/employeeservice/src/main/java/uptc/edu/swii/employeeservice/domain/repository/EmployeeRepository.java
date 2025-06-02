package uptc.edu.swii.employeeservice.domain.repository;

import java.util.List;
import java.util.Optional;

import uptc.edu.swii.employeeservice.domain.model.Employee;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;

public interface EmployeeRepository {
    Employee save(Employee employee);
    Optional<Employee> findById(EmployeeId id);
    List<Employee> findAll();
    void delete(EmployeeId id);
    boolean existsById(EmployeeId id);
}