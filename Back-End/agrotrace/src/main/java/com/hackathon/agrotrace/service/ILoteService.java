package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Lote;

import java.util.List;
import java.util.Optional;

public interface ILoteService {
    List<Lote> getAllLotes();
    Optional<Lote> getLoteById(Long id);
    Lote saveLote(Lote lote);
    void deleteLote(Long id);
}