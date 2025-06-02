package uptc.edu.swii.accesscontrolservice.query.infrastructure.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories.AccessQueryRepository;
import uptc.edu.swii.accesscontrolservice.shared.domain.events.AccessEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.Duration;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccessEventConsumer {

    private final AccessQueryRepository queryRepository;

    @KafkaListener(topics = "access-events", groupId = "access-group")
    public void consumeAccessEvent(AccessEvent event) {
        log.info("Processing access event: {}", event);

        if ("CHECK_IN".equals(event.getEventType())) {
            handleCheckIn(event);
        } else if ("CHECK_OUT".equals(event.getEventType())) {
            handleCheckOut(event);
        }
    }

    private void handleCheckIn(AccessEvent event) {
        AccessQueryModel newCheckIn = new AccessQueryModel();
        newCheckIn.setEmployeeId(event.getEmployeeId());
        newCheckIn.setEventType("CHECK_IN");
        newCheckIn.setTimestamp(event.getTimestamp());
        newCheckIn.setCheckInTime(event.getTimestamp());
        queryRepository.save(newCheckIn);
        log.info("Saved new CHECK_IN for employee: {}", event.getEmployeeId());
    }

    private void handleCheckOut(AccessEvent event) {
        // Buscar el CHECK_IN más reciente sin CHECK_OUT para este empleado
        List<AccessQueryModel> openCheckIns = queryRepository.findByEmployeeIdAndEventTypeAndCheckOutTimeIsNull(
            event.getEmployeeId(), "CHECK_IN");

        if (!openCheckIns.isEmpty()) {
            // Ordenar por timestamp descendente y tomar el más reciente
            AccessQueryModel lastCheckIn = openCheckIns.stream()
                .max(Comparator.comparing(AccessQueryModel::getTimestamp))
                .orElseThrow();

            // Actualizar con el CHECK_OUT
            lastCheckIn.setCheckOutTime(event.getTimestamp());
            lastCheckIn.setDurationMinutes(
                Duration.between(lastCheckIn.getCheckInTime(), event.getTimestamp()).toMinutes());
            queryRepository.save(lastCheckIn);
            log.info("Updated CHECK_IN with CHECK_OUT for employee: {}", event.getEmployeeId());
        } else {
            log.warn("No open CHECK_IN found for CHECK_OUT event: {}", event);
        }
    }
}