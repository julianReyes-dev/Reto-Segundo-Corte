package uptc.edu.swii.accesscontrolservice.command.application.handlers;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import uptc.edu.swii.accesscontrolservice.command.application.commands.RegisterCheckInCommand;
import uptc.edu.swii.accesscontrolservice.command.application.commands.RegisterCheckOutCommand;
import uptc.edu.swii.accesscontrolservice.command.infrastructure.entities.AccessCommandEntity;
import uptc.edu.swii.accesscontrolservice.command.infrastructure.kafka.AccessEventProducer;
import uptc.edu.swii.accesscontrolservice.command.infrastructure.repositories.AccessCommandRepository;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories.AccessQueryRepository;
import uptc.edu.swii.accesscontrolservice.shared.domain.events.AccessEvent;
import uptc.edu.swii.accesscontrolservice.shared.exceptions.InvalidAccessException;
import uptc.edu.swii.accesscontrolservice.shared.services.EmployeeValidationService;

@Service
@RequiredArgsConstructor
public class AccessCommandHandler {

    private final AccessCommandRepository commandRepository;
    private final AccessQueryRepository queryRepository;
    private final AccessEventProducer eventProducer;
    private final EmployeeValidationService employeeValidationService;

    @Transactional
    public void handle(RegisterCheckInCommand command) {
        // Validar empleado antes de procesar
        employeeValidationService.validateEmployee(command.getEmployeeId());
        
        // Verificar si ya tiene un check-in sin check-out
        boolean hasPendingCheckout = queryRepository.findByEmployeeId(command.getEmployeeId()).stream()
            .anyMatch(r -> "CHECK_IN".equals(r.getEventType()) && r.getCheckOutTime() == null);
        
        if (hasPendingCheckout) {
            throw new InvalidAccessException("Employee with ID " + command.getEmployeeId() + 
                " already has a pending check-out");
        }

        AccessCommandEntity entity = new AccessCommandEntity();
        entity.setEmployeeId(command.getEmployeeId());
        entity.setEventType("CHECK_IN");
        entity.setTimestamp(LocalDateTime.now());
        commandRepository.save(entity);

        AccessEvent event = new AccessEvent();
        event.setEmployeeId(command.getEmployeeId());
        event.setEventType("CHECK_IN");
        event.setTimestamp(LocalDateTime.now());
        eventProducer.sendAccessEvent(event);
    }

    @Transactional
    public void handle(RegisterCheckOutCommand command) {
        // Validar empleado antes de procesar
        employeeValidationService.validateEmployee(command.getEmployeeId());
        
        // Verificar que tenga un check-in sin check-out
        boolean hasPendingCheckout = queryRepository.findByEmployeeId(command.getEmployeeId()).stream()
            .anyMatch(r -> "CHECK_IN".equals(r.getEventType()) && r.getCheckOutTime() == null);
        
        if (!hasPendingCheckout) {
            throw new InvalidAccessException("Employee with ID " + command.getEmployeeId() + 
                " doesn't have a pending check-in");
        }

        AccessCommandEntity entity = new AccessCommandEntity();
        entity.setEmployeeId(command.getEmployeeId());
        entity.setEventType("CHECK_OUT");
        entity.setTimestamp(LocalDateTime.now());
        commandRepository.save(entity);

        AccessEvent event = new AccessEvent();
        event.setEmployeeId(command.getEmployeeId());
        event.setEventType("CHECK_OUT");
        event.setTimestamp(LocalDateTime.now());
        eventProducer.sendAccessEvent(event);
    }
}