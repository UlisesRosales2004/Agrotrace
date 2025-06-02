const { writeFileSync, existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { ethers, JsonRpcProvider } = require('ethers');

const codegenDir = join(__dirname);

// Creates an Ethereum provider with specified RPC URL and chain details
const createProvider = (rpcUrl, chainId, chainName) => {
  const provider = new JsonRpcProvider(rpcUrl, {
    chainId: chainId,
    name: chainName,
  });
  return provider;
};


// Reads and parses the ABI file for a given contract
const getAbi = (contractName) => {
  try {
    return JSON.parse(
      readFileSync(join(codegenDir, `../${contractName}.json`), 'utf8')
    );
  } catch (error) {
    console.error(
      `Could not find ABI for contract ${contractName}:`,
      error.message
    );
    throw error;
  }
};

// Reads the compiled bytecode for a given contract
const getByteCode = (contractName) => {
  try {
    return `0x${readFileSync(
      join(codegenDir, `../${contractName}.polkavm`)
    ).toString('hex')}`;
  } catch (error) {
    console.error(
      `Could not find bytecode for contract ${contractName}:`,
      error.message
    );
    throw error;
  }
};

const deployContract = async (contractName, mnemonic, providerConfig) => {
  console.log(`Deploying ${contractName}...`);

  try {
    // Step 1: Set up provider and wallet
    const provider = createProvider(
      providerConfig.rpc,
      providerConfig.chainId,
      providerConfig.name
    );
    const walletMnemonic = ethers.Wallet.fromPhrase(mnemonic);
    const wallet = walletMnemonic.connect(provider);

    // Step 2: Create and deploy the contract
    const factory = new ethers.ContractFactory(
      getAbi(contractName),
      getByteCode(contractName),
      wallet
    );

    // 3) Llama a deploy pasando **solo valores**, sin tipos
    const id_lote = 1;
    const nombre = "Lote A";
    const tipoCultivo = "Trigo";
    const descripcion = "Lote experimental de trigo orgánico";
    const fechaSiembra = "2025-06-01";
    const fechaCosecha = "2025-09-15";
    const practicasUtilizadas = "Riego por goteo, abono orgánico";
    const fechaExpiracion = "2025-10-01";
    const id_agricultor = 42;
    const nombre_agricultor = "Juan Pérez";

    const contract = await factory.deploy(id_lote,
                                          nombre,
                                          tipoCultivo,
                                          descripcion,
                                          fechaSiembra,
                                          fechaCosecha,
                                          practicasUtilizadas,
                                          fechaExpiracion,
                                          id_agricultor,
                                          nombre_agricultor);
    await contract.waitForDeployment();

    // Step 3: Save deployment information
    const address = await contract.getAddress();
    console.log(`Contract ${contractName} deployed at: ${address}`);

    const addressesFile = join(codegenDir, 'contract-address.json');
    const addresses = existsSync(addressesFile)
      ? JSON.parse(readFileSync(addressesFile, 'utf8'))
      : {};
    addresses[contractName] = address;
    writeFileSync(addressesFile, JSON.stringify(addresses, null, 2), 'utf8');
  } catch (error) {
    console.error(`Failed to deploy contract ${contractName}:`, error);
  }
};

const providerConfig = {
  rpc: 'https://testnet-passet-hub-eth-rpc.polkadot.io/',
  chainId: 420420421,
  name: 'agrotrace',
};

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error('⚠️ La variable MNEMONIC no está definida en .env');
}

deployContract('Agrotrace', mnemonic, providerConfig);