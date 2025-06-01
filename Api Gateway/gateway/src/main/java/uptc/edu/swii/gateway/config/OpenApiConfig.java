package uptc.edu.swii.gateway.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public GroupedOpenApi authApi() {
        return GroupedOpenApi.builder()
            .group("auth")
            .pathsToMatch("/api/auth/**")
            .build();
    }

    @Bean
    public GroupedOpenApi employeeApi() {
        return GroupedOpenApi.builder()
            .group("employee")
            .pathsToMatch("/employee/**")
            .build();
    }

    @Bean
    public GroupedOpenApi accessControlApi() {
        return GroupedOpenApi.builder()
            .group("access-control")
            .pathsToMatch("/api/access/**")
            .build();
    }

    @Bean
    public GroupedOpenApi reportingApi() {
        return GroupedOpenApi.builder()
            .group("reporting")
            .pathsToMatch("/api/reports/**")
            .build();
    }
}
