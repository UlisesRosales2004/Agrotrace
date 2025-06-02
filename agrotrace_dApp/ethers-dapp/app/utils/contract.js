import { Contract } from 'ethers';
import { getProvider } from './ethers';
import StorageABI from '../../abis/Storage.json';

export const CONTRACT_ADDRESS = '0x474aAF6f0282360004A0A1554E5E9349435ceCDf';

export const CONTRACT_ABI = StorageABI;

export const getContract = () => {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getSignedContract = async (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};