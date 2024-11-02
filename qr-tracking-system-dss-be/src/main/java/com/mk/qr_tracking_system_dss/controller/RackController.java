package com.mk.qr_tracking_system_dss.controller;
import com.mk.qr_tracking_system_dss.entity.Rack;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.service.RackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/racks")
@RequiredArgsConstructor // Lombok ile constructor injection
public class RackController {

    private final RackService rackService;

    @PostMapping("/add")
    public ResponseEntity<String> addRack(@Valid @RequestBody Rack rack) {
        rackService.addRack(rack);
        return ResponseEntity.ok("Raf başarıyla sisteme eklendi.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRackById(@PathVariable Long id) {
        rackService.deleteRackById(id);
        return ResponseEntity.ok("Raf başarıyla silindi.");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateRack(@Valid @RequestBody Rack rack, @PathVariable Long id) {
        rackService.updateRack(rack, id);
        return ResponseEntity.ok("Raf başarıyla güncellendi.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rack> getRackById(@PathVariable Long id) {
        Rack rack = rackService.getRackById(id);
        return ResponseEntity.ok(rack);
    }

    @GetMapping //Bu direkt /racks isteğinde çalışır ve tüm rafları çağırır.
    public ResponseEntity<List<Rack>> getAllRacks() {
        List<Rack> racks = rackService.getAllRacks();
        return ResponseEntity.ok(racks);
    }

    @GetMapping("/{rackId}/packages")
    public ResponseEntity<List<Package>> getAllPackagesInRack(@PathVariable Long rackId) {
        List<Package> packages = rackService.getAllPackagesInRack(rackId);
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/findSuitableRacks/{productId}/{quantityOfProduct}")
    public ResponseEntity<List<Rack>> findSuitableRacks(@PathVariable Long productId, @PathVariable int quantityOfProduct) {
        List<Rack> racks = rackService.findSuitableRacks(productId, quantityOfProduct);
        return ResponseEntity.ok(racks);
    }
}
