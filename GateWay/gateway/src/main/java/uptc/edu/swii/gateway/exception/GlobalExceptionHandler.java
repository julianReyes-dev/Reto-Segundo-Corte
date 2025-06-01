package uptc.edu.swii.gateway.exception;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;

import java.util.Map;

@Component
public class GlobalExceptionHandler extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(ServerRequest request, ErrorAttributeOptions options) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(request, options);
        
        Throwable error = getError(request);
        if (error instanceof org.springframework.cloud.gateway.support.NotFoundException) {
            errorAttributes.put("status", 404);
            errorAttributes.put("message", "Service not found");
        }
        
        return errorAttributes;
    }
}