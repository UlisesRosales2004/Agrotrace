package com.hackathon.agrotrace.controller;

import com.hackathon.agrotrace.entity.Calificacion;
import com.hackathon.agrotrace.service.ICalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/calificaciones")
@CrossOrigin(origins = "*")
public class CalificacionController {

    @Autowired
    private ICalificacionService calificacionService;

    @GetMapping
    public List<Calificacion> getAllCalificaciones() {
        return calificacionService.getAllCalificaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Calificacion> getCalificacionById(@PathVariable Long id) {
        Optional<Calificacion> optCali = calificacionService.getCalificacionById(id);
        if (optCali.isPresent()) {
            return ResponseEntity.ok(optCali.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Calificacion> createCalificacion(@RequestBody Calificacion nuevaCalificacion) {
        Calificacion guardada = calificacionService.saveCalificacion(nuevaCalificacion);
        return ResponseEntity.ok(guardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCalificacion(@PathVariable Long id, @RequestBody Calificacion caliActualizada) {
        Optional<Calificacion> optExistente = calificacionService.getCalificacionById(id);
        if (optExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Asegurarse de que el ID de la calificación a actualizar coincida
        caliActualizada.setId_calificacion(id);
        Calificacion guardada = calificacionService.saveCalificacion(caliActualizada);
        return ResponseEntity.ok(guardada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCalificacion(@PathVariable Long id) {
        Optional<Calificacion> optExistente = calificacionService.getCalificacionById(id);
        if (optExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        calificacionService.deleteCalificacion(id);
        return ResponseEntity.noContent().build();
    }
}
