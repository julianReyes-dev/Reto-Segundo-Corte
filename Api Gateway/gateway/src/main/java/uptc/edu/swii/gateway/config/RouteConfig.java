package uptc.edu.swii.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import uptc.edu.swii.gateway.filter.JwtAuthFilter;

@Configuration
public class RouteConfig {

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder, JwtAuthFilter jwtAuthFilter) {
        return builder.routes()
            .route("auth", r -> r.path("/api/auth/**")
                .uri("http://localhost:8080"))
            .route("employee", r -> r.path("/employee/**")
                .filters(f -> f.filter(jwtAuthFilter))
                .uri("http://localhost:8081"))
            .route("access-control", r -> r.path("/api/access/**")
                .filters(f -> f.filter(jwtAuthFilter))
                .uri("http://localhost:8083"))
            .route("reporting", r -> r.path("/api/reporting/**")
                .filters(f -> f.filter(jwtAuthFilter))
                .uri("http://localhost:8084"))
            // Prometheus con JWT y rewritePath
            .route("prometheus", r -> r.path("/prometheus/**")
                .filters(f -> f
                    .filter(jwtAuthFilter)
                    .rewritePath("/prometheus/(?<segment>.*)", "/${segment}"))
                .uri("http://localhost:9090"))
            // Grafana con JWT y rewritePath
            .route("grafana", r -> r.path("/grafana/**")
                .filters(f -> f
                    .filter(jwtAuthFilter)
                    .rewritePath("/grafana/(?<segment>.*)", "/${segment}"))
                .uri("http://localhost:3005"))
            .build();
    }
}
