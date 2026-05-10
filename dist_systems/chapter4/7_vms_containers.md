# Virtual Machines and Containers


## Virtual Machines (VMs)
A virtual environment that functions as a virtual computer with its own CPU, memory, network interface, and storage. It's created on a physical hardware system though. Software called the the **hypervisor** separates the hardware resources and distributes them appropriately so that they can be used by the VM.

VMs are isolated from the rest of the system, and multiple can exist on a single piece of hardware. They can also be migrated between servers depending on the demand or to use resources more efficiently.

### Explaining the Hypervisor
A Hypervisor isolates the OS and resources from VMs and allows us to create/manage VMs. The hypervisor treats resources like CPU, memory, and storage, as a pool of resources that can be easily reallocated between existing or new VMs.

### Why use VMs?
Most OSes and applications that are being deployed only use a small amount of physical resources. We can virtualize (logically separate) our system into multiple VMs, allowing us to have multiple separate servers on a physical server. Now we're actually using all of our physical resources efficiently. This is a lot better than trying to purchase another machine if you wanted two servers.

A VM is an isolated environment, so whatever running inside of it won't interfere with anything else running on the host hardware. This results in VMs being a good option for testing new applications or setting up a production environment.

## Containers
A container is a standard unit of software that packages up code and all its dependencies such as specific versions of runtimes and libraries. All in order for the software to run reliably from one computing environment to another. This allows container-based applications to be deployed easily and consistently, regardless of the target environment.

## Virtualization vs Containerization
In traditional virtualization, a hypervisor virtualizes physical hardware. The result is that each VM contains an OS, virtual copy of the hardware the OS needs to run, and an app and its associated libraries/dependencies.

Instead of virtualizing the hardware, containers virtualize the OS. Then each container contains only the application and dependencies, which makes containers much more lightweight than VMs. Containers will share the OS kernel and use a fraction of memory that VMs require.

