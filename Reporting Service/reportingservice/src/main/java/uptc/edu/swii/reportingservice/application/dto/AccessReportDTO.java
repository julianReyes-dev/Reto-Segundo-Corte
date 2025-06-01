package uptc.edu.swii.reportingservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessReportDTO {
    private String employeeId;
    private String employeeName;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String duration;
}