package uptc.edu.swii.reportingservice.infrastructure.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import uptc.edu.swii.reportingservice.infrastructure.entities.AccessEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface AccessRepository extends MongoRepository<AccessEntity, String> {

    List<AccessEntity> findByCheckInTimeBetween(LocalDateTime start, LocalDateTime end);
    
    List<AccessEntity> findByEmployeeIdAndCheckInTimeBetween(
        String employeeId, 
        LocalDateTime start, 
        LocalDateTime end
    );
}