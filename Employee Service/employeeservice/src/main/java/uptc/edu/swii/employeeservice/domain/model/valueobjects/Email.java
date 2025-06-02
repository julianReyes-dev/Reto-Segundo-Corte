package uptc.edu.swii.employeeservice.domain.model.valueobjects;

import java.util.regex.Pattern;

public class Email {
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    
    private final String address;

    public Email(String address) {
        if (address == null || !EMAIL_PATTERN.matcher(address).matches()) {
            throw new IllegalArgumentException("Invalid email address");
        }
        this.address = address;
    }

    public String getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return address;
    }
}