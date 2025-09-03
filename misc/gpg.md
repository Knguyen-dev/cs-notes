# GPG Notes

GPG is software that makes use of asymmetric and symmetric key cryptography to encrypt and decrypt messages. Here we're going to use our GPG key to sign/verify our commit to prove that we made the commit. Here's the motivation and general workflow of how it's going to work:
1. On our computer we're going to generate a GPG key pair, a public and private key.
2. We'll give the public key to GitHub, and we'll keep the private key on our local machine.
3. When commits are signed, they are signed with the private key. We then push the commits to GitHub.
4. GitHub will check the signature using the public key we gave it. Since the signature came from the corresponding private key, the commit is marked as "verified".

## How Signing and Verification Works 
When we sign a commit, Git generates a unique signature string using our GPG private key based on the commit's contents. This includes stuff like the commit message, author, and tree hash (commit hash). The signature is then appended to the commit object itself. When you push a signed commit to GitHub, it performs a check. GitHub looks like the GPG signature embedded within the commit object. It then uses the public key you've uploaded to your account to decrypt this signature. If the signature successfully decrypts it, then the commit is verified.

## How to Setup GPG Key pair
Here's how to setup a GPG Key Pair:
1. `gpg --full-generate-key`: Starts key generation process.
2. Use 'RSA and RSA' 
3. Choose '4096 bits'. Higher the bits means higher security.
4. Choose '1y'; it's always good practice to have the gpg key. You can always renew the key so that even if it does expire, you don't have to go through the motions of creating an entire new key again.
5. Now enter your real name, email, and comment. This is to just identify that it's your key. Though the comment isn't always necessary.
6. Enter a passphrase. If you're signing with this gpg key, Git will prompt this passphrase every time. This is another layer of protection to make sure other people can't use your key. It should be something easy to remember, and you shouldn't have to look it up since you're going to be committing a lot. 
  a. To help the key generation, move your mouse around, type on the keyboard, or perform random actions to help the key generate.
7. Now we should have a key pair. We have 'pub' which is our public key, and then 'sub' which are our potential additional keys we could have associated with our primary key. 

## Updating GPG Keys
- Edit Key: `gpg --edit-key <email_linked_to_key>`
- Update Passphrase: `gpg --passwd <email_linked_to_key>`
- List All Active Keys: `gpg --list-keys`
- `gpg --output revoke-knguyensky.asc --gen-revoke <email_linked_to_key>`; create revoke certificate. 
  1. Choose a reason for why you want to revoke your key.
  2. To revoke the keys associated with that email do `gpg --import revoke-knguyensky.asc`
  3. Now doing `gpg --list-keys` you'll see that your keys associated with that email
    were revoked.
  - **NOTE:** With modern versions of the software your revoke certificate is automatically create so you just need to do the import the certificate to revoke your keys. For me it's stored at `AppData/roaming/gnupg/openpgp/...`, so realistically you'll only need
  to manually create your keys on older versions.

## Exporting Key Pair
If you're moving to a new PC and want to continue using the same GPG key pair to sign commits, you'll need to export your keys from your old machine and import them to the new one. Now typically, a person only needs to move the private key to their new computer signing because remember that the public key is on GitHub and it's used for verification rather than signing. However, it's always a good idea to have a backup. You'll need the key ID of the key you want to export. We can find it with `gpg --list-secret-keys --keyid-format LONG`.

1. **Export the private key:** Use the `--armor` flag to export the key in ASCII-armored format, which is just a plain text representation. Then use `--export-secret-keys`, which is specifically for exporting the private key.
```bash

gpg --output my_private_key.asc --armor --export-secret-keys <key-ID>

# Or similarly
gpg --armor --export-secret-keys <fingerprint> > my_private_key.asc

```
2. **Export the public key:** This command exports the public key. Whilst not strictly necessary for signing commits on a new machine, it's good practice to have a backup.
```bash
gpg --output my_public_key.asc --armor --export <key-ID>

# Or similarly
gpg --armor <fingerprint> > my_public_key.asc
```
3. **Transferring the Key:** Honestly you can use a usb drive, or just copy the files over to your machine via some other method. 
4. **Importing the keys on the new computer:** Once you have the files on your new machine, use the `gpg --import command` to add them to your GPG keychain.
```bash
gpg --import <private_key_file>
gpg --import <public_key_file>
```

## Setting Up Commit Signing 
1. `gpg --full-generate-key`: Create your gpg key and follow the steps.
2. `git config --global user.signingkey <key_id>`: Set the put the ID of the key here. Every key pair has a short key id that's associated with the public and private key. 
3. `git config --global commit.gpgsign true`: Automatically sign when committing.
4. `git config --global gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"`: Set the absolute path of gpg.exe and should fix a common issue saying 'secret key doesn't exist'
5. VSCode settings -> type in 'gpg' -> Enable commit signing for git.
6. `gpg --export --armor <key_id>`: get the public key block and copy all of it, including 'starting with' and 'ending block' text.
7. Add new gpg key and put that block in. Now any commits you've signed with should show up as verified.

## Common errors:
```bash
# "gpg: can't connect to the keyboxd: IPC connect call failed" - Do the command below and then try committing again.
gpgconf --kill gpg-agent

# "gpg: error opening key DB: No Keybox daemon running" - Do the command below and then try to commit.
gpgconf --launch gpg-agent
```

## Credits: 
- [Creating and Managing GPG keys (intro)](https://www.youtube.com/watch?v=1vVIpIvboSg)
- [Installing gpg on windows 10](https://www.youtube.com/watch?v=y_E4uQZh_C4 )
- [How to setup git config file with GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification/)
- [Signing a Commit via GPG in VSCode](https://www.youtube.com/watch?v=2ISu2KTPzuQ)
- [Solves crucial issue with gpg on windows](https://stackoverflow.com/questions/36810467/git-commit-signing-failed-secret-key-not-available)
