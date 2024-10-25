# Krypto: A Simple Encryption and Decryption Library

A TypeScript library that provides a simple interface for encrypting and decrypting data using the Web Crypto API. It utilizes AES-GCM for encryption and PBKDF2 for key derivation from passwords, ensuring secure handling of sensitive information.

## Features

- **Secure Encryption**: Uses AES-GCM for authenticated encryption.
- **Key Derivation**: Generates cryptographic keys from passwords using PBKDF2 with a random salt.
- **Easy to Use**: Simple API for encrypting and decrypting strings.


```javascript
// Import the necessary classes
import CryptKey from "./Crypto/CryptKey.ts";
import Krypto from "./Crypto/Krypto.ts";

async function main() {
    // Step 1: Generate a cryptographic key from a password
    const password = "your_password"; // Replace with your password
    const key = await new CryptKey().build(password);
    console.log("Generated Key:", key);

    // Step 2: Encrypt a plaintext message
    const plaintext = "this is a super secure thing hopefully";
    const encryptedData = await new Krypto().encrypt(plaintext, key);
    console.log("Encrypted Data:", encryptedData);

    // Step 3: Decrypt the encrypted message
    const decryptedText = await new Krypto().decrypt(encryptedData.encrypted, encryptedData.iv, key);
    console.log("Decrypted Text:", decryptedText); // Output: "this is a super secure thing hopefully"
}

// Execute the main function
main().catch(console.error);
```