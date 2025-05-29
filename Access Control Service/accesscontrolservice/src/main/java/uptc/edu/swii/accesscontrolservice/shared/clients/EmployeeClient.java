package uptc.edu.swii.accesscontrolservice.shared.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import uptc.edu.swii.accesscontrolservice.shared.dtos.EmployeeDTO;

@FeignClient(name = "employee-service", url = "${employee.service.url}")
public interface EmployeeClient {

    @GetMapping("/employee/findbyid")
    EmployeeDTO getEmployeeById(@RequestParam String document);
}