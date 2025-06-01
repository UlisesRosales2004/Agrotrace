package com.hackathon.agrotrace.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Agricultor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_agrigultor;

    private String nombre;
    private String email;
    private String contrasenia;
    private String ubicacion;
    private String fotoPerfilUrl;
    private LocalDate fechaRegistro;

    @OneToMany(mappedBy = "agricultor")
    @JsonManagedReference
    private List<Lote> lotes;

    private Double calificacionPromedio;

    //calculo la calificación promedio de cada agricultor basandome en todos los promedios de los lotes
    public Double calcularCalificacionPromedio() {
        if (lotes == null || lotes.isEmpty()) {
            return 0.0;
        }

        double sumaPromedios = 0;
        int cantidadLotesConCalificacion = 0;

        for (Lote lote : lotes) {
            Double promedioLote = lote.getPromedioCalificaciones();
            if (promedioLote != null && promedioLote > 0) {
                sumaPromedios += promedioLote;
                cantidadLotesConCalificacion++;
            }
        }

        if (cantidadLotesConCalificacion == 0) {
            return 0.0;
        }

        // Redondeo a múltiplos de 0.5
        double promedio = sumaPromedios / cantidadLotesConCalificacion;
        return Math.round(promedio * 2) / 2.0;
    }

}
