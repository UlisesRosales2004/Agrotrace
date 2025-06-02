'use client';

import { useState } from 'react';
import { getSignedContract } from '../utils/contract';
import { ethers } from 'ethers';

const WriteContract = ({ account }) => {
  const [direccionDestino, setDireccionDestino] = useState('');
  const [estrellas, setEstrellas] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1) Registrar al caller como agricultor
  const handleRegistrar = async () => {
    if (!account) {
      setStatus({ type: 'error', message: 'Primero conecta tu wallet' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: 'info', message: 'Enviando tx de registro...' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getSignedContract(signer);

      const tx = await contract.registrarAgricultor();
      setStatus({ type: 'info', message: 'Confirma la tx en tu wallet...' });
      await tx.wait();

      setStatus({ type: 'success', message: '¡Agricultor registrado!' });
    } catch (err) {
      console.error('Error registrando agricultor:', err);
      if (err.code === 4001) {
        setStatus({ type: 'error', message: 'Tx rechazada por usuario' });
      } else {
        setStatus({
          type: 'error',
          message: `Error: ${err.error?.message || err.message}`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2) Calificar a un agricultor con X estrellas (sin validar dirección)
  const handleCalificar = async (e) => {
    e.preventDefault();

    if (!account) {
      setStatus({ type: 'error', message: 'Primero conecta tu wallet' });
      return;
    }

    const n = parseInt(estrellas, 10);
    if (isNaN(n) || n < 1 || n > 5) {
      setStatus({ type: 'error', message: 'Estrellas debe ser un número entre 1 y 5' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: 'info', message: 'Enviando tx de calificación...' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getSignedContract(signer);

      const tx = await contract.calificarAgricultor(direccionDestino, n);
      setStatus({ type: 'info', message: 'Confirma la tx en tu wallet...' });
      await tx.wait();

      setStatus({
        type: 'success',
        message: `Calificado ${direccionDestino} con ${n} estrella(s)`,
      });
      setDireccionDestino('');
      setEstrellas('');
    } catch (err) {
      console.error('Error al calificar:', err);
      if (err.code === 4001) {
        setStatus({ type: 'error', message: 'Tx rechazada por usuario' });
      } else {
        const mensaje = err.error?.message || err.error?.data?.message || err.message;
        setStatus({ type: 'error', message: `Error al calificar: ${mensaje}` });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
}
export default WriteContract;
