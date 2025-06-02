package com.hackathon.agrotrace.controller;

import com.hackathon.agrotrace.entity.Lote;
import com.hackathon.agrotrace.service.ILoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/lotes")
public class LoteController {

    @Autowired
    private ILoteService loteService;

    @GetMapping
    public List<Lote> getAllLotes() {
        return loteService.getAllLotes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lote> getLoteById(@PathVariable Long id) {
        Optional<Lote> optLote = loteService.getLoteById(id);
        if (optLote.isPresent()) {
            return ResponseEntity.ok(optLote.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Lote> createLote(@RequestBody Lote nuevoLote) {
        Lote guardado = loteService.saveLote(nuevoLote);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLote(@PathVariable Long id, @RequestBody Lote loteActualizado) {
        Optional<Lote> optExistente = loteService.getLoteById(id);
        if (optExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Asegurarse de que el ID del lote a actualizar coincida
        loteActualizado.setId_lote(id);
        Lote guardado = loteService.saveLote(loteActualizado);
        return ResponseEntity.ok(guardado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLote(@PathVariable Long id) {
        Optional<Lote> optExistente = loteService.getLoteById(id);
        if (optExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        loteService.deleteLote(id);
        return ResponseEntity.noContent().build();
    }
}
