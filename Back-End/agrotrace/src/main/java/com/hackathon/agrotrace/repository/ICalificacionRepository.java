package com.hackathon.agrotrace.repository;

import com.hackathon.agrotrace.entity.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICalificacionRepository extends JpaRepository<Calificacion, Long> {
}