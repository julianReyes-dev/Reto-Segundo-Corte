package uptc.edu.swii.accesscontrolservice.query.infrastructure.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByDateQuery;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByEmployeeAndDateRangeQuery;
import uptc.edu.swii.accesscontrolservice.query.application.queries.GetAccessByEmployeeIdQuery;
import uptc.edu.swii.accesscontrolservice.query.application.services.AccessQueryService;
import uptc.edu.swii.accesscontrolservice.shared.dtos.AccessReportDTO;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/access/query")
@RequiredArgsConstructor
@Tag(name = "Access Query", description = "Endpoints for access query operations")
public class AccessQueryController {

    private final AccessQueryService queryService;

    @GetMapping("/employee/{employeeId}")
    @Operation(summary = "Get all access records for an employee")
    @ApiResponse(responseCode = "200", description = "Access records retrieved successfully")
    public ResponseEntity<List<AccessReportDTO>> getAccessByEmployeeId(@PathVariable String employeeId) {
        GetAccessByEmployeeIdQuery query = new GetAccessByEmployeeIdQuery();
        query.setEmployeeId(employeeId);
        return ResponseEntity.ok(queryService.handle(query));
    }

    @GetMapping("/date/{date}")
    @Operation(summary = "Get all access records for a specific date")
    @ApiResponse(responseCode = "200", description = "Access records retrieved successfully")
    public ResponseEntity<List<AccessReportDTO>> getAccessByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDateTime start = LocalDateTime.of(date, LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(date, LocalTime.MAX);
        
        GetAccessByDateQuery query = new GetAccessByDateQuery();
        query.setDate(start);
        query.setEndDate(end);
        return ResponseEntity.ok(queryService.handle(query));
    }

    @GetMapping("/employee/{employeeId}/range")
    @Operation(summary = "Get access records for an employee within a date range")
    @ApiResponse(responseCode = "200", description = "Access records retrieved successfully")
    public ResponseEntity<List<AccessReportDTO>> getAccessByEmployeeAndDateRange(
            @PathVariable String employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        LocalDateTime start = LocalDateTime.of(startDate, LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(endDate, LocalTime.MAX);
        
        GetAccessByEmployeeAndDateRangeQuery query = new GetAccessByEmployeeAndDateRangeQuery();
        query.setEmployeeId(employeeId);
        query.setStartDate(start);
        query.setEndDate(end);
        
        return ResponseEntity.ok(queryService.handle(query));
    }
}