package uptc.edu.swii.employeeservice.domain.model.valueobjects;

import java.util.regex.Pattern;

public class PhoneNumber {
    private static final Pattern PHONE_PATTERN = 
        Pattern.compile("^[+]?[0-9]{10,15}$");
    
    private final String number;

    public PhoneNumber(String number) {
        if (number == null || !PHONE_PATTERN.matcher(number).matches()) {
            throw new IllegalArgumentException("Invalid phone number");
        }
        this.number = number;
    }

    public String getNumber() {
        return number;
    }

    @Override
    public String toString() {
        return number;
    }
}