package uptc.edu.swii.accesscontrolservice.command.infrastructure.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "access_commands")
@Data
public class AccessCommandEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeId;

    @Column(nullable = false)
    private String eventType; // CHECK_IN or CHECK_OUT

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private boolean processed = false;
}