export default class Krypto {

    private textEncoder: TextEncoder = new TextEncoder();
    private textDecoder: TextDecoder = new TextDecoder();
    private defaultIvLength = 12;
    private algorithmIdentifierName = "AES-GCM";

    public iv: Uint8Array = new Uint8Array;
    public encrypted: Promise<Uint8Array> | Uint8Array = new Uint8Array;

    generateIv(ivLength: number = this.defaultIvLength): Uint8Array{
        return crypto.getRandomValues(new Uint8Array(ivLength));
    }

    async encrypt(plaintext: string, key: CryptoKey, iv: Uint8Array = this.generateIv(this.defaultIvLength)){
        const encodedPlaintext = this.textEncoder.encode(plaintext);
        return {
            encrypted: await crypto.subtle.encrypt({ "name": this.algorithmIdentifierName, "iv": iv }, key, encodedPlaintext),
            iv: iv
        }
    }

    async decrypt(encryptedArrayBuffer: ArrayBuffer, iv: Uint8Array, key: CryptoKey){
        const decryptedArrayBuffer = await crypto.subtle.decrypt({ "name": "AES-GCM", "iv": iv }, key, encryptedArrayBuffer);
        return this.textDecoder.decode(decryptedArrayBuffer);
    }
}