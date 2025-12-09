# Explaining Docker Swarm

Docker Swarm is Docker's native container orchestration solution. It takes a collection of individual machines running Docker and turns them into a single highly available cluster. This feature is built into the Docker Engine and is called **Swarm Mode**.

Manually deploying and managing containers on a single host creates a single point of failure. Swarm allows us to desire the desired state of our application (how many containers, which image, what network, etc.), and the Swarm handles the process of distributing, running, and managing those containers across all machines (nodes) in the cluster.

## How Docker Swarm Works
Think of a swarm as a cluster of computers. It consists of multiple nodes, each running the Docker daemon. There are two types of nodes:
- **Manager Node(s):** Performs all orchestration and cluster management. They're responsible for a lot of things:
  - Executing admin commands e.g. `docker service create`.
  - Maintaining the desired state of the swarm. 
  - Scheduling tasks (containers) to worker nodes.
  - Monitoring the health of all nodes via heart beats.
- **Worker Node(s):** These receive and execute tasks sent by the manager nodes. The worker node runs teh actual containers and report their current status back to the manager.

We must have at least one manager node for a given swarm. For production environments, it's common to have multiple managers for high availability and redundancy. If a primary manager fails, one of the others automatically gains control.

### What are services and tasks?
Swarm shifts the focus from managing individual containers to managing "services":
- **Service:** The definition of the tasks to execute on the manager or worker node. When we create a service, we specify which container image to use,  the network, ports, and the scale (number of replicas/instances of this service you want running). 
- **Task:** An individual instance of a container defined by a service. When a manager schedules a service, it creates one or more tasks under it, and assigns them to worker nodes. 

So a task is a container that we want to run, whilst a service is a group of containers.

### Built-in Networking and Load Balancing
Swarm mode has load balancing and service discovery built-in:
- **Ingress Routing Mesh (Load Balancing):** When we publish a service's port (e.g., `-p 80:80`), every node in that swarm will listen on that port, even if the container isn't running on that specific node. If a request hits a node that doesn't have a running task, the routing mesh forwards that request to a node that does. This provides a form of load balancing for all services.
- **Service Discovery:** Containers within the swarm can communicate with each other simply by using the service name (e.g., a "frontend" service can reach a "database" service by addressing it as `database`). The swarm's DNS service automatically resolves the service name to the correct IP address of the running tasks.

### Example 1: Practical Setup

#### Setting up Docker Swarm
```bash
# Initialize swarm (current host becomes the manager)
docker swarm init --listen-addr 10.0.0.4:2377

# On VM1: Let the current docker node join our swarm as a worker node
docker swarm join 10.0.0.4:2377

# On VM2: Now you should have one manager and 2 workers.
docker swarm join 10.0.0.4:2377
```
Every swarm must have one manager and the node that first initializes the swarm becomes the first manager. Then on other machines you can "join" the Docker Swarm, allowing your other Docker nodes to become worker nodes. 
```bash
# Create a service "cool_app" that spins up 10 tasks/containers 
# on the manager node. If not specified, it'll distribute the tasks across
# the nodes in the network.
docker service create --name cool_app --replicas 10 ping00 alpine ping docker-docker-swarm-00

# Lists all services that are running 
# NOTE: Only possible with manager node or on certain service conditions
docker service ls

# You'll see a single task that's running on swarm-02
# You can then ssh or connect to the machine running that node, and 
# you'll definitely see that you have a container running that pings.
docker service tasks ping00

# Create a service called "web"
docker service create --name web --replicas 3 -p 80:80 nginx
```
The swarm manages the individual containers for us on different docker nodes, forcing us to handle higher level abstractions, services. Again a service is just "I want to run this container (maybe multiple instances/replicas of it), but I'll let the swarm create and manage those instances for me". It's just a declaration/definition to create/manage one or more instances of a container, and optionally we can define environment variables, networks, volumes, and other things. We create a service called `web`, which is just a group of 3 containers, each one running Nginx. Swarm mode handles balancing traffic between these 3 containers. Assume that the 3 containers are all running on `swarm-02` (this is the third node in our swarm since we do zero indexing). 

