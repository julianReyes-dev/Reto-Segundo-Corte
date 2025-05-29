package uptc.edu.swii.employeeservice.infrastructure.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import uptc.edu.swii.employeeservice.domain.repository.EmployeeRepository;
import uptc.edu.swii.employeeservice.infrastructure.persistence.repositories.EmployeeMapperPersistence;
import uptc.edu.swii.employeeservice.infrastructure.persistence.repositories.EmployeeMongoRepository;
import uptc.edu.swii.employeeservice.infrastructure.persistence.repositories.EmployeeRepositoryImpl;

@Configuration
public class EmployeeConfig {
    
    @Bean
    public EmployeeRepository employeeRepository(EmployeeMongoRepository employeeMongoRepository, EmployeeMapperPersistence employeeMapper) {
        return new EmployeeRepositoryImpl(employeeMongoRepository, employeeMapper);
    }
}