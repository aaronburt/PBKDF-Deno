export default class CryptKey {

    private salt: Uint8Array = crypto.getRandomValues(new Uint8Array(16));
    private iterations: number = 10000; 
    private hashAlgorithm = "SHA-256";
    private readonly textEncoder: TextEncoder = new TextEncoder();

    private algorithmIdentifierName = "PBKDF2";

  
    async build(password: string){
      const passwordKey = await this.derivePassword(password);
      return await this.deriveKey(passwordKey);
    }
  
    async derivePassword(password: string){
      return await crypto.subtle.importKey("raw", this.textEncoder.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
    }
  
    async deriveKey(passwordKey: CryptoKey){
      return await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: this.salt,
          iterations: this.iterations,
          hash: this.hashAlgorithm
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );    
    }
}