# GitOps Explained
While CI/CD pipelines automate the building and initial deployment steps, they can fall short when the infrastructure or configurations surrounding the application needs to be changed. For example, pretend we're working on an application and have setup a straightforward image-detection based deployment workflow:
- **Changes are Pushed:** Code changes are pushed to the main branch of a repository.
- **CI/CD Pipeline Runs:** The pipeline builds the container image and pushes it to a container registry (e.g., GHCR, Docker Hub, GCR).
- **Server Detects and Deploys:** A service on the server (e.g., WatchTower) monitors the container registry. When it detects a new version of the application image, it pulls the image and initiates a redeployment of the application container.

It's a decent automated setup for the application itself, but limitations surface when we introduce changes to the application's configurations or infrastructure components that are not the application's main image. For example, imagine we have a Python web app defined in a `docker-compose.yaml` file.
- If we update the Python code, the application image changes, the pipeline runs, and WatchTower correctly triggers a redeploy (success).
- What if you decide to add a new service, like a PostgreSQL database or a Redis cache, to your `docker-compose.yaml`?

In the second scenario, the application's container image didn't change. The CI/CD pipeline, which is primarily focused on building that image, finishes, and WatchTower service doesn't find the new image tag for our application. The new PostgreSQL and Redis containers are never deployed. The configuration (the `docker-compose.yaml` file) changed, but the deployment mechanism only reacts to an application code change (more specifically an image change). We need a way for any significant change to trigger a deployment, not just image updates.

## What is GitOps?
GitOps is a set of principles and practices that use Git as a single source of truth for declarative infrastructure and application configuration. It's a way of implementing Continuous Delivery, where all changes in a system from application code to infrastructure and configs are expressed as code and stored in Git. This is often summarized by some core principles:
- **Declarative Configuration:** The entire desired state of the system (our application, its environment, networking, etc.) is described in a declarative manner (e.g., using YAML, Docker Compose files, Kubernetes manifests).
- **Versioned and Stored in Git:** This declarative state is stored in a Git repository, and Git is the single source of truth. All changes are made via pull requests and other actions that change the contents of the Git repo.
- **Automatically Applied:** Approved changes to the Git repository are automatically applied to the environment.
- **Continuously Reconciled:** A software agent (a controller or operator) continuously observes the actual state of the system and compares it to the desired state defined in git. If there's a drift, the agent automatically takes action to bring the actual state of the system in line with the Git state.

### Identifying a GitOps System
A deployment system is using GitOps if it meets two key criteria:
- **Git is the source of truth:** All environment changes originate from a pull request merged into the configuration repository.
- **Automatic Reconciliation:** A process is actively running that observes the state in Git and automatically enforces that state in the running environment. Directly logging into the server to pull the image or code, and manually running a redeployment script is NOT GitOps! That's manual deployments, GitOps is supposed to be automatic.  

### The Benefits of GitOps
It solves the configuration blind spot issue and offers some advantages:
- **Audit Trails and Rollbacks:** Since Git is the source of truth, every change is the result of a commit. We get automatic audit logs through commit history, and can instantly rollback to a working state by reverting to a previously stable commit.
- **Faster Deployments:** The reconciliation process is continuously monitoring, leading to faster deployments once a commit is merged. Also it's just convenient.
- **Enhanced Security:** Only the automated controller/agent has the rights to mess with the production environment. Only in special circumstances that a person will actually need to log into the server manually to fix things, reducing human error and the chance of people messing things up.
- **Consistency:** Again the system ensures teh running infrastructure matches the configuration defined in Git, eliminating configuration drift.

## How to Implement GitOps
Implementing GitOps involves establishing the "reconciliating agent" that bridges the gap between the Git repository (the desired state) and the environment (the actual state).

### Approach 1: Webhooks for Simple Systems
This is an improvement from the WatchTower approach for smaller, simpler setups that was shown in our initial docker-compose example. Instead of polling the image registry, setup a webhook on our configuration repository (the repo containing `docker-compose.yaml`). When a PR is merged to the main branch of the repo, the Git service (GitHub/GitLab) sends a POST request (a webhook) to a small service running on our server. This service receives the hook and is responsible for redeploying the application e.g. running `git pull & docker-compose up -d`. It's  simple and solves the problem of detecting configuration changes. However, this isn't truly reconciliatory as this is a "push" model meaning it only redeploys on code change. If someone manually deletes a container, the system won't fix it until the next code push.

### Approach 2: GitOps Controller for Docker Compose
This is more hypothetical, but it's a custom-built solution that attempts to apply the reconciliation principle to Docker Compose. An agent on the server would continuously polls the configuration repository for new commits or changes (e.g. every 5 minutes). If it detects a new commit in the `main` branch, it pulls the latest repository contents and executes a deployment script. 

