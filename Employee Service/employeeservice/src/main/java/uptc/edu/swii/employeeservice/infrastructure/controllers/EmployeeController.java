package uptc.edu.swii.employeeservice.infrastructure.controllers;
import uptc.edu.swii.employeeservice.application.dto.EmployeeDTO;
import uptc.edu.swii.employeeservice.application.usecases.CreateEmployeeUseCase;
import uptc.edu.swii.employeeservice.application.usecases.DisableEmployeeUseCase;
import uptc.edu.swii.employeeservice.application.usecases.GetAllEmployeesUseCase;
import uptc.edu.swii.employeeservice.application.usecases.GetEmployeeByIdUseCase;
import uptc.edu.swii.employeeservice.application.usecases.UpdateEmployeeUseCase;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/employee")
@Tag(name = "Employee Management", description = "Employee management APIs")
public class EmployeeController {

    private final CreateEmployeeUseCase createEmployeeUseCase;
    private final UpdateEmployeeUseCase updateEmployeeUseCase;
    private final DisableEmployeeUseCase disableEmployeeUseCase;
    private final GetEmployeeByIdUseCase getEmployeeByIdUseCase;
    private final GetAllEmployeesUseCase getAllEmployeesUseCase;

    public EmployeeController(CreateEmployeeUseCase createEmployeeUseCase,
                            UpdateEmployeeUseCase updateEmployeeUseCase,
                            DisableEmployeeUseCase disableEmployeeUseCase,
                            GetEmployeeByIdUseCase getEmployeeByIdUseCase,
                            GetAllEmployeesUseCase getAllEmployeesUseCase) {
        this.createEmployeeUseCase = createEmployeeUseCase;
        this.updateEmployeeUseCase = updateEmployeeUseCase;
        this.disableEmployeeUseCase = disableEmployeeUseCase;
        this.getEmployeeByIdUseCase = getEmployeeByIdUseCase;
        this.getAllEmployeesUseCase = getAllEmployeesUseCase;
    }

    @PostMapping("/createemployee")
    @Operation(summary = "Create a new employee")
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = createEmployeeUseCase.createEmployee(employeeDTO);
        return ResponseEntity.ok(createdEmployee);
    }

    @PostMapping("/updateemployee")
    @Operation(summary = "Update an existing employee")
    public ResponseEntity<EmployeeDTO> updateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = updateEmployeeUseCase.updateEmployee(employeeDTO);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PostMapping("/disableemployee")
    @Operation(summary = "Disable an employee")
    public ResponseEntity<Void> disableEmployee(@RequestParam String document) {
        disableEmployeeUseCase.disableEmployee(document);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findbyid")
    @Operation(summary = "Get employee by ID")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@RequestParam String document) {
        EmployeeDTO employee = getEmployeeByIdUseCase.getEmployeeById(document);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/findallemployees")
    @Operation(summary = "Get all employees")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = getAllEmployeesUseCase.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
}