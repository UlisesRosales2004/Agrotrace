package com.hackathon.agrotrace.controller;

import com.hackathon.agrotrace.entity.Agricultor;
import com.hackathon.agrotrace.service.IAgricultorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agricultores")
@CrossOrigin(origins = "*")
public class AgricultorController {

    @Autowired
    private IAgricultorService agricultorService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Agricultor nuevoAgricultor) {
        Optional<Agricultor> optRegistrado = agricultorService.registrar(nuevoAgricultor);

        if (optRegistrado.isPresent()) {
            return ResponseEntity.ok(optRegistrado.get());
        } else {
            return ResponseEntity.badRequest().body("Ya existe un agricultor con ese email");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Agricultor credenciales) {
        // login() devuelve Optional<Agricultor>
        Optional<Agricultor> optAgr = agricultorService.login(
                credenciales.getEmail(),
                credenciales.getContrasenia()
        );

        if (optAgr.isPresent()) {
            return ResponseEntity.ok(optAgr.get());
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

    @GetMapping
    public List<Agricultor> getAll() {
        return agricultorService.getAllAgricultores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agricultor> getById(@PathVariable Long id) {
        Optional<Agricultor> optAgr = agricultorService.getAgricultorById(id);

        if (optAgr.isPresent()) {
            return ResponseEntity.ok(optAgr.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
