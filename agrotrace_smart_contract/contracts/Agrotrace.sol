// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title Agrotrace
/// @dev Guarda información de un lote en el constructor y provee funciones para
/// leer cada uno de los campos (incluyendo datos del agricultor).
contract Agrotrace {
    struct AgricultorInfo {
        uint256 id_agricultor;
        string nombre;
    }

    struct Lote {
        uint256 id_lote;
        string nombre;
        string tipoCultivo;
        string descripcion;
        string fechaSiembra;
        string fechaCosecha;
        string practicasUtilizadas;
        string fechaExpiracion;
        AgricultorInfo agricultor;
    }

    Lote public lote;

    /// @notice En el despliegue, inyecta todos los datos del lote y del agricultor
    /// @param _id_lote Identificador numérico del lote
    /// @param _nombre Nombre del lote
    /// @param _tipoCultivo Tipo de cultivo (por ejemplo, "Maíz", "Trigo", etc.)
    /// @param _descripcion Descripción breve del lote
    /// @param _fechaSiembra Fecha de siembra (formato libre, e.g. "2025-06-01")
    /// @param _fechaCosecha Fecha estimada de cosecha (formato libre)
    /// @param _practicasUtilizadas Prácticas agrícolas aplicadas en este lote
    /// @param _fechaExpiracion Fecha de expiración (por ejemplo, de producto empaquetado)
    /// @param _id_agricultor Identificador numérico del agricultor
    /// @param _nombre_agricultor Nombre (opcional) del agricultor
    constructor(
        uint256 _id_lote,
        string memory _nombre,
        string memory _tipoCultivo,
        string memory _descripcion,
        string memory _fechaSiembra,
        string memory _fechaCosecha,
        string memory _practicasUtilizadas,
        string memory _fechaExpiracion,
        uint256 _id_agricultor,
        string memory _nombre_agricultor
    ) {
        lote.id_lote = _id_lote;
        lote.nombre = _nombre;
        lote.tipoCultivo = _tipoCultivo;
        lote.descripcion = _descripcion;
        lote.fechaSiembra = _fechaSiembra;
        lote.fechaCosecha = _fechaCosecha;
        lote.practicasUtilizadas = _practicasUtilizadas;
        lote.fechaExpiracion = _fechaExpiracion;
        lote.agricultor = AgricultorInfo({ 
            id_agricultor: _id_agricultor, 
            nombre: _nombre_agricultor 
        });
    }

    /// @notice Devuelve todos los datos del lote y del agricultor como tupla.
    function getLote()
        external
        view
        returns (
            uint256 id_lote,
            string memory nombre,
            string memory tipoCultivo,
            string memory descripcion,
            string memory fechaSiembra,
            string memory fechaCosecha,
            string memory practicasUtilizadas,
            string memory fechaExpiracion,
            uint256 id_agricultor,
            string memory nombre_agricultor
        )
    {
        id_lote = lote.id_lote;
        nombre = lote.nombre;
        tipoCultivo = lote.tipoCultivo;
        descripcion = lote.descripcion;
        fechaSiembra = lote.fechaSiembra;
        fechaCosecha = lote.fechaCosecha;
        practicasUtilizadas = lote.practicasUtilizadas;
        fechaExpiracion = lote.fechaExpiracion;
        id_agricultor = lote.agricultor.id_agricultor;
        nombre_agricultor = lote.agricultor.nombre;
    }

    /// @notice Funciones individuales (opcional) para leer cada campo por separado

    function getIdLote() external view returns (uint256) {
        return lote.id_lote;
    }

    function getNombreLote() external view returns (string memory) {
        return lote.nombre;
    }

    function getTipoCultivo() external view returns (string memory) {
        return lote.tipoCultivo;
    }

    function getDescripcion() external view returns (string memory) {
        return lote.descripcion;
    }

    function getFechaSiembra() external view returns (string memory) {
        return lote.fechaSiembra;
    }

    function getFechaCosecha() external view returns (string memory) {
        return lote.fechaCosecha;
    }

    function getPracticasUtilizadas() external view returns (string memory) {
        return lote.practicasUtilizadas;
    }

    function getFechaExpiracion() external view returns (string memory) {
        return lote.fechaExpiracion;
    }

    function getAgricultorId() external view returns (uint256) {
        return lote.agricultor.id_agricultor;
    }

    function getAgricultorNombre() external view returns (string memory) {
        return lote.agricultor.nombre;
    }
}
