# Docker Security


## Docker Socket Vulnerability
Let's assume we have a `docker-compose.yaml` file with some services. This file also loads a `.env` file into the context of one of those services. The risk comes in when one of your services has your machine's docker daemon socket mounted (as a bind mount). An attacker could get access to the `.env` file through the docker socket.

There are many ways an attacker can get access to the container running our application. An attacker can exploit a flaw in input validation to do RCE that causes the server to execute a command on your server e.g. `cat /etc/passwd`. If they can get your server to execute a command that start a reverse shell back to their machine, they'll have persistent terminal access inside our container. Here's how the attack workflow would happen:
- **Initial Compromise:** Attacker exploits RCE vulnerability in our application (e.g. a web service) and gets shell access to a vulnerable container.
- **Privilege Escalation:** The attacker realizes the container has the host machine's the docker socket mounted. They'll run the commands below:
```bash
# Check if the container is running a common package manager.
# Ideally it outputs: "/var/bin/apt", confirming that it has apt
which apt || which apk | which yum | which dnf || echo "No common package manager found"

# Install Docker inside the container
apt get update && apt-get install -y docker.io

# Allows us to see all host machine containers
docker ps

# Run new container with host files mounted.
docker run -it --privileged -v /:/host_root alpine chroot /host_root /bin/sh
```
Inside the vulnerable container we'd see all containers running on the host machine because the container we exec'd into has access to the machine's docker socket. We can then run another container that mounts the host machine's entire file tree into a folder called `/host_root`.

Run this new container, exec into it, and traverse to the `/host_root` folder. Now we'd be able to see all the folders in the host machine, giving us access to private information like the source code and of course those `.env` files from earlier. Then they can cause havoc by adding, modifying, or delete stuff.

## Docker Privileged Mode

### Unprivileged/Standard Mode 
When we run a standard Docker container, Docker drops risky Linux capabilities for the processes inside. The default set of capabilities is restricted, but still grants a reasonable amount of functionality. 
- `mount --rbind / /mnt/host`: This command requires the `CAP_SYS_ADMIN` capability, which is something a standard, non-privileged container won't have. This capability is necessary to perform system-wide admin tasks like mounting filesystems. As a result, we won't be able to mount the host machine's entire file tree inside our container.
- **Accessing Host Devices:** Even if the mount command worked, an unprivileged container wouldn't have access to host devices (like `/dev/sdo1`) or the ability to manipulate namespaces, which are necessary for escaping the container boundary.

When an attacker tries to run that command in an unprivileged container, they'll often get a permission denied error because the process lacks the necessary capabilities. However, if we set privileged mode things become a risk.

### Privileged Mode
When a container is started with `docker run --privileged ...`, Docker does two critical things:
- **Grants all capabilities:** It grants hte container all available Linux capabilities, including the powerful `CAP_SYS_ADMIN`. This allows the container to perform system administrative tasks, including using the mount command to remount filesystems.
- **Allows Device Access:** It gives the container access to all host devices (like disks, network interfaces, etc.)

If the attacker has a shell in a privileged container, we could have an attack like below:
- `mkdir -p /mnt/host`: Create a target directory in the container.
- `mount --rbind / /mnt/host`: Since the container has `CAP_SYS_ADMIN` due to running in privileged mode, this command ill work. It will mount the host's root filesystem (`/`) recursively into the container's `/mnt/host` directory.
- **Host Compromise:** The attacker cna now navigate to `/mnt/host` to read, write, and execute files as if they were on the host machine themselves.

## TLDR and Takeaway
Mounting the docker socket and running containers in privileged mode are two main ways a **Host Escape** can happen. 
- Docker Socket Mount: Gives the container root access to the Docker daemon.
- `--privileged` flag: Gives the container root access to the host's kernel and filesystem.

Avoid running a container in privileged mode or mounting the docker daemon socket. Only do it if you understand the consequences and have very secure code.

**Note:** A host escape is just a security exploit where a program breaks out of an isolated environment such as a virtual machine or container to access the host system. 

## Credits
- [How Hackers Can Escape Docker Containers - Better Stack](https://www.youtube.com/watch?v=giXlSlFLKwA)