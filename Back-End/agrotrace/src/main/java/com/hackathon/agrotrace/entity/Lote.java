package com.hackathon.agrotrace.entity;

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
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_lote;

    private String nombre;
    private String tipoCultivo;
    private String descripcion;
    private LocalDate fechaSiembre;
    private LocalDate fechaCosecha;
    private String practicasUtilizadas;
    private String urlFirmado;
    private String qrImageUrl;
    private LocalDate fechaCarga;
    private LocalDate fechaExpiracion;
    @ElementCollection
    private List<String> certificaciones;

    @OneToMany(mappedBy = "lote")
    private List<Calificacion> calificaciones;

    @ManyToOne
    private Agricultor agricultor;

    private Double promedioCalificaciones;


    public Double calcularPromedioCalificacion() {
        if (calificaciones == null || calificaciones.isEmpty()) {
            return 0.0;
        }

        double cantidadTotalEstrellas = 0;

        for (Calificacion cali : calificaciones) {
            cantidadTotalEstrellas += cali.getCantidadEstrellas();
        }

        double promedio = cantidadTotalEstrellas / calificaciones.size();

        // Redondeo a múltiplos de 0.5
        return Math.round(promedio * 2) / 2.0;
    }

    public void agregarCalificacion(Calificacion calificacion) {
        if (this.calificaciones == null) {
            this.calificaciones = new java.util.ArrayList<>();
        }

        this.calificaciones.add(calificacion);
        this.promedioCalificaciones = calcularPromedioCalificacion();
    }


}
