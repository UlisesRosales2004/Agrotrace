package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Calificacion;
import com.hackathon.agrotrace.entity.Lote;
import com.hackathon.agrotrace.repository.ICalificacionRepository;
import com.hackathon.agrotrace.repository.ILoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalificacionService implements ICalificacionService {

    @Autowired
    private ICalificacionRepository calificacionRepository;

    @Autowired
    private ILoteRepository loteRepo;

    @Override
    public List<Calificacion> getAllCalificaciones() {
        return calificacionRepository.findAll();
    }

    @Override
    public Optional<Calificacion> getCalificacionById(Long id) {
        return calificacionRepository.findById(id);
    }

    @Override
    public Calificacion saveCalificacion(Calificacion nuevaCalificacion) {
        // Obtener el lote al que se va a asociar esta calificación
        Lote lote = nuevaCalificacion.getLote();

        if (lote != null && lote.getId_lote() != null) {
            Optional<Lote> optionalLote = loteRepo.findById(lote.getId_lote());
            if (optionalLote.isPresent()) {
                Lote loteExistente = optionalLote.get();

                // Usar el método personalizado para agregar la calificación
                loteExistente.agregarCalificacion(nuevaCalificacion);

                // Guardar primero la calificación, luego el lote (si necesario)
                Calificacion guardada = calificacionRepository.save(nuevaCalificacion);
                loteRepo.save(loteExistente); // actualizar promedio

                return guardada;
            }
        }

        // Si no hay lote válido, simplemente guardar la calificación (o lanzar excepción)
        return calificacionRepository.save(nuevaCalificacion);
    }


    @Override
    public void deleteCalificacion(Long id) {
        Optional<Calificacion> optionalCali = calificacionRepository.findById(id);
        if (optionalCali.isPresent()) {
            Calificacion calificacion = optionalCali.get();

            Lote lote = calificacion.getLote();

            calificacionRepository.deleteById(id);

            if (lote != null) {
                // Recalcular promedio después de eliminar la calificación
                lote.setPromedioCalificaciones(lote.calcularPromedioCalificacion());
                loteRepo.save(lote);
            }
        } else {
            throw new RuntimeException("Calificación no encontrada con id " + id);
        }
    }
}