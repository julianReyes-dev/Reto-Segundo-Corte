package uptc.edu.swii.accesscontrolservice.shared.exceptions;

public class InvalidEmployeeException extends RuntimeException {
    public InvalidEmployeeException(String message) {
        super(message);
    }
}