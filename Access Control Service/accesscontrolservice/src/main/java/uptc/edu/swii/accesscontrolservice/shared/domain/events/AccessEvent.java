package uptc.edu.swii.accesscontrolservice.shared.domain.events;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AccessEvent {
    private String employeeId;
    private String eventType; // CHECK_IN or CHECK_OUT
    private LocalDateTime timestamp;
}