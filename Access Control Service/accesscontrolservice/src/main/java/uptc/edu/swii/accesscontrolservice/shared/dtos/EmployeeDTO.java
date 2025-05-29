package uptc.edu.swii.accesscontrolservice.shared.dtos;

import lombok.Data;

@Data
public class EmployeeDTO {
    private String document;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private boolean status; // true = activo, false = inactivo
}