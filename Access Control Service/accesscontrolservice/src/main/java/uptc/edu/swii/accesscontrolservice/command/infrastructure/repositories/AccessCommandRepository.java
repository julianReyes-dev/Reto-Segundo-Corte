package uptc.edu.swii.accesscontrolservice.command.infrastructure.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uptc.edu.swii.accesscontrolservice.command.infrastructure.entities.AccessCommandEntity;

import java.util.List;

@Repository
public interface AccessCommandRepository extends JpaRepository<AccessCommandEntity, Long> {
    List<AccessCommandEntity> findByProcessedFalse();
}