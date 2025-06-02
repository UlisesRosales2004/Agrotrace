
'use client';

import React, { useState, useEffect } from 'react';
import { getContract } from '../utils/contract';

const ReadContract = () => {
  const [loteData, setLoteData] = useState({
    id_lote: null,
    nombre: '',
    tipoCultivo: '',
    descripcion: '',
    fechaSiembra: '',
    fechaCosecha: '',
    practicasUtilizadas: '',
    fechaExpiracion: '',
    id_agricultor: null,
    nombre_agricultor: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLote = async () => {
      try {
        setLoading(true);
        const contract = getContract();

        // Llamar a getLote() y destructurar la tupla resultante
        const [
          id_lote,
          nombre,
          tipoCultivo,
          descripcion,
          fechaSiembra,
          fechaCosecha,
          practicasUtilizadas,
          fechaExpiracion,
          id_agricultor,
          nombre_agricultor,
        ] = await contract.getLote();

        setLoteData({
          id_lote: id_lote.toString(),
          nombre,
          tipoCultivo,
          descripcion,
          fechaSiembra,
          fechaCosecha,
          practicasUtilizadas,
          fechaExpiracion,
          id_agricultor: id_agricultor.toString(),
          nombre_agricultor,
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching lote data:', err);
        setError('Failed to fetch lote data from the contract');
      } finally {
        setLoading(false);
      }
    };

    fetchLote();

    const interval = setInterval(fetchLote, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-green-500 rounded-lg p-4 shadow-md bg-white text-green-500 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">Datos del Lote</h2>
      {loading ? (
        <div className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-2">
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>id_lote:</strong> {loteData.id_lote}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Nombre:</strong> {loteData.nombre}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Tipo de Cultivo:</strong> {loteData.tipoCultivo}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Descripción:</strong> {loteData.descripcion}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Fecha Siembra:</strong> {loteData.fechaSiembra}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Fecha Cosecha:</strong> {loteData.fechaCosecha}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Prácticas Utilizadas:</strong> {loteData.practicasUtilizadas}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Fecha Expiración:</strong> {loteData.fechaExpiracion}
          </p>
          <h3 className="mt-4 text-md font-semibold text-center">Datos del Agricultor</h3>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>id_agricultor:</strong> {loteData.id_agricultor}
          </p>
          <p className="text-sm font-mono bg-green-100 px-2 py-1 rounded-md text-green-700">
            <strong>Nombre Agricultor:</strong> {loteData.nombre_agricultor}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadContract;
