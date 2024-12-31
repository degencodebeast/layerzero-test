// import {network, ethers} from 'hardhat';
// import { OFTAdapter__factory} from '../../typechain';

// const privateKey = process.env.DEPOLYER_KEY as string;

// const provider = ethers.provider;

// const destination_network = 'polygon';
// const destination_oft_contract = ethers.utils.hexZeroPad('0x6c4ef945552FAb67813dE5dbD497a33882E0cEc7', 32);
// const getEID = (network: string) => {
// 	switch (network) {
// 		case 'mainnet':
// 			return 30101;
// 		case 'avalanche':
// 			return 30106;
// 		case 'arbitrum':
// 			return 30110;
// 		case 'polygon':
// 			return 30109;
// 		default:
// 			throw new Error(`UnSupported network ${network}`);
// 	}
// };

// async function main() {
// 	try {
// 		const signer = new ethers.Wallet(privateKey, provider);
// 		const account = await signer.getAddress();
// 		let balance = await signer.getBalance();
// 		console.log(`${network.name} address : ${account} with balance ${balance.toString()}`);

// 		const adapter_address = (await ethers.getContract('Adapter')).address;

// 		const adapter = OFTAdapter__factory.connect(adapter_address, signer);

// 		const EID = getEID(destination_network);

// 		const isPeer = await adapter.isPeer(EID, destination_oft_contract);
// 		if (isPeer) {
// 			console.log(`Peer already set to ${destination_oft_contract} `);
// 			return;
// 		}

// 		const gas = await adapter.estimateGas.setPeer(EID, destination_oft_contract);
// 		console.log(`Gas required: ${gas.toString()}`);
// 		const tx = await adapter.setPeer(EID, destination_oft_contract, {
// 			gasLimit: gas,
// 			gasPrice: await provider.getGasPrice(),
// 		});
// 		const res = await tx.wait();
// 		console.log(`Transaction hash: ${res.transactionHash}`);
// 		console.log(`Peer set to ${destination_oft_contract} `);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// main()
// 	.then(() => process.exit(0))
// 	.catch((error) => {
// 		console.error(error);
// 		process.exit(1);
// 	});


import { ethers } from 'ethers'; 
import { abi as SUSDeOFTAdapterABI } from '../deployments/sepolia-testnet/SUSDeOFTAdapter.json';
import { abi as USDeOFTAdapterABI } from '../deployments/sepolia-testnet/USDeOFTAdapter.json';
import { EndpointId } from '@layerzerolabs/lz-definitions';
import { abi as SUSDeOFTABI } from '../deployments/opbnb-testnet/SUSDeOFT.json';
import { abi as USDeOFTABI } from '../deployments/opbnb-testnet/USDeOFT.json';

//const privateKey = process.env.DEPOLYER_KEY as string;
//const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);


// You'll need to specify your RPC URL
const ethRpcUrl = "https://eth-sepolia.g.alchemy.com/v2/wmmPIFmPi700hZkT_QuBCKRvsCpvJ-J9" 
const bnbRpcUrl = "https://opbnb-testnet.g.alchemy.com/v2/wmmPIFmPi700hZkT_QuBCKRvsCpvJ-J9"

const usdeTokenAddress = '0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696';
const susdeTokenAddress = '0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b'

const USDeOFTAdapterAddress = "0x7dA8F2F7EF7760E086c2b862cdDeBEFa8d969aa2"
const bnbUSDeOFTAddress = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"

const SUSDeOFTAdapterAddress = "0x661a059C390e9f4f8Ae581d09eF0Cea6ECc124A4"
const bnbSUSDeOFTAddress = "0x3a65168B746766066288B83417329a7F901b5569"


const provider = new ethers.providers.JsonRpcProvider(bnbRpcUrl);


const privateKey = ""

const destination_network = 'sepolia';
const destination_oft_contract = ethers.utils.hexZeroPad(SUSDeOFTAdapterAddress, 32);

const getEID = (network: string): number => {
  switch (network) {
    case 'mainnet':
      return EndpointId.ETHEREUM_V2_MAINNET;
    case 'avalanche':
      return EndpointId.AVALANCHE_V2_TESTNET;
    case 'arbitrum':
      return EndpointId.ARBITRUM_V2_TESTNET;
    case 'opbnb':
      return EndpointId.OPBNB_V2_TESTNET;
    case 'sepolia':
      return EndpointId.SEPOLIA_V2_TESTNET;
    default:
      throw new Error(`UnSupported network ${network}`);
  }
};

async function main() {
  try {
    const signer = new ethers.Wallet(privateKey, provider);
    const account = await signer.getAddress();
    let balance = await signer.getBalance();
    const networkName = (await provider.getNetwork()).name;
    console.log(`${networkName} address : ${account} with balance ${balance.toString()}`);

    // You'll need to specify your adapter address
    //const adapter_address = process.env.ADAPTER_ADDRESS as string;
	// const adapter_address = SUSDeOFTAdapterAddress
  //   if (!adapter_address) {
  //     throw new Error('Adapter address not specified');
  //   }

  //const adapter = new ethers.Contract(bnbUSDeOFTAddress, USDeOFTABI, signer);

    const oft = new ethers.Contract(bnbSUSDeOFTAddress, SUSDeOFTABI, signer);

    const EID = getEID(destination_network);

    const isPeer = await oft.isPeer(EID, destination_oft_contract);
    if (isPeer) {
      console.log(`Peer already set to ${destination_oft_contract} `);
      return;
    }

    const gas = await oft.estimateGas.setPeer(EID, destination_oft_contract);
    console.log(`Gas required: ${gas.toString()}`);
    
    const tx = await oft.setPeer(EID, destination_oft_contract, {
      gasLimit: gas,
      gasPrice: await provider.getGasPrice(),
    });
    
    const res = await tx.wait();
    console.log(`Transaction hash: ${res.transactionHash}`);
    console.log(`Peer set to ${destination_oft_contract} `);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });