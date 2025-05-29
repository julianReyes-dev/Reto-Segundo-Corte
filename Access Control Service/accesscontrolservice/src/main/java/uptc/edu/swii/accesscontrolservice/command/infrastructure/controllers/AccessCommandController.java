package uptc.edu.swii.accesscontrolservice.command.infrastructure.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import uptc.edu.swii.accesscontrolservice.command.application.services.AccessCommandService;
import uptc.edu.swii.accesscontrolservice.shared.dtos.AccessRequestDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/access/command")
@RequiredArgsConstructor
@Tag(name = "Access Command", description = "Endpoints for access command operations")
public class AccessCommandController {

    private final AccessCommandService commandService;

    @PostMapping("/check-in")
    @Operation(summary = "Register employee check-in")
    @ApiResponse(responseCode = "200", description = "Check-in registered successfully")
    public ResponseEntity<String> registerCheckIn(@RequestBody AccessRequestDTO request) {
        commandService.registerCheckIn(request.getEmployeeId());
        return ResponseEntity.ok("Check-in registered successfully");
    }

    @PostMapping("/check-out")
    @Operation(summary = "Register employee check-out")
    @ApiResponse(responseCode = "200", description = "Check-out registered successfully")
    public ResponseEntity<String> registerCheckOut(@RequestBody AccessRequestDTO request) {
        commandService.registerCheckOut(request.getEmployeeId());
        return ResponseEntity.ok("Check-out registered successfully");
    }
}