package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.dto.MovementsDto;
import com.mk.qr_tracking_system_dss.entity.Movement;
import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.MovementType;
import com.mk.qr_tracking_system_dss.repository.MovementRepository;
import com.mk.qr_tracking_system_dss.service.MovementService;
import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MovementServiceImpl implements MovementService {

    private final UserService userService;
    private final MovementRepository movementRepository;

    @Override
    public void recordPackageEntry(Package pkg) {
        // Oturumdaki kullanıcının bilgisini al
       User CurrentUser = userService.getCurrentUser();

        // Yeni bir movement kaydı oluştur
        Movement movement = new Movement();
        movement.setUser(CurrentUser);
        movement.setMovementType(MovementType.PACKAGE_ENTRY);
        movement.setMovementDate(LocalDateTime.now());
        movement.setAPackage(pkg);
        movementRepository.save(movement);
    }

    // recordPackageExit overload ettim. İster paket idsi ister paket bilgisi ile çalışabilsin diye.
    @Override
    public void recordPackageExit(Package pkg) {
        // Oturumdaki kullanıcının bilgisini al
        User CurrentUser = userService.getCurrentUser();

        // Yeni bir movement kaydı oluştur
        Movement movement = new Movement();
        movement.setUser(CurrentUser);
        movement.setMovementType(MovementType.PACKAGE_EXIT);
        movement.setMovementDate(LocalDateTime.now());
        movement.setAPackage(pkg);
        movementRepository.save(movement);
    }

    @Override
    public List<MovementsDto> getAllMovements() {
        List<Movement> movements = movementRepository.findAll();
        return movements.stream().map(movement ->
                new MovementsDto(movement.getId(),
                        movement.getMovementDate(),
                        movement.getMovementType(),
                        new UserDto(movement.getUser().getId(),
                                movement.getUser().getUsername(),
                                movement.getUser().getFullName(),
                                movement.getUser().getRole().name()),
                        movement.getAPackage().getId()))
                .collect(Collectors.toList());
    }
}
