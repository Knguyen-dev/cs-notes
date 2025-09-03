# Secure Shell (SSH) Protocol

## What is SSH?
A method for securely sending commands to a computer over an unsecure network. SSH is often used for controlling servers remoting, managing infrastructure, and transferring files. An analogy could be how a store owner may email and instruct their employees from afar to ensure the store runs well when they're gone. In the same vein, SSH allows admins to manage servers and devices remotely.
  - **Note:** Telnet is an older remote management protocol, but it's not used anymore because it's not secure. The commands the admins send can be seen by other people.
---
### What SSH does
- **Remote encrypted connection:** SSH can be used to setup a secure and encrypted connection between you and a remote machine. Even if someone does gets the data, it's literally encrypted, so they're not going to be able to do anything useful.
- **Tunneling:** Allows for tunneling/port forwarding. You know how tunnels are a way to cross terrain or boundaries that you can't normally cross right? In networking, tunnels are just a way to transport data across a network, using protocols that aren't supported by that network. We're moving packets across a network using a protocol or path that we wouldn't be able to normally use. To get technical, we wrap our data packets with additional info called "headers" (adding headers to packets?), which influences the destination they're routed to. Then we use a technique called _port forwarding_ to send those packets from one machine to the other.

---
### How it works?
Built on top of the TCP/IP protocol suite. So that's how it's sending packets, as opposed to using UDP. 
Assume you want to remote SSH into a server:

1. Give the server your public key. This public key is now stored in `~/.ssh/authorized_keys` on the server.
2. The server now creates a long string/number, which is typically called a "random challenge" or "nonce". They encrypt this challenge with your public key. Then they send to back to you. 
3. The only way someone can decrypt this nonce is if they have your private key, and you're the only person that has that. You use your private key to decrypt the nonce, and send it back to the server.
4. This proves to the server that you own the private key that matches the public key you gave to the server. The connection is now established and essentially we can  generate a shared session key for encrypting and decrypting each other's data across this encrypted connection. 

---
### Security
Let's talk about Public Key Cryptography (PKC) and authentication. SSH uses PKC to encrypt data, and also for authentication. 

In an SSH connection, both sides will have their own public/private key pair, and they're going to authenticate each other by using these keys.

This is probably different to how you're familiar with PKC, as with HTTPS, you'd use PKC to verify the identity of the web server. 

PKC authenticates connected devices, meaning your client is going to verify the server's public key to see if you're connecting to the correct machine. And the server may also check your public key (if using SSH key-based auth) to confirm that your device is allowed to connect.
 
However, even though the computers trust each other, the server still needs to know who's trying to login. So you'll typically need to input a username and password. 

On successful login, the user would be able to execute commands on the remote machine as if they were using their local machine.

---
### SSH port forwarding (tunneling) explained
For Bob to send a message to Dave, he first sends the message to Alice, and then Alice sends it to Dave.

You're using in-between computers to send data. Imagine you want to remotely make changes to a server B, which is in a private network.

However server B only receives network packets from other computer within the private network. You're not going to be able to directly remote SSH connect to server B. However, you notice that server A is in the private network, and you're able to remotely connect to A. So if you remote SSH to A, using A you can then do remote SSH again to connect to server B. Now you have access to server B since you did it through server A.

## SSH Practicals
An SSH key pair consists of a public and private key:
- **Private Key:** Kept this secret. It's typically stored in a file named `id_rsa` or `id_ed25529` (depending on the algorithm used) with in a hidden directory on your home folder called `.ssh`.
- **Public Key:** You can safely share this with remote servers or services like GitHub. It's used by the server to verify that you are who you say you are. It's stored in a file with the same name as the private key but with a `.pub` extension (e.g. `id_rsa.pub`).

### Setting Up SSH Key with Git and GitHub
1. **Generate a new key pair:** Use the `ssh-keygen` command in your terminal. For modern systems, it's recommended to use the Ed25519 algorithm. The command below will generate two files, the `id_ed25519` (the private key) and `id_ed25519.pub` (public key), and save them into the `.ssh` directory. It's best practice to have a passphrase to protect your private key. 
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
2. **Add your public key to GitHub:** Log in to your GitHub account, go to ***Settings > SSH and GPG keys***, and click ***New SSH key***. Copy the entire contents of your `id_ed25519.pub` file and paste it into the key field. Give it a descriptive title, like "Personal Laptop".
```bash

# Optional: Install xclip and install like this
sudo apt install xclip
xclip -selection clipboard < personal_asus_vivobook.pub
```

3. **Configure Git to use SSH:** Once the public key is on GitHub, you can now clone repositories via SSH instead of HTTPS.

```bash

# Edit (or create) your SSH config file
vim ~/.ssh/config

# Configure GitHub and Git to use a specific private key for authentication.
# - Host: Nickname for host. For standard use "github.com" is good, but you can name it anything. 
# - HostName: The actual address to the server.
# - User: Always "git" for GitHub SSH.
# - IdentityFile The fully path to the private key we want to use
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/personal_asus_vivobook

# Then test your connection
ssh -T git@github.com
```

### Setting Up SSH Key with remote servers
Imagine you have permission to SSH into a remote server. You want other people to access the same server remotely through SSH. Here's what you do:

1. **Add their public ssh key:** On the server, each user has a `.ssh` directory in their home folder. The file `authorized_keys` will contain all public keys that are allowed to log in as that user. 

```bash
# In the ~/.ssh/config:
# Original Setup
Host jet_stream
  HostName 149.165.154.118
  User exouser
  # IdentityFile ~/.ssh/kevin_jskey
  IdentityFile ~/.ssh/personal_asus_vivobook

# Now on terminal, confirm the new setup works with the old school ssh connection command
ssh jet_stream

# Or equivalently, connecting to <user>:<server_ip> with "personal_asus_vivobook" as my private key
ssh -i ~/.ssh/personal_asus_vivobook exouser@149.165.154.118
```

2. Done. Now be careful because if the developer is running WSL2 on a Windows machine, be aware of what config file and `.ssh` directory is currently being used. If you're using the VSCode Remote SSH extension, note that it by default uses the stuff from Windows
```bash
# Checks what we're running
ssh -v [myhost]
```

### Why Use SSH for Cloning? 
When you use HTTPS, you're typically prompted for credentials. While Git credential helpers can store this for us, they aren't as secure as an SSH key. It's a lot harder to do stuff with a passphrase protected SSH key than it is to steal a password or personal access token. That's the main appeal, eliminating the need to repeatedly enter your GitHub username and password, or PAT for every push, pull, or fetch operation. Once an SSH key is setup on your local machine and added to GitHub, all your actions are automatically authenticated behind the scenes.

SSH keys are also standard when you want to automate a task on a remote server. For example, if you have a deployment script that needs to pull the latest code from GitHub, we can't have it being stopped from a password prompt. Using an SSH key pair would authenticate those actions automatically, and make this process completely automated.

## Credits: 
- [Learn SSH - CloudFlare](https://www.cloudflare.com/learning/access-management/what-is-ssh/)