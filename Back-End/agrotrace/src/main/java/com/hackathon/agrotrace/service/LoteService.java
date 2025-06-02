package com.hackathon.agrotrace.service;

import com.hackathon.agrotrace.entity.Lote;
import com.hackathon.agrotrace.repository.ILoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoteService implements ILoteService {

    @Autowired
    private ILoteRepository loteRepository;

    @Override
    public List<Lote> getAllLotes() {
        return loteRepository.findAll();
    }

    @Override
    public Optional<Lote> getLoteById(Long id) {
        return loteRepository.findById(id);
    }

    @Override
    public Lote saveLote(Lote lote) {
        return loteRepository.save(lote);
    }

    @Override
    public void deleteLote(Long id) {
        loteRepository.deleteById(id);
    }
}