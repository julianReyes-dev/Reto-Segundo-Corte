package uptc.edu.swii.accesscontrolservice.query.application.queries;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class GetAccessByDateQuery {
    private LocalDateTime date;
    private LocalDateTime endDate;
}