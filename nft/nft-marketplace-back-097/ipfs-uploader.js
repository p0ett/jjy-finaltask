import { create } from 'kubo-rpc-client';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config("./.env");

const ipfs = create(new URL(process.env.IPFS_URL))

export async function uploadFileToIPFS(filePath) {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add({ path: filePath, content: file });
    return result;
}

export async function uploadJSONToIPFS(json) {
    const result = await ipfs.add(JSON.stringify(json));
    return result;
}
