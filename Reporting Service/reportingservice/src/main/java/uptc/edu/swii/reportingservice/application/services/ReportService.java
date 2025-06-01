package uptc.edu.swii.reportingservice.application.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uptc.edu.swii.reportingservice.application.dto.AccessReportDTO;
import uptc.edu.swii.reportingservice.infrastructure.repositories.AccessRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final AccessRepository accessRepository;

    public List<AccessReportDTO> getEmployeesByDate(LocalDate date) {
        LocalDateTime start = LocalDateTime.of(date, LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(date, LocalTime.MAX);
        
        return accessRepository.findByCheckInTimeBetween(start, end).stream()
                .map(access -> {
                    AccessReportDTO dto = new AccessReportDTO();
                    dto.setEmployeeId(access.getEmployeeId());
                    dto.setEmployeeName(access.getEmployeeName());
                    dto.setCheckInTime(access.getCheckInTime());
                    dto.setCheckOutTime(access.getCheckOutTime());
                    
                    if (access.getCheckOutTime() != null) {
                        long minutes = ChronoUnit.MINUTES.between(
                            access.getCheckInTime(), 
                            access.getCheckOutTime()
                        );
                        long hours = minutes / 60;
                        minutes = minutes % 60;
                        dto.setDuration(String.format("%d horas %d minutos", hours, minutes));
                    }
                    
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<AccessReportDTO> getEmployeeByDateRange(String employeeId, LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = LocalDateTime.of(startDate, LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(endDate, LocalTime.MAX);
        
        return accessRepository.findByEmployeeIdAndCheckInTimeBetween(employeeId, start, end).stream()
                .map(access -> {
                    AccessReportDTO dto = new AccessReportDTO();
                    dto.setEmployeeId(access.getEmployeeId());
                    dto.setEmployeeName(access.getEmployeeName());
                    dto.setCheckInTime(access.getCheckInTime());
                    dto.setCheckOutTime(access.getCheckOutTime());
                    
                    if (access.getCheckOutTime() != null) {
                        long minutes = ChronoUnit.MINUTES.between(
                            access.getCheckInTime(), 
                            access.getCheckOutTime()
                        );
                        long hours = minutes / 60;
                        minutes = minutes % 60;
                        dto.setDuration(String.format("%d horas %d minutos", hours, minutes));
                    }
                    
                    return dto;
                })
                .collect(Collectors.toList());
    }
}