#### Load Balancing with Swarm
Even if we're on the `swarm-01` (node 1) machine, we'd still be able to access/see our instances running on `swarm-02`. Also, when `swarm-01` gets a request, the Swarm itself knows that `swarm-01` isn't running any tasks/containers so it can't handle the request. Instead it forwards the request to `swarm-02` to handle the request. In a production environment, you'd have your domain name pointing at your load balancer. The load balancer would distribute requests across your swarm nodes, knowing that the swarm will take care of re-routing the request to the correct node. However let's say that a node goes down. All swarm nodes are sending heart-beats to the manager, which implies the manager will know when a node goes down. Therefore, the swarm manager will create and allocate new replicas to offset the ones that went down got shut down since the node shut down.

#### Service Visibility and Modes
In Docker Swarm, the visibility and distribution of services across our cluster depend on the **service mode** we choose. 
```bash

# Creates service; default replica count is 1
sudo docker service create --name helloworld alpine ping docker.co
```
When we create a service without specifying a mode, it defaults to the **replicated** mode. The manager schedules the task (container) onto one worker node. Since it's only a single task, it's not going to run on every node in our cluster, just one. Worker nodes can't see the full list of services or managed tasks in the cluster, only the manager node can use commands like `docker service ls` and `docker service tasks helloworld`. The manager node will see this service listed when running `docker service ls`. The worker node running the container will only see the container itself (via `docker ps`) and won't see the service definition via `docker service ls`.
```bash
sudo docker service create --name helloworld1 --mode global alpine ping docker.com
```
In global mode, every worker node in the cluster runs exactly one task for that service. The above command creates the `helloworld1` service and ensure sone task of this service is scheduled on every worker node. All nodes will now run a container for this service. If a new node joins the swarm, the manager automatically schedules a new task for `helloworld1` to run on that new node.

###  Example 2: Deploying a Stack (`stack.yaml`)
Instead of running multiple commands to deploy different services in our app, we can deploy the entire stack using `docker stack deploy`. This command accepts a `.yaml` that you're supposed to setup like a docker compose file. Have your docker engine running in swarm mode. Then we'll setup a docker registry. A swarm consists of multiple docker engines, and a registry is required to distribute images to all of them. After you set it up, you create your application of course. Then the main thing is setting up your docker compose file. Let's say we have a compose file for our docker swarm called `stack.yaml`:
```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - 80:80 # Map port 80 of the container to port 80 on swarm nodes
    
    ##### Swarm Specific Configurations #####
    # NOTE: Only applies/activates when we're running docker swarm. 
    # These configs won't activate if you're not in Swarm mode.
    deploy:
      replicas: 3 # How many instances/tasks of this service should run.
      restart_policy:
        condition: on-failure # Only restart if the container exists with a non-zero code.
        delay: 5s
        max_attempts: 3
        window: 120s # Wait for 120 seconds before declaring a successful restart.
      
      # Placement (Optional): Define which nodes the service can run on.
      # Only deploy this service on worker nodes.
      placement:
        constraints:
          - node.role == worker
    
    ##### Resources (Optional): Limit CPU/Memory #####
    resources:
      limits:
        cpus: '0.50'
        memory: 128M
      reservations:
        memory: 64M
  
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password123
    
    ##### Swarm specific configurations for our database #####
    deploy:
      # Databases typically need one instance. Just an example though in
      # production you'd probably use dedicated storage nodes.
      replicas: 1 
      placement:
        constraints:
          - node.role == manager
      restart_policy:
        condition: any # always try to restart if it stops for any reason

# Define an isolated network for the services to communicate. Overlay
# networks are required for Docker Swarm communication.
networks:
  default:
    driver: overlay
```
The crucial additions for Swarm deployment are found under the `deploy` key within each service. Here are some explanations of other keys:
- `replicas`: This defines the desired number of tasks (container instances) that the Swarm will maintain for that service. Swarm will automatically scale the service up or down to meet this count.
- `restart_policy`: Controls if and how a service task should be restarted if it fails or stops. Setting it to `on-failure` is common.
- `placement`: Allows us to set constraints that determine which nodes in the Swarm are eligible to run the service. This is often used to target specific node roles e.g. `manager`, `worker`, or nodes with specific labels.
- `resources`: Allows you to set CPU and memory limits, and guarantees for yours tasks. This helps ensure stability and resource allocation across the cluster.
- `networks`: By default, Swarm uses an `overlay` network which allows containers on different nodes in the Swarm to communicate with each other securely.

