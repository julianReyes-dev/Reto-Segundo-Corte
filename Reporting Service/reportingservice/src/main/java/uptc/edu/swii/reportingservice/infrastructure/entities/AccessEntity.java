package uptc.edu.swii.reportingservice.infrastructure.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "access")
public class AccessEntity {
    @Id
    private String id;
    private String employeeId;
    private String employeeName;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
}