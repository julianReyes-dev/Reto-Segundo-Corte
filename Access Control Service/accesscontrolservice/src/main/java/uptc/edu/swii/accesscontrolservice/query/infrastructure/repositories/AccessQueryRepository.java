package uptc.edu.swii.accesscontrolservice.query.infrastructure.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import uptc.edu.swii.accesscontrolservice.query.infrastructure.models.AccessQueryModel;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AccessQueryRepository extends MongoRepository<AccessQueryModel, String> {
    List<AccessQueryModel> findByEmployeeId(String employeeId);
    List<AccessQueryModel> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<AccessQueryModel> findByEmployeeIdAndTimestampBetween(String employeeId, LocalDateTime start, LocalDateTime end);
}