### Example 3: Another `stack.yaml`
When you're docker node is in swarm mode, you'll use `docker stack`
1. Setup Docker registry
2. Create application.
3. Setup `stack.yaml`
```yaml
version: "3.8"

# Creates "caddy" overlay network, which is needed for caddy to work.
networks:
  caddy:
    driver: overlay
    attachable: true

services:
  # 1. Caddy image exposing docker socket in bind mount and 
  # a volume (for TLS stuff).
  caddy:
    image: lucaslorentz/caddy-docker-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - caddy_data:/data
    environment:
      - CADDY_INGRESS_NETWORKS=js2-gateway-stack_caddy
    networks:
      - caddy

    ##### Swarm Specific Configurations #####
    # Attempt to restart caddy when it fails.
    deploy:
      restart_policy:
        condition: on-failure

  # 2. Our application 
  app:
    # Read the latest GHCR image of this application.
    image: ghcr.io/geochemical-modeling/js2-gateway:latest
    env_file:
      - .env

    ##### Swarm Specific Configurations #####
    deploy:
      replicas: 1 # One instance/task

      # TODO: Don't know these
      update_config:
        parallelism: 2 
        delay: 10s      
        order: start-first

      # Seems like good practice to do this always?
      restart_policy:
        condition: on-failure

      # Labels that allow caddy to reverse proxy? that link and port must be important?
      # The third link allows watchtower to watch this service for image updates and auto-restart
      labels:
        caddy: js2-gateway.ear180013.projects.jetstream-cloud.org
        caddy.reverse_proxy: "{{upstreams 8000}}"
        com.centurylinklabs.watchtower.enable: "true"

    # Don't know what hte healthcheck thing is in docker. I don't remember what it bas but I don't 
    # think it's specific to swarm.
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000"]
      interval: 10s
      timeout: 5s
      retries: 3
    networks:
      - caddy

  # 3. WatchTower Service
  watchtower:
    image: containrrr/watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --interval 300 --cleanup --include-stopped --revive-stopped --label-enable --monitor-only
    environment:
      - WATCHTOWER_NO_STARTUP_MESSAGE=true
      - WATCHTOWER_DEBUG=false
    networks: # within our caddy network
      - caddy

    ##### Docker Swarm Configurations #####
    deploy:
      restart_policy:
        condition: on-failure
      labels:
        - "com.centurylinklabs.watchtower.enable=true"
volumes:
  caddy_data:
```

#### 1. Networking
```YAML
networks:
  caddy:
    driver: overlay
    attachable: true
```
Correctly defines a custom overlay network for inter-service communication.
- `driver: overlay`: Required for swarm. An overlay network spans all nodes in the Swarm, allowing containers on different machines to communicate with each other seamlessly. (key for routing mesh).
- `attachable: true`: This is needed so that standalone containers (like management tools) can also be explicitly attached to this network. For the services deployed in the stack, this isn't strictly necessary.

#### 2. Service Deployment Configuration
The `deploy` block is specific to Docker Swarm Mode. It tells the Swarm manager how to deploy and maintain this service. **For the `app` service:**
```YAML
deploy:
  replicas: 1 
  update_config:
    parallelism: 2 
    delay: 10s      
    order: start-first
```
- `replicas: 1`: Specifies the scale of the service. The Swarm 
- `update_config`: Defines the rollout strategy when we update the service image or configs (using `docker stack deploy -c stack.yaml mystack`).
  - `parallelism: 2`: The number of tasks/containers that the swarm should update at the same time. Setting this to 2 means it'll update wto replicas simultaneously. Since we only have one replica, this setting has no effect.
  - `delay: 10s`: The time delay the Swarm waits between updating one group of tasks/replicas and the next.
  - `order: start-first`: Defines the update strategy. The Swarm will start the new task before stopping the old task. This ensures zero downtime during updates. The alternative is `stop-first`.

  **All Services**
  ```YAML
  restart_policy:
    condition: on-failure
  ```
  - `condition: on-failure`: Tells the Swarm Manager to restart the task if its container exits with a non-zero exit code (an error). This is the foundation of Swarm's self-healing capability and is indeed good practice for resilience.

