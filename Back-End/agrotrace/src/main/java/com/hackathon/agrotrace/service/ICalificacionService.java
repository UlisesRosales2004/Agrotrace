package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Calificacion;

import java.util.List;
import java.util.Optional;

public interface ICalificacionService {
    List<Calificacion> getAllCalificaciones();
    Optional<Calificacion> getCalificacionById(Long id);
    Calificacion saveCalificacion(Calificacion calificacion);
    void deleteCalificacion(Long id);
}