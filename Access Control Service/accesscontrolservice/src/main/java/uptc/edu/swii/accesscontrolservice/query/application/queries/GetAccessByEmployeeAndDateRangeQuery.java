package uptc.edu.swii.accesscontrolservice.query.application.queries;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class GetAccessByEmployeeAndDateRangeQuery {
    private String employeeId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}