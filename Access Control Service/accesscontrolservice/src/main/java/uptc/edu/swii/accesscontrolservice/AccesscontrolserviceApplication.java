package uptc.edu.swii.accesscontrolservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import uptc.edu.swii.accesscontrolservice.shared.config.JwtTokenFilter;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients
public class AccesscontrolserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccesscontrolserviceApplication.class, args);
	}

	@Bean
    public JwtTokenFilter jwtTokenFilter(@Value("${jwt.secret}") String jwtSecret) {
        return new JwtTokenFilter(jwtSecret);
    }

}
