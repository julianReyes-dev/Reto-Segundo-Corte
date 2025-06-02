package uptc.edu.swii.employeeservice.infrastructure.persistence.repositories;

import org.springframework.stereotype.Repository;

import uptc.edu.swii.employeeservice.domain.model.Employee;
import uptc.edu.swii.employeeservice.domain.model.valueobjects.EmployeeId;
import uptc.edu.swii.employeeservice.domain.repository.EmployeeRepository;
import uptc.edu.swii.employeeservice.infrastructure.persistence.documents.EmployeeDocument;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepository {

    private final EmployeeMongoRepository employeeMongoRepository;
    private final EmployeeMapperPersistence employeeMapper;

    public EmployeeRepositoryImpl(EmployeeMongoRepository employeeMongoRepository,
                                EmployeeMapperPersistence employeeMapper) {
        this.employeeMongoRepository = employeeMongoRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    public Employee save(Employee employee) {
        EmployeeDocument document = employeeMapper.toDocument(employee);
        EmployeeDocument savedDocument = employeeMongoRepository.save(document);
        return employeeMapper.toDomain(savedDocument);
    }

    @Override
    public Optional<Employee> findById(EmployeeId id) {
        return employeeMongoRepository.findById(id.getId())
            .map(employeeMapper::toDomain);
    }

    @Override
    public List<Employee> findAll() {
        return employeeMongoRepository.findAll().stream()
            .map(employeeMapper::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public void delete(EmployeeId id) {
        employeeMongoRepository.deleteById(id.getId());
    }

    @Override
    public boolean existsById(EmployeeId id) {
        return employeeMongoRepository.existsById(id.getId());
    }

}