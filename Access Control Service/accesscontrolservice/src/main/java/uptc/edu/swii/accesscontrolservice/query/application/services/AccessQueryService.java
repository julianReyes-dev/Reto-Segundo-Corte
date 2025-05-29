package uptc.edu.swii.accesscontrolservice.query.application.services;

import lombok.RequiredArgsConstructor;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByDateQuery;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByEmployeeAndDateRangeQuery;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByEmployeeIdQuery;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories.AccessQueryRepository;
import uptc.edu.swii.accesscontrolservice.shared.dtos.AccessReportDTO;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccessQueryService {

    private final AccessQueryRepository queryRepository;

    public List<AccessReportDTO> handle(GetAccessByEmployeeIdQuery query) {
        List<AccessQueryModel> accessRecords = queryRepository.findByEmployeeId(query.getEmployeeId());
        return processAccessRecords(accessRecords);
    }

    public List<AccessReportDTO> handle(GetAccessByDateQuery query) {
        LocalDateTime start = query.getDate().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = query.getDate().withHour(23).withMinute(59).withSecond(59);
        List<AccessQueryModel> accessRecords = queryRepository.findByTimestampBetween(start, end);
        return processAccessRecords(accessRecords);
    }

    public List<AccessReportDTO> handle(GetAccessByEmployeeAndDateRangeQuery query) {
        List<AccessQueryModel> accessRecords = queryRepository.findByEmployeeIdAndTimestampBetween(
                query.getEmployeeId(), query.getStartDate(), query.getEndDate());
        return processAccessRecords(accessRecords);
    }

    private List<AccessReportDTO> processAccessRecords(List<AccessQueryModel> records) {
        // Agrupar por empleado y día
        Map<String, Map<LocalDateTime, List<AccessQueryModel>>> groupedRecords = new HashMap<>();
        
        for (AccessQueryModel record : records) {
            LocalDateTime day = record.getTimestamp().withHour(0).withMinute(0).withSecond(0);
            groupedRecords
                .computeIfAbsent(record.getEmployeeId(), k -> new HashMap<>())
                .computeIfAbsent(day, k -> new ArrayList<>())
                .add(record);
        }
        
        // Procesar cada grupo
        List<AccessReportDTO> result = new ArrayList<>();
        groupedRecords.forEach((employeeId, days) -> {
            days.forEach((day, dayRecords) -> {
                // Ordenar registros por timestamp
                dayRecords.sort((r1, r2) -> r1.getTimestamp().compareTo(r2.getTimestamp()));
                
                // Procesar pares CHECK_IN/CHECK_OUT
                for (int i = 0; i < dayRecords.size(); i++) {
                    AccessQueryModel current = dayRecords.get(i);
                    if ("CHECK_IN".equals(current.getEventType())) {
                        // Buscar siguiente CHECK_OUT
                        AccessQueryModel checkOut = null;
                        for (int j = i + 1; j < dayRecords.size(); j++) {
                            if ("CHECK_OUT".equals(dayRecords.get(j).getEventType())) {
                                checkOut = dayRecords.get(j);
                                i = j; // Saltar al CHECK_OUT
                                break;
                            }
                        }
                        
                        // Crear DTO
                        AccessReportDTO dto = new AccessReportDTO();
                        dto.setEmployeeId(employeeId);
                        dto.setCheckInTime(current.getTimestamp());
                        if (checkOut != null) {
                            dto.setCheckOutTime(checkOut.getTimestamp());
                            dto.setDurationMinutes(Duration.between(
                                current.getTimestamp(), checkOut.getTimestamp()).toMinutes());
                        }
                        result.add(dto);
                    }
                }
            });
        });
        
        return result;
    }
}