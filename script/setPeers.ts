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

// ABI for the OFTAdapter contract
// const OFTAdapterABI = [
//   "function isPeer(uint32 _eid, bytes32 _peer) view returns (bool)",
//   "function setPeer(uint32 _eid, bytes32 _peer)"
// ];


import { abi as OFTAdapterABI } from '../deployments/sepolia-testnet/MyOFTAdapter.json'; 

//const privateKey = process.env.DEPOLYER_KEY as string;
//const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);


// You'll need to specify your RPC URL
const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/wmmPIFmPi700hZkT_QuBCKRvsCpvJ-J9" 

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);


const privateKey = ""

const destination_network = 'avalanche';
const destination_oft_contract = ethers.utils.hexZeroPad('0xA074Aa95C8C46501cD8077eDc67cf1E95C0C21BD', 32);

const getEID = (network: string): number => {
  switch (network) {
    case 'mainnet':
      return 30101;
    case 'avalanche':
      return 40106;
    case 'arbitrum':
      return 30110;
    case 'polygon':
      return 30109;
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
	const adapter_address = "0x81D9796e071D39CbEE043975002fFc03cbADc96f"
    if (!adapter_address) {
      throw new Error('Adapter address not specified');
    }

    const adapter = new ethers.Contract(adapter_address, OFTAdapterABI, signer);

    const EID = getEID(destination_network);

    const isPeer = await adapter.isPeer(EID, destination_oft_contract);
    if (isPeer) {
      console.log(`Peer already set to ${destination_oft_contract} `);
      return;
    }

    const gas = await adapter.estimateGas.setPeer(EID, destination_oft_contract);
    console.log(`Gas required: ${gas.toString()}`);
    
    const tx = await adapter.setPeer(EID, destination_oft_contract, {
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