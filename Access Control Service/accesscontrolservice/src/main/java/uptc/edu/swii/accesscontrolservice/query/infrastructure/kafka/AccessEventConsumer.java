package uptc.edu.swii.accesscontrolservice.query.infrastructure.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;
import uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories.AccessQueryRepository;
import uptc.edu.swii.accesscontrolservice.shared.domain.events.AccessEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AccessEventConsumer {

    private final AccessQueryRepository queryRepository;

    @KafkaListener(topics = "access-events", groupId = "access-group")
    public void consumeAccessEvent(AccessEvent event, Acknowledgment ack) {
        try {
            log.info("Consumed Access Event: {}", event);

            // Para CHECK_IN, crear nuevo registro
            if ("CHECK_IN".equals(event.getEventType())) {
                AccessQueryModel model = new AccessQueryModel();
                model.setEmployeeId(event.getEmployeeId());
                model.setEventType(event.getEventType());
                model.setTimestamp(event.getTimestamp());
                queryRepository.save(model);
            } 
            // Para CHECK_OUT, buscar último CHECK_IN sin CHECK_OUT y actualizar
            else if ("CHECK_OUT".equals(event.getEventType())) {
                queryRepository.findByEmployeeId(event.getEmployeeId()).stream()
                    .filter(r -> "CHECK_IN".equals(r.getEventType()) && r.getCheckOutTime() == null)
                    .findFirst()
                    .ifPresent(record -> {
                        record.setCheckOutTime(event.getTimestamp());
                        record.setDurationMinutes(java.time.Duration.between(
                            record.getTimestamp(), event.getTimestamp()).toMinutes());
                        queryRepository.save(record);
                    });
            }
            
            ack.acknowledge(); // Confirmar el procesamiento del mensaje
        } catch (Exception e) {
            log.error("Error processing access event: {}", event, e);
            // No hacer acknowledge para reintentar más tarde
        }
    }
}