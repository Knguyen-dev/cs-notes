# Watchtower Explained 
Watchtower is an application packaged as a Docker container that monitors your other running Docker containers. It checks the container's image against the image in the configured container registry. If it detects a newer version of the image, it'll:
1. Pull down the new image.
2. Gracefully shut down the running container.
3. Restart the container with the same options/parameters used when it was deployed initially.

Essentially, Watchtower automates the update process for Docker containers that are running on a single host. 

## Watchtower vs Git Webhooks
- **Watchtower (Polling):** It polls the image registry at a regular interval. Basically, it'll work when our CI/CD pipeline successfully builds and pushes a Docker image, so at least you know that this will only pull down working images that pass the pipeline. However, the drawback is that polling interval as it's not really a real time deployment, so it adds some delay.
- **GitHub Webhooks (Event-Driven):** These are typically configured within a CI/CD pipeline (like GitHub Actions, GitLab CI, Jenkins, etc.). A push to the Git repository triggers the pipeline, which builds and pushes to the image registry. It then sends a webhook notification to our deployment orchestrator (e.g. Kubernetes, or a custom script). It's instantaneous, however a little more complex as it needs to handle the entire lifecycle (build, push, notify, deploy). If the webhook fires before hte image push, or if it's somehow misconfigured, that's a deployment issue waiting to happen.

TLDR Watchtower is a simple and self-contained solution for keeping containers up to date on a single host. It's good for non-critical, self-hosted, home-lab environments. Git webhooks on the other hand are a part of a broader, more robust CI/CD/GitOps strategy used in production environments.

## Why not for Production?
The main reason Watchtower is generally not recommended for commercial or critical production environments is due to the lack of control and orchestration:
- **No Canary/Blue-Green Deployments:** It replaces the running container directly. There's no controlled, testing, or easy rollback mechanisms. It's an all or nothing update.
- **State Management:** For applications uses databases or external volumes, a sudden automated update can disrupt running transactions or require specific shutdown/startup logic that Watchtower may not be able to manage perfectly across all applications.
- **Configuration Management:** Watchtower watches for image updates of the application only. If a new update contains changes to configuration files, environment variables, or infrastructure (stuff other than the image), then it won't be detected via Watchtower. As a result you'd have to manually go to your server, pull down changes, and redeploy manually.
- **Security:** It requires mounting the host's Docker socket (`/var/run/docker.sock`) into the Watchtower container, which gives it root-level control over all other containers on the host. This can be risky for production environments.

In production, it's standard to use container orchestrators like Kubernetes (or lighter versions like MicroK8s), or Docker Swarm combined with a CI/CD pipeline. These tools offer controlled rollouts, health checks, easy rollbacks, etc.

## Watchtower Deployment Example

Assume we have a web application running on a container named `my-web-app` using the image `myregistry/my-web-app:latest`. 

### Step 1. Run the Web application (The Watched Container)
```bash

# Run web application.
docker run -d --name my-web-app -p 8080:80 nginx:stable

# Run Watchtower with Docker daemon socket mounted.
docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --interval 300 \
    --cleanup \
    my-web-app
```
We'll have to have the container running for Watchtower to monitor it. Then we'll start Watchtower as a separate container, and we'll mount the Docker socket. This lets Watchtower start and stop containers on our computer. Let's talk about some parameters
- `-v /var/run/docker.sock:/var/run/docker.sock` (Required): Gives Watchtower access to the Docker daemon, to monitor, stop, and start other containers on our computer.
- `--interval 300`: Sets the polling interval to every 300 seconds (5 minutes), overriding the default polling time of 24 hours.
- `--cleanup`: Tells Watchtower to remove the old image after a successful update to save disk space.
- `my-web-app`: Tells Watchtower to only monitor the container named `my-web-app` (otherwise it monitors all containers).

### Step 2: Update Process
1. Watchtower polls the container registry every 5 minutes and looks for a new `nginx:stable` image.
2. Our CI/CD pipeline pushes a new, updated version of the `nginx:stable` image to the registry.
3. On the next poll, Watchtower will detect the new image.
4. It pulls the new image. It stops and removes the existing `my-web-app` container.
5. It starts a new container with the newly pulled image, using the original parameters `-p 8080:80`, `--name my-web-app`.

## TLDR Takeaway
Watchtower is good but it was some drawbacks. The lack of control, security issues, and also sometimes things just don't work makes things kind of bad. But it does have a good amount of customization so instead of automatically deploying, you can also just configure it to send you slack notifications when a new image is detected, and as a result, you have the final say in deployment.

## Credits
- [Watcher - The Perfect Automation Tool?](https://youtu.be/GHeZaoUpVcQ)
- [WatchTower Docs](https://containrrr.dev/watchtower/)