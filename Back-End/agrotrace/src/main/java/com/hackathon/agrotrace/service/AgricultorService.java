package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Agricultor;
import com.hackathon.agrotrace.repository.IAgricultorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AgricultorService implements IAgricultorService {

    @Autowired
    private IAgricultorRepository agricultorRepository;

    @Override
    public List<Agricultor> getAllAgricultores() {
        return agricultorRepository.findAll();
    }

    @Override
    public Optional<Agricultor> getAgricultorById(Long id) {
        return agricultorRepository.findById(id);
    }

    @Override
    public Agricultor saveAgricultor(Agricultor agricultor) {
        return agricultorRepository.save(agricultor);
    }

    @Override
    public void deleteAgricultor(Long id) {
        agricultorRepository.deleteById(id);
    }

    @Override
    public Optional<Agricultor> login(String email, String contrasenia) {
        return agricultorRepository.findAll().stream()
                .filter(a -> a.getEmail().equalsIgnoreCase(email) && a.getContrasenia().equals(contrasenia))
                .findFirst();
    }

    @Override
    public Optional<Agricultor> registrar(Agricultor nuevoAgricultor) {
        boolean existe = agricultorRepository.findAll().stream()
                .anyMatch(a -> a.getEmail().equalsIgnoreCase(nuevoAgricultor.getEmail()));

        if (existe) {
            return Optional.empty(); // Ya existe ese email
        }

        nuevoAgricultor.setFechaRegistro(LocalDate.now());
        Agricultor guardado = agricultorRepository.save(nuevoAgricultor);
        return Optional.of(guardado);
    }
}
