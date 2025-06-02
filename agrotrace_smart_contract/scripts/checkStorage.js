// scripts/checkAgrotrace.js

const { ethers } = require('ethers');
const { readFileSync } = require('fs');
const { join } = require('path');
require('dotenv').config();

const createProvider = (providerConfig) => {
  return new ethers.JsonRpcProvider(providerConfig.rpc, {
    chainId: providerConfig.chainId,
    name: providerConfig.name,
  });
};

const createWallet = (mnemonic, provider) => {
  return ethers.Wallet.fromPhrase(mnemonic).connect(provider);
};

const loadContractAbi = (contractName, directory = __dirname) => {
  // Asume que tu ABI de Agrotrace está en ../Agrotrace.json
  const contractPath = join(directory, `../${contractName}.json`);
  const contractJson = JSON.parse(readFileSync(contractPath, 'utf8'));
  return contractJson.abi || contractJson;
};

const createContract = (contractAddress, abi, walletOrProvider) => {
  return new ethers.Contract(contractAddress, abi, walletOrProvider);
};

const interactWithAgrotrace = async (
  contractName,
  contractAddress,
  mnemonic,
  providerConfig
) => {
  try {
    // 1) Crear provider y wallet
    const provider = createProvider(providerConfig);
    const wallet = createWallet(mnemonic, provider);

    // 2) Cargar ABI y crear instancia del contrato
    const abi = loadContractAbi(contractName);
    const contract = createContract(contractAddress, abi, wallet);

    // 3) Llamar a getLote() para obtener todos los campos
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
      nombre_agricultor
    ] = await contract.getLote();

    console.log('🔍 Datos del lote:');
    console.log(`• id_lote:            ${id_lote.toString()}`);
    console.log(`• nombre:             ${nombre}`);
    console.log(`• tipoCultivo:        ${tipoCultivo}`);
    console.log(`• descripcion:        ${descripcion}`);
    console.log(`• fechaSiembra:       ${fechaSiembra}`);
    console.log(`• fechaCosecha:       ${fechaCosecha}`);
    console.log(`• practicasUtilizadas:${practicasUtilizadas}`);
    console.log(`• fechaExpiracion:    ${fechaExpiracion}`);
    console.log('🔍 Datos del agricultor:');
    console.log(`  - id_agricultor:    ${id_agricultor.toString()}`);
    console.log(`  - nombre_agricultor:${nombre_agricultor}`);
  } catch (error) {
    console.error('Error interactuando con Agrotrace contract:', error.message);
  }
};

const providerConfig = {
  name: 'agrotrace',
  rpc: 'https://testnet-passet-hub-eth-rpc.polkadot.io/',
  chainId: 420420421,
};

// Reemplaza con tu frase semilla real (o usa dotenv para no hardcodear)
const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('⚠️ La variable MNEMONIC no está definida en .env');
}

// Nombre del archivo JSON generado tras compilar (sin extensión .json)
const contractName = 'Agrotrace';
// Dirección donde desplegaste Agrotrace
const contractAddress = '0x474aAF6f0282360004A0A1554E5E9349435ceCDf';

interactWithAgrotrace(contractName, contractAddress, mnemonic, providerConfig);
