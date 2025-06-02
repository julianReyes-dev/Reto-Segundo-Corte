package uptc.edu.swii.accesscontrolservice.shared.exceptions;

public class InvalidAccessException extends RuntimeException {
    public InvalidAccessException(String message) {
        super(message);
    }
}