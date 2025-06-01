package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Agricultor;

import java.util.List;
import java.util.Optional;

public interface IAgricultorService {
    List<Agricultor> getAllAgricultores();
    Optional<Agricultor> getAgricultorById(Long id);
    Agricultor saveAgricultor(Agricultor agricultor);
    void deleteAgricultor(Long id);

    // Nuevo: Validar login
    Optional<Agricultor> login(String email, String contrasenia);

    // Nuevo: Registrar si no existe el email
    Optional<Agricultor> registrar(Agricultor nuevoAgricultor);
}
