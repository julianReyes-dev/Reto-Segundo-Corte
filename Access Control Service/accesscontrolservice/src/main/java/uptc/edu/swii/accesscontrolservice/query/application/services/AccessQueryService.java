package uptc.edu.swii.accesscontrolservice.query.application.services;

import uptc.edu.swii.accesscontrolservice.query.application.queries.*;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories.AccessQueryRepository;
import uptc.edu.swii.accesscontrolservice.shared.dtos.AccessReportDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccessQueryService {

    private final AccessQueryRepository queryRepository;

    public List<AccessReportDTO> handle(GetAccessByEmployeeIdQuery query) {
        List<AccessQueryModel> records = queryRepository.findByEmployeeId(query.getEmployeeId());
        return processRecords(records);
    }

    public List<AccessReportDTO> handle(GetAccessByDateQuery query) {
        LocalDateTime start = query.getDate().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = query.getDate().withHour(23).withMinute(59).withSecond(59);
        List<AccessQueryModel> records = queryRepository.findByTimestampBetween(start, end);
        return processRecords(records);
    }

    public List<AccessReportDTO> handle(GetAccessByEmployeeAndDateRangeQuery query) {
        List<AccessQueryModel> records = queryRepository.findByEmployeeIdAndTimestampBetween(
            query.getEmployeeId(), query.getStartDate(), query.getEndDate());
        return processRecords(records);
    }

    private List<AccessReportDTO> processRecords(List<AccessQueryModel> records) {
        // Filtrar solo CHECK_INs completos (con CHECK_OUT) y ordenar por fecha
        return records.stream()
            .filter(r -> "CHECK_IN".equals(r.getEventType()))
            .sorted(Comparator.comparing(AccessQueryModel::getTimestamp))
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private AccessReportDTO convertToDTO(AccessQueryModel model) {
        AccessReportDTO dto = new AccessReportDTO();
        dto.setEmployeeId(model.getEmployeeId());
        dto.setCheckInTime(model.getCheckInTime());
        dto.setCheckOutTime(model.getCheckOutTime());
        
        if (model.getCheckOutTime() != null && model.getCheckInTime() != null) {
            dto.setDurationMinutes(Duration.between(model.getCheckInTime(), model.getCheckOutTime()).toMinutes());
        }
        
        return dto;
    }
}