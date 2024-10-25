import CryptKey from "./Crypto/CryptKey.ts";
import Krypto from "./Crypto/Krypto.ts";

const Key = await new CryptKey().build("john");
console.log(Key)

const Encrypted = await new Krypto().encrypt("this is a super secrure thing hopefully", Key)
console.log(Encrypted)

const Decrypted = await new Krypto().decrypt(Encrypted.encrypted, Encrypted.iv, Key)
console.log(Decrypted)