package uptc.edu.swii.reportingservice.infrastructure.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uptc.edu.swii.reportingservice.application.dto.AccessReportDTO;
import uptc.edu.swii.reportingservice.application.services.ReportService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "API for generating access reports")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/allemployeesbydate")
    @Operation(summary = "Get all employees access for a specific date")
    @ApiResponse(responseCode = "200", description = "Report generated successfully")
    public ResponseEntity<List<AccessReportDTO>> getEmployeesByDate(
            @Parameter(description = "Date in format YYYY-MM-DD", example = "2023-10-15")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(reportService.getEmployeesByDate(date));
    }

    @GetMapping("/employeebydates")
    @Operation(summary = "Get employee access for a date range")
    @ApiResponse(responseCode = "200", description = "Report generated successfully")
    public ResponseEntity<List<AccessReportDTO>> getEmployeeByDateRange(
            @Parameter(description = "Employee ID", example = "123456789")
            @RequestParam String employeeId,
            @Parameter(description = "Start date in format YYYY-MM-DD", example = "2023-10-01")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "End date in format YYYY-MM-DD", example = "2023-10-31")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(reportService.getEmployeeByDateRange(employeeId, startDate, endDate));
    }
}