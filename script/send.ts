// import {network, ethers} from 'hardhat';
// import {ERC20__factory, MyOFT, OFTAdapter__factory} from '../../typechain';
// import {MessagingFeeStruct, SendParamStruct} from '../../typechain/src/Mon.sol/MyOFT';
// import {parseUnits} from 'ethers/lib/utils';

// const privateKey = process.env.DEPOLYER_KEY as string;


// const recieptant_privateKey = process.env.PRIVATE_KEY as string;

// const provider = ethers.provider;

// const destination_network = 'polygon';
// const destination_oft_contract = ethers.utils.hexZeroPad('0x6c4ef945552FAb67813dE5dbD497a33882E0cEc7', 32);

// const tokenAddress = '0xd59d5827262EbE4cCD262915136C95751d7ef935'

// const recieptant = ethers.utils.hexZeroPad('0x4ade31Ee6009cB35427afEb784B59E881a459225', 32);

// const amount = parseUnits('1', 18);
// const min_amount = parseUnits('0.99', 18);

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

// 		const recieptant__signer = new ethers.Wallet(recieptant_privateKey, provider);
// 		const recieptant_account = await recieptant__signer.getAddress();

// 		let balance = await signer.getBalance();
// 		console.log(`${network.name} address : ${account} with balance ${balance.toString()}`);

// 		balance = await recieptant__signer.getBalance();
// 		console.log(`${network.name} address : ${recieptant_account} with balance ${balance.toString()}`);

// 		const adapter_address = (await ethers.getContract('Adapter')).address;

// 		const adapter = OFTAdapter__factory.connect(adapter_address, signer);

// 		//approve before sending

// 		const token = ERC20__factory.connect(tokenAddress, signer);

// 		const allowance = await token.allowance(signer.address,adapter_address)

// 		console.log(`allowance : ${allowance}`);

// 		if(allowance.lt(amount)){
// 			const tx = await token.approve(adapter_address, amount);
// 			const res = await tx.wait();
// 			console.log('Approval successful',res.transactionHash);
// 		}

// 		const EID = getEID(destination_network);

// 		const send_params: SendParamStruct = {
// 			dstEid: EID,
// 			to: recieptant,
// 			amountLD: amount,
// 			minAmountLD: min_amount,
// 			extraOptions: '0x000301001101000000000000000000000000000186a0',
// 			composeMsg: ethers.utils.arrayify('0x'),
// 			oftCmd: ethers.utils.arrayify('0x'),
// 		};

// 		console.log({send_params})

// 		const fee = await adapter.quoteSend(send_params, false);

// 		console.log(`Fee : ${fee.toString()}`);

// 		const message_fee: MessagingFeeStruct = {
// 			nativeFee: fee[0],
// 			lzTokenFee: fee[1],
// 		};

// 		console.log({message_fee})

// 		// const gas = await adapter.estimateGas.send(send_params, message_fee, signer.address, {
// 		// 	value: message_fee.nativeFee,
// 		// });
// 		// console.log(`Gas cost : ${gas.toString()}`);

// 		// const tx = await adapter.send(send_params, message_fee, signer.address, {
// 		// 	gasLimit: gas,
// 		// 	gasPrice: await provider.getGasPrice(),
// 		// 	value: message_fee.nativeFee,
// 		// });
// 		// const res = await tx.wait();

// 		// console.log(`Transaction hash : ${res.transactionHash}`);
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
import dotenv from 'dotenv';
import {task} from 'hardhat/config';

dotenv.config();


import { abi as SUSDeOFTAdapterABI } from '../deployments/sepolia-testnet/SUSDeOFTAdapter.json';
import { abi as USDeOFTAdapterABI } from '../deployments/sepolia-testnet/USDeOFTAdapter.json';
import { abi as SUSDeOFTABI } from '../deployments/opbnb-testnet/SUSDeOFT.json';
import { abi as USDeOFTABI } from '../deployments/opbnb-testnet/USDeOFT.json';

import {Options} from '@layerzerolabs/lz-v2-utilities';
import {getNetworkNameForEid, types} from '@layerzerolabs/devtools-evm-hardhat';
import {EndpointId} from '@layerzerolabs/lz-definitions';
import {addressToBytes32} from '@layerzerolabs/lz-v2-utilities';
import {BigNumberish, BytesLike} from 'ethers';

// const OFTAdapterAbi = [
//     "function quoteSend(tuple(uint32 dstEid, bytes to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd), bool payInLzToken) view returns (tuple(uint256 nativeFee, uint256 lzTokenFee))",
//     "function send(tuple(uint32 dstEid, bytes to, uint256 amountLD, uint256 minAmountLD, bytes extraOptions, bytes composeMsg, bytes oftCmd), tuple(uint256 nativeFee, uint256 lzTokenFee), address payable refundAddress) payable returns (tuple(bytes32 guid, uint64 nonce), tuple(uint256 amountLD, uint256 amountSD))"
// ];

