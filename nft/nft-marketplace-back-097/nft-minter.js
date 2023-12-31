import {ethers, JsonRpcProvider} from 'ethers';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");

export async function mint(to, uri){
    const provider = new JsonRpcProvider(process.env.RPC);
    const signer = await provider.getSigner();
    const contractAddress = process.env.NFT;
    const abi = JSON.parse(fs.readFileSync("./abis/MyNFT.json"));
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.safeMint(to, uri);
    console.log(result.hash);
}

