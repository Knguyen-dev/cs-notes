# Asymmetic Encryption:
- Asymmetric (public key) encryption: A crypotographic system that uses two keys for encryption and decryption. Both keys are mathematically related and are generated in pairs.
1. Public Key: Freely distrubted and is used to encrypt data. Anyone can use the public key to 
  encrypt a message, but only the holder of the related private key can decrypt the message.
  Public keys are often used for encryption because they can be shared openly and used 
  by anyone without compromising the security. It doesn't harm us if anyone can encrypt a 
  message and send it to us.
2. Private Key: Kept secret by the owner and is used to decrypt data that has been encrypted
  with the corresponding public key. Private keys should be kept secret as they're used to 
  decrypt sensitive information. It does harm us if the private key is leaked, as now anyone 
  could decrypt these private messages that were meant for us only!
3. Example: If Alice wants to send an secure message to Bob, she gets Bob's public key and 
  uses it to encrypt her message. Now the message can only be decrypted using Bob's private key!

# Setting up verified commits and GPG
- GPG: Software that makes use of asymmetric and symmetric key cryptography
  to encrypt and decrypt messages. Here we're going to use our GPG key 
  to sign/verify our commit to prove that we made the commit.


# Useful commands
- gpg --list-keys; lists the available gpg keys.
- gpg --full-generate-key; How to generate a gpg key.
  1. Use 'RSA and RSA' 
  2. Choose '4096 bits'. Higher the bits means higher security.
  3. Choose '1y'; it's always good practice to have the gpg key; You can
    always renew the key so that even if it does expire, you don't have 
    to go through the motions of creating an entire new key again.
  4. Now enter your real name, email, and comment. This is to just identify that
    it's your key. Though the comment isn't always necessary.
  5. Enter a passphrase. It should be something easy to remember, and you shouldn't have
    to look it up.
  6. To help the key generation, move your mouse around, type on the keyboard, or perform 
    random actions to help the key generate.
  7. Now we should have a key pair. We have 'pub' which is our public key, and then 'sub' which
    are our potential additional keys we could have associated with our primary key. 
- gpg --edit-key <email_linked_to_key>;  Use this to edit our key.
  1. You'll see 'sec', our key at index 0. Then 'ssb' which
    is a sub key, specifically 'key 1'. Do 'key 0' to select our first key.
  2. Do 'expire' to indicate we are changing the expiration date. Then select
    a new expiration date. 
  3. You'll need to do update 'key 1' to match the changes. Do 'key 1' and 'expire' and match
    the expiration date to the main key.
  4. After you've edited both keys and made sure they matched, 
    do 'save' to save the changes you made.
- gpg --passwd <email_linked_to_key>; Change the passphrase for all keys linked to said email.
  1. Enter your current passphrase.
  2. Then enter your new passphrase.
- gpg --output revoke-knguyensky.asc --gen-revoke <email_linked_to_key>; create revoke certificate. 
  1. Choose a reason for why you want to revoke your key.
  2. To revoke the keys associated with that email do 'gpg --import revoke-knguyensky.asc'
  3. Now doing 'gpg --list-keys' you'll see that your keys associated with that email
    were revoked.
  - NOTE: With modern versions of the software your revoke certificate is automatically create so you just need to do the import the certificate to revoke your keys. For me it's stored at AppData/roaming/gnupg/openpgp/..., so realistically you'll only need
  to manually create your keys on older versions.

# Backing up and restoring key pair and associated files.
- Just zip up the directory that stores the files. Literally go to appdata/gnup and 
  zip up that directory in somewhere else.

# Signing and Verifying Commits with GPG key pair:
1. gpg --full-generate-key; create your gpg key and follow said steps
2. git config --global user.signingkey <key_id>; set the public key id.
3. git config --global commit.gpgsign true; automatically sign when committing
4. git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"; Set the absolute path of gpg.exe and should fix a common issue saying 'secret key doesn't exist'
5. vscode settings -> type in 'gpg' -> Enable commit signing for git.
6. gpg --export --armor <key_id>; get the public key block and copy all of it, including 'starting with' and 'ending block' text.
7. Add new gpg key and put that block in. Now any commits you've signed with should show up as verified.

## Common errors:
- "gpg: can't connect to the keyboxd: IPC connect call failed;". Do the command below and then try committing again.
  ```
  gpgconf --kill gpg-agent
  ```



# Credits: 

1. Installing gpg on windows 10: https://www.youtube.com/watch?v=y_E4uQZh_C4 
- Download website: https://gnupg.org/download/
2. Creating and Managing GPG keys (intro): https://www.youtube.com/watch?v=1vVIpIvboSg
3. How to setup git config file with gpg: https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key#telling-git-about-your-gpg-key
4. Quickly setup gpg and vscode: https://www.youtube.com/watch?v=2ISu2KTPzuQ
5. Solves crucial issue with gpg on windows:https://stackoverflow.com/questions/36810467/git-commit-signing-failed-secret-key-not-available

