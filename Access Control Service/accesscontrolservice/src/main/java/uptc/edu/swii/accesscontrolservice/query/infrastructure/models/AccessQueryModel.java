package uptc.edu.swii.accesscontrolservice.query.infrastructure.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "access_records")
public class AccessQueryModel {

    @Id
    private String id;
    private String employeeId;
    private String eventType; // CHECK_IN or CHECK_OUT
    private LocalDateTime timestamp;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Long durationMinutes;
}