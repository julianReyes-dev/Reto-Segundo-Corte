package uptc.edu.swii.accesscontrolservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic accessEventsTopic() {
        return TopicBuilder.name("access-events")
                .partitions(3)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic accessQueryTopic() {
        return TopicBuilder.name("access-query-events")
                .partitions(3)
                .replicas(1)
                .build();
    }
}