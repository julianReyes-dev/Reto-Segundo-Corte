package uptc.edu.swii.accesscontrolservice.command.application.services;

import lombok.RequiredArgsConstructor;
import uptc.edu.swii.accesscontrolservice.command.application.commands.RegisterCheckInCommand;
import uptc.edu.swii.accesscontrolservice.command.application.commands.RegisterCheckOutCommand;
import uptc.edu.swii.accesscontrolservice.command.application.handlers.AccessCommandHandler;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccessCommandService {

    private final AccessCommandHandler commandHandler;

    public void registerCheckIn(String employeeId) {
        RegisterCheckInCommand command = new RegisterCheckInCommand();
        command.setEmployeeId(employeeId);
        commandHandler.handle(command);
    }

    public void registerCheckOut(String employeeId) {
        RegisterCheckOutCommand command = new RegisterCheckOutCommand();
        command.setEmployeeId(employeeId);
        commandHandler.handle(command);
    }
}