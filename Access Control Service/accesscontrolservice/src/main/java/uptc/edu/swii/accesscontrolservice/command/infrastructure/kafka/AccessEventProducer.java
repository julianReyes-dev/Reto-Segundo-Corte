package uptc.edu.swii.accesscontrolservice.command.infrastructure.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import uptc.edu.swii.accesscontrolservice.shared.domain.events.AccessEvent;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccessEventProducer {

    private final KafkaTemplate<String, AccessEvent> kafkaTemplate;

    public void sendAccessEvent(AccessEvent event) {
        kafkaTemplate.send("access-events", event);
    }
}