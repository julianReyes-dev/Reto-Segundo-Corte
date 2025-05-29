package uptc.edu.swii.employeeservice.application.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import uptc.edu.swii.employeeservice.application.dto.EmployeeDTO;
import uptc.edu.swii.employeeservice.application.mapper.EmployeeMapper;
import uptc.edu.swii.employeeservice.application.usecases.CreateEmployeeUseCase;
import uptc.edu.swii.employeeservice.application.usecases.DisableEmployeeUseCase;
import uptc.edu.swii.employeeservice.application.usecases.GetAllEmployeesUseCase;
import uptc.edu.swii.employeeservice.application.usecases.GetEmployeeByIdUseCase;
import uptc.edu.swii.employeeservice.application.usecases.UpdateEmployeeUseCase;
import uptc.edu.swii.employeeservice.domain.exceptions.EmployeeAlreadyExistsException;
import uptc.edu.swii.employeeservice.domain.exceptions.EmployeeNotFoundException;
import uptc.edu.swii.employeeservice.domain.model.Employee;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.Email;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.PhoneNumber;
import uptc.edu.swii.employeeservice.domain.repository.EmployeeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeService implements 
    CreateEmployeeUseCase, 
    UpdateEmployeeUseCase,
    DisableEmployeeUseCase,
    GetEmployeeByIdUseCase,
    GetAllEmployeesUseCase {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository, 
                         EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        EmployeeId employeeId = new EmployeeId(employeeDTO.getDocument());
        
        if (employeeRepository.existsById(employeeId)) {
            throw new EmployeeAlreadyExistsException(
                "Employee with ID " + employeeDTO.getDocument() + " already exists");
        }

        Employee employee = employeeMapper.toDomain(employeeDTO);
        Employee savedEmployee = employeeRepository.save(employee);
        return employeeMapper.toDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO) {
        EmployeeId employeeId = new EmployeeId(employeeDTO.getDocument());
        
        Employee existingEmployee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(
                "Employee with ID " + employeeDTO.getDocument() + " not found"));

        existingEmployee.updateInfo(
            employeeDTO.getFirstName(),
            employeeDTO.getLastName(),
            new Email(employeeDTO.getEmail()),
            new PhoneNumber(employeeDTO.getPhone())
        );

        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return employeeMapper.toDTO(updatedEmployee);
    }

    @Override
    public void disableEmployee(String employeeId) {
        EmployeeId id = new EmployeeId(employeeId);
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException(
                "Employee with ID " + employeeId + " not found"));
        
        employee.disable();
        employeeRepository.save(employee);
    }

    @Override
    public EmployeeDTO getEmployeeById(String employeeId) {
        Employee employee = employeeRepository.findById(new EmployeeId(employeeId))
            .orElseThrow(() -> new EmployeeNotFoundException(
                "Employee with ID " + employeeId + " not found"));
        
        return employeeMapper.toDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
            .map(employeeMapper::toDTO)
            .collect(Collectors.toList());
    }
}