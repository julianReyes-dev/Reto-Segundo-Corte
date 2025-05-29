package uptc.edu.swii.accesscontrolservice.shared.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AccessReportDTO {
    private String employeeId;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private Long durationMinutes;
}