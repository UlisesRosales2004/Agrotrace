package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Agricultor;
import com.hackathon.agrotrace.entity.Calificacion;
import com.hackathon.agrotrace.entity.Lote;
import com.hackathon.agrotrace.repository.IAgricultorRepository;
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
    @Autowired
    private IAgricultorRepository agricultorRepo;

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
        Lote lote = nuevaCalificacion.getLote();

        if (lote != null && lote.getId_lote() != null) {
            Optional<Lote> optionalLote = loteRepo.findById(lote.getId_lote());

            if (optionalLote.isPresent()) {
                Lote loteExistente = optionalLote.get();

                // Asociar calificación al lote
                loteExistente.agregarCalificacion(nuevaCalificacion);

                // Guardar calificación
                Calificacion guardada = calificacionRepository.save(nuevaCalificacion);

                // Actualizar promedio del lote si lo hacés manualmente
                loteRepo.save(loteExistente);

                // Recalcular y guardar el agricultor
                Agricultor agricultor = loteExistente.getAgricultor();
                if (agricultor != null) {
                    agricultor.setCalificacionPromedio(agricultor.calcularCalificacionPromedio());
                    agricultorRepo.save(agricultor); // Asegurate de tener el repo
                }

                return guardada;
            }
        }

        // Si no hay lote válido, simplemente guardar la calificación
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