It's closer to the true GitOps reconciliation than webhooks, as it fixes configuration drift. However you'll need to write and maintain a custom agent/script. Docker-compose isn't inherently reconcilable like Kubernetes.

### Approach 3: Kubernetes + Dedicated GitOps Controllers
This is the gold standard for serious or enterprise applications and the environment where GitOps originated. It uses a declarative platform (Kubernetes) with dedicated open source controllers:
- **Platform:** Kubernetes (K8s) is the underlying platform. Its manifests (YAML files) are the declarative configuration.
- **Controllers:** It then uses controllers like ArgoCD or Flux as GitOps controllers.

The controller is installed inside the Kubernetes cluster and is configured to monitor a Git repository of Kubernetes manifests. Here's the workflow:
1. A developer merges a PR with new K8s manifests (e.g. a new deployment for a Redis container).
2. The ArgoCD/Flux controller running in the cluster continuously polls the Git repository.
3. The controller detects the change, compares the new manifests (the desired state) with the running cluster resources (the actual state).
4. It automatically executes teh Kubernetes API calls to create the new Redis deployment and reconciles the state.

### Example 1: Basic GitOps Setup
For small-to-medium Docker-Compose applications, a practical GitOps approach could be to trigger redeployment using webhooks. This ensures every deployment originates from a commit to our configuration repository.

#### 1. Two Repo Setup
We strictly adhere to the GitOps principle by maintaining separate repositories for code and configuration:
- `app-code-repo`: Contains application code, `Dockerfile`. In the CI/CD pipeline, we build the image and push it to a container registry (e.g., `my-app:v1.2.1`).
- `app-config-repo`: The `docker-compose.yaml` file is here. All deployments are triggered by commits here, this is the single source of truth.

#### 2. Server Side Script
A script would live in the production server that applies our new desired state that we defined in Git:
```bash
#!/bin/bash
set -e

# 1. Navigate to the directory containing the config repo
CONFIG_DIR="/opt/app-config"
cd $CONFIG_DIR

# 2. Pull the latest configuration from Git
echo "Fetching latest state from config-repo..."
git pull origin main

# 3. Apply the changes
# Pulls the images specified in the updated docker-compose.yaml
docker compose pull

# Recreates/starts containers based on the current docker-compose.yaml state
# -d detaches (runs in background)
echo "Applying new desired state..."
docker compose up -d

echo "Deployment complete."
```
#### 3. Deployment Flow: Two Triggers, One Mechanism
Both types of changes are now funneled through a single mechanism: a commit to the `app-config-repo`.

**Trigger 1: Configuration Change (Adding Redis, changing ports)**
This is a direct configuration update that must be reflected in the environment.
1. A developer edits the `docker-compose.yaml` (in `app-config-repo`) to add the Redis service.
2. The developer commits and pushes the change to the `main` branch.
3. GitHub/GitLab detects the push and fires an HTTP POST request (the webhook) to the server.
4. The listener (e.g. simple custom webhook listener) receives the hook and executes the `redeploy.sh` script. This runs `docker-compose pull` (to get Redis image) and `docker-compose up-d`, deploying the new Redis container.

**Trigger 2: Application Code Change (New Image**
1. Developer pushes code to `app-code-repo`.
2. CI/CD Pipeline Runs: This builds the new app image (e.g., `my-app:v1.2.1`) and pushes it to the container registry. 
3. The CI/CD pipeline checks out the `config-repo` and updates the image tag in the `docker-compose.yaml` file to the new version (`my-app:v1.2.1`), commits the change, and pushes the changes.
4. This new commit to the `app-config-repo` fires the webhook. The webhook listener receives that webhook and executes `redeploy.sh`, which pulls and redeploys `my-app:v1.2.1` image.

By centralizing all changes through the `app-config-repo`, and using the webhook as the deployment signal, we created an auditable and automated GitOps system.

### Example 2: Complex GitOps Setup (K8s + ArgoCD) 
Let's use the third approach to deploy a personal project.
- **Repository Structure:** We'd maintain two repositories.
  - `my-app-code`: Contains the Python code and Dockerfile. THe CI/CD builds the image and pushes it to a container registry.
  - `my-app-config`: contains the Kubernetes manifests (Deployment, Service, Ingress, etc.). The images in these manifests are pinned to a specific tag (e.g., `my-app:v1.2.0`).
- **The Change:** We update the application code.
- **CI/CD Action:** The CI/CD pipeline runs, builds the new image (`my-app:v1.2.1`), and updates the image tag in the `my-app-config` repository. It does this via a pr or commit.
- **GitOps Action:** ArgoCD detects a change in `my-app-config` repo (the desired state is now `my-app:v1.2.1`). It automatically applies the new deployment manifest to the cluster, triggering Kubernetes to pull the new image and roll out the update.