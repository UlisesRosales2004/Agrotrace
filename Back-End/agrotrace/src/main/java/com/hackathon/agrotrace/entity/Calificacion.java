package com.hackathon.agrotrace.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id_calificacion"
)
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_calificacion;

    @Min(0)
    @Max(5)
    private int cantidadEstrellas;

    @ManyToOne
    @JsonBackReference
    private Lote lote;
}
