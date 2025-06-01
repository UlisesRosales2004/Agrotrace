package com.hackathon.agrotrace.repository;

import com.hackathon.agrotrace.entity.Lote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILoteRepository extends JpaRepository<Lote, Long> {
}