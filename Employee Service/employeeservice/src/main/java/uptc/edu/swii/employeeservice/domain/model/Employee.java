package uptc.edu.swii.employeeservice.domain.model;

import uptc.edu.swii.employeeservice.domain.model.valueobjects.Email;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.PhoneNumber;

public class Employee {
    private EmployeeId id;
    private String firstName;
    private String lastName;
    private Email email;
    private PhoneNumber phone;
    private boolean active;

    public Employee(EmployeeId id, String firstName, String lastName, 
                    Email email, PhoneNumber phone, boolean active) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.active = active;
    }

    public EmployeeId getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Email getEmail() {
        return email;
    }

    public PhoneNumber getPhone() {
        return phone;
    }

    public boolean isActive() {
        return active;
    }

    public void updateInfo(String firstName, String lastName, 
                            Email email, PhoneNumber phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
    }

    public void disable() {
        this.active = false;
    }

    public void enable() {
        this.active = true;
    }
}