#### 3. Caddy/WatchTower Service Labels
```YAML
# app service labels:
labels:
  caddy: js2-gateway.ear180013.projects.jetstream-cloud.org
  caddy.reverse_proxy: "{{upstreams 8000}}"
  com.centurylinklabs.watchtower.enable: "true"
```
The labels are metadata. In this stack, labels are used as configuration instructions for other services to read them (the Caddy reverse proxy and the Watchtower image updater). Let's talk about the **Caddy Labels (Service Discovery):**
- `caddy: <hostname>`: This label tells the running Caddy container to configure itself to accept requests for that specific hostname (`js2-gateway.ear180013...`).
- `caddy.reverse_proxy: "{{upstream 8000}}"`: Tells Caddy where to route those requests. `{{upstream 8000}}` is a Caddy-specific placeholder that resolves to the internal IP address of our `app` service's tasks on port 8000. In short, a request to the hostname is reverse proxied by Caddy to the `app` service running on its internal port 8000.

**Watchtower Label**
- `com.centurylinklabs.watchtower.enable: "true"`: This label tells the Watchtower container to monitor this specific service (app) for image updates. Watchtower will only check services that have this label enabled.

#### 4. Healthcheck Configuration
```YAML
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000"]
  interval: 10s
  timeout: 5s
  retries: 3
```
Healthcheck allows the Docker daemon (and therefore Swarm Manager) to determine if a container is actually ready to serve traffic, not just that it started.
- `test: ["CMD", "curl", "-f", "http://localhost:8000"]`: The command run inside the container to check its health. It attempts to access the application's internal web server on port 8000.
- **How Swarm Uses It:** The Swarm Manager uses the result of this health check to decide whether a task is healthy or not. If a task becomes unhealthy, the manager will often stop that task and try to reschedule a new one.

#### 5. Watchtower Command
```YAML
command: --interval 300 --cleanup --include-stopped --revive-stopped --label-enable --monitor-only
```
This is the list of arguments that are passed to the watchtower executable when the container starts. They configure how often it polls for new images (here it's 300 seconds) and ho it handles updates. The `--label-enable` forces Watchtower to only monitor the services with `watchtower.enable=true` label. This is located on the `app` service.

## Why Use Swarm? (Key Benefits)
It addresses some limitations of running isolated Docker containers:
- **High Availability and Self Healing:** The Swarm constantly monitors the number of running tasks for each service. If a node fails (stops sending a heartbeat) or an individual container crashes, the manager node immediately detects the failure and tries to correct it by adding replacement tasks. All in order to maintain the desired replica count.
- **Zero-Downtime Rollbacks:** Services can be easily updated (`docker service update`) and if an update fails or is bad, we can quickly roll back the service to a previous version (`docker service rollback`).
- **Special Deployments:** It lets you configure zero-downtime deployments like blue-green deployments. It also provides health checks.

### When to use Swarm Mode?
- **Simple Container Orchestration:** When you want to go beyond a single-host container setup but find Kubernetes too complex or resource intensive. Swarm is a lightweight, native to Docker, and a little more familiar and simpler than K8s.
- **Built in Features:** When you need load balancing, fault tolerance, rollbacks, and special deployments without using external or advanced tools. 

## Credits
- [Docker Swarm Tutorial](https://www.youtube.com/watch?v=KC4Ad1DS8xU)
- [Docker Swarm: A more technical introduction](https://www.youtube.com/watch?v=Tm0Q5zr3FL4)
- [Docker Swarm Docs](https://docs.docker.com/engine/swarm/)
- [Docker Swarm Stack Deployment Docs](https://docs.docker.com/engine/swarm/stack-deploy/)