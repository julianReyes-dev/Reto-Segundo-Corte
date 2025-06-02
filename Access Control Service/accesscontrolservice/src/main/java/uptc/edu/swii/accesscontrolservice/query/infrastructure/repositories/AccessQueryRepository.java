package uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories;

import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AccessQueryRepository extends MongoRepository<AccessQueryModel, String> {
    List<AccessQueryModel> findByEmployeeId(String employeeId);
    List<AccessQueryModel> findByEmployeeIdAndEventTypeAndCheckOutTimeIsNull(String employeeId, String eventType);
    List<AccessQueryModel> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<AccessQueryModel> findByEmployeeIdAndTimestampBetween(String employeeId, LocalDateTime start, LocalDateTime end);
}