package com.hackathon.agrotrace.repository;

import com.hackathon.agrotrace.entity.Agricultor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAgricultorRepository extends JpaRepository<Agricultor, Long> {
}