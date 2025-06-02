package uptc.edu.swii.reportingservice.infrastructure.kafka;

import io.micrometer.core.instrument.MeterRegistry;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.common.Metric;
import org.apache.kafka.common.MetricName;
import org.apache.kafka.common.TopicPartition;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Collections;
import java.util.Map;
import java.util.Set;

@Component
public class KafkaMetricsReporter {

    private final Consumer<String, Object> consumer;
    private final MeterRegistry meterRegistry;

    public KafkaMetricsReporter(ConsumerFactory<String, Object> consumerFactory, 
                              MeterRegistry meterRegistry,
                              @Value("${spring.kafka.topic.name:access-events}") String topicName) {
        this.consumer = consumerFactory.createConsumer();
        this.meterRegistry = meterRegistry;
        
        // Suscribir al topic al iniciar
        this.consumer.subscribe(Collections.singletonList(topicName));
    }

    @Scheduled(fixedRate = 5000)
    public void reportKafkaMetrics() {
        try {
            // Verificar si está asignado a alguna partición
            Set<TopicPartition> assignments = consumer.assignment();
            if (assignments.isEmpty()) {
                // Si no hay asignaciones, intentar rebalancear
                consumer.poll(Duration.ZERO);
                assignments = consumer.assignment();
            }

            if (!assignments.isEmpty()) {
                Map<MetricName, ? extends Metric> metrics = consumer.metrics();
                
                metrics.forEach((name, metric) -> {
                    String metricName = name.group() + "." + name.name();
                    metricName = metricName.replaceAll("-", "_");
                    
                    Object metricValue = metric.metricValue();
                    if (metricValue instanceof Number) {
                        double value = ((Number) metricValue).doubleValue();
                        meterRegistry.gauge("kafka.consumer." + metricName, value);
                    }
                });
            }
        } catch (Exception e) {
            // Loggear error pero no interrumpir la ejecución
            System.err.println("Error reporting Kafka metrics: " + e.getMessage());
        }
    }

    @Scheduled(fixedRate = 10000)
    public void pollForMetrics() {
        try {
            // Poll con timeout corto solo para mantener la sesión
            ConsumerRecords<String, Object> records = consumer.poll(Duration.ofMillis(100));
            if (!records.isEmpty()) {
                consumer.commitSync();
            }
        } catch (Exception e) {
            // Loggear error pero no interrumpir la ejecución
            System.err.println("Error in Kafka metrics polling: " + e.getMessage());
        }
    }
}