// const ERC20Abi = [
//     "function approve(address spender, uint256 amount) returns (bool)",
//     "function allowance(address owner, address spender) view returns (uint256)"
// ];

//const privateKey = process.env.PRIVATE_KEY as string;
//const recipientPrivateKey = process.env.PRIVATE_KEY as string;
//const rpcUrl = process.env.RPC_URL as string;
//const adapterAddress = process.env.ADAPTER_ADDRESS as string;

const privateKey = ""
const recipientPrivateKey = ""
const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/wmmPIFmPi700hZkT_QuBCKRvsCpvJ-J9" 

const destinationNetwork = 'opbnb';
const destinationOftContract = ethers.utils.hexZeroPad('0xA074Aa95C8C46501cD8077eDc67cf1E95C0C21BD', 32);

const usdeTokenAddress = '0xf805ce4F96e0EdD6f0b6cd4be22B34b92373d696';
const susdeTokenAddress = '0x1B6877c6Dac4b6De4c5817925DC40E2BfdAFc01b'


const USDeOFTAdapterAddress = "0x7dA8F2F7EF7760E086c2b862cdDeBEFa8d969aa2"
const bnbUSDeOFTAddress = "0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27"

const SUSDeOFTAdapterAddress = "0x661a059C390e9f4f8Ae581d09eF0Cea6ECc124A4"
const bnbSUSDeOFTAddress = "0x3a65168B746766066288B83417329a7F901b5569"

const recipient = ethers.utils.hexZeroPad('0x5e869af2Af006B538f9c6D231C31DE7cDB4153be', 32);
let options = Options.newOptions().addExecutorLzReceiveOption(65000, 0).toBytes();


// // Get the contract factories
// const oftDeployment = await deployments.get('MyOFT');


const amount = ethers.utils.parseUnits('1', 18);
const minAmount = ethers.utils.parseUnits('0.99', 18);

const getEID = (network: string): number => {
    const networkEIDs: { [key: string]: number } = {
        mainnet: 30101,
        avalanche: 40106,
        arbitrum: 30110,
        polygon: 30109
    };
    
    if (!(network in networkEIDs)) {
        throw new Error(`Unsupported network ${network}`);
    }
    return networkEIDs[network];
};

async function main() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const signer = new ethers.Wallet(privateKey, provider);
        const recipientSigner = new ethers.Wallet(recipientPrivateKey, provider);

        console.log(`Network address: ${await signer.getAddress()} with balance ${await signer.getBalance()}`);
        console.log(`Recipient address: ${await recipientSigner.getAddress()} with balance ${await recipientSigner.getBalance()}`);

        const adapter = new ethers.Contract(USDeOFTAdapterAddress, USDeOFTAdapterABI, signer);
        const token = new ethers.Contract(usdeTokenAddress, USDeOFTABI, signer);

        const allowance = await token.allowance(signer.address, USDeOFTAdapterAddress);
        console.log(`Allowance: ${allowance}`);

        if (allowance.lt(amount)) {
            const tx = await token.approve(USDeOFTAdapterAddress, amount);
            const receipt = await tx.wait();
            console.log('Approval successful', receipt.transactionHash);
        }

        let options = Options.newOptions().addExecutorLzReceiveOption(65000, 0).toBytes();
        const sendParams = {
            //dstEid: getEID(destinationNetwork),
            dstEid: EndpointId.OPBNB_V2_TESTNET,
            to: addressToBytes32(recipient),
            amountLD: amount,
            minAmountLD: amount,
            //extraOptions: '0x0003010011010000000000000000000000000000ea60',
            extraOptions: options,
            composeMsg: ethers.utils.arrayify('0x'),
            oftCmd: ethers.utils.arrayify('0x')
        };

        console.log('Send params:', sendParams);

        const feeQuote = await adapter.quoteSend(sendParams, false);
        const nativeFee = feeQuote.nativeFee;

        const messageFee = {
            nativeFee: feeQuote[0],
            lzTokenFee: feeQuote[1]
        };

        console.log('Message fee:', messageFee);

        // const tx = await adapter.send(
        //     sendParams,
        //     messageFee,
        //     signer.address,
        //     {
        //         value: messageFee.nativeFee,
        //         gasPrice: await provider.getGasPrice()
        //     }
        // );
        // const receipt = await tx.wait();

        //console.log('Transaction hash:', receipt.transactionHash);

        const r = await adapter.send(sendParams, {nativeFee: nativeFee, lzTokenFee: 0}, signer.address, {
            value: nativeFee,
           // gasLimit: 9000000
          });
        
        console.log(`Send tx initiated. See: https://testnet.layerzeroscan.com/tx/${r.hash}`);
    } catch (error) {
        console.error(error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });