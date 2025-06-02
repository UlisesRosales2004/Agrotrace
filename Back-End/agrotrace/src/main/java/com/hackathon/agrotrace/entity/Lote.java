package com.hackathon.agrotrace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id_lote"
)
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
    private String price;
    private String priceUnit;
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
    //esto lo debo usar cada vez que se cree una calificación para actualizarla en el lote osea lo debo poner en el service
    public void agregarCalificacion(Calificacion calificacion) {
        if (this.calificaciones == null) {
            this.calificaciones = new java.util.ArrayList<>();
        }

        this.calificaciones.add(calificacion);
        this.promedioCalificaciones = calcularPromedioCalificacion();
    }


}
