# Continuous Integration, Continuous Deployment 
A practice where developers frequently merge code changes in a central repo. Then the repo will automatically build the project, check if everything works, run some test. Then CD could mean continuous delivery or deployment.

## Continuous Integration (CI) Explained
Developers who practice CI will merge their changes back to the main branch as often as possible. Their changes are automatically validated by tools that build the project and run tests against it. If something breaks/fails, we're alerted and know not to merge those changes into our `main` branch until we fix it. One of the focuses is leaving the main branch in a clean and working state. Here's how your CI workflow should work:
- You have a feature branch and make a pull request to the main branch.
- Assuming you have a test suite, CI service will run that test suite. If any tests fails your CI build will fail, notifying you that there's probably something wrong with your code.
- The CI process can do various other things like linting your code, checking for security issues, etc.
- It'll build that application, e.g. run it or create a docker image of it. 

If any of these steps fail, such as the CI runner seeing some tests fail, the CI runner will tell you that your build failed, which is a big indicator that we have some kind of bug in your code. If a CI build fails, please don't merge it to the main branch until it's fixed. A good rule of thumb is running this CI pipeline on every push, pull-request to main, etc.

## Continuous Delivery or Deployment
- **Continuous Delivery:** Automatically deploying the code changes into a testing, or even a production environment after a successful build. After the CI stage runs successfully, we want to deploy the changes. The deployment usually isn't fully automatic as you typically have the final say on whether to deploy the current build.
- **Continuous Deployment:** Similar to continuous delivery, but the deployment is fully automatic, there's no need for human intervention to check if that's the build you want. It's a this is a little faster, but more risky.

### Example 1: Sample CI/CD workflow 

#### Step 1: CI Phase
- **Trigger:** A developer commits code to the main branch in the Version Control System, like GitHub or GitLab.
- **Build:** The CI tool (e.g., Jenkins, GitHub Actions, GitLab CI) automatically checks out the code and compiles it (if needed), and executes all unit tests.
- **Artifact Creation:** If the tests pass, the CI tool uses the code and a Dockerfile to build the application into a self-contained, versioned Docker Image (the artifact).
- **Push to Registry:** The CI pipeline pushes the newly built and tagged Docker Image to a Container Registry (e.g. Docker Hub, AWS ECR, Google Container Registry). The tag is often the commit hash or a sequential build number, ensuring the image is immutable and traceable.

At this point, the CI phase is complete, and the artifact is ready for the Delivery/Deployment phase.

#### Step 2: CD Phase (Staging/Non-Production)
- **Deployment to Staging:** The CD tool, which is often part of the same pipeline system, automatically deploys the new Docker image to a staging or pre-production environment.
- **Validation Tests:** The pipeline runs more tests against the deployed application. 
  - Integration Tests (Checking service-to-service communication)
  - End-to-End (E2E) Tests (Simulating user behavior)
  - Performance/Load tests

#### Step 3: CD vs CDel Checkpoint
Let's talk about what would happen in a continuous delivery vs continuous deployment at this point:
- **Continuous Delivery:** The pipeline would pause here and send a notification (e.g. Slack, message, email) to the developers. Then we'd require a manual approval before proceeding to production. 
- **Continuous Deployment:** If CI successfully builds, we deploy to production without human intervention.

#### Step 4: Deployment to Production
First, let's define what an orchestrator is. An orchestrator is a system or tool that automates the entire life cycle management of containerized applications and their surrounding infrastructure. It's job is to ensure the environment matches the desired state that we declare e.g. "I want 3 replicas of my web app running, and they should never have more than 50% CPU usage". Let's talk about a couple of orchestrators:
- **Kubernetes (K8s):** The industry standard for complex, large scale container orchestration across multiple servers (a cluster). It handles advanced networking, scaling, and rolling updates.
- **Docker Swarm:** Docker's native, simpler option for container orchestration. Good for smaller, less complex cluster setups.
- **Platform-as-a-Service (PaaS)** Tools like Render and Vercel abstract the raw orchestration away. They use their own internal orchestrators to manage your deployment based on your GitHub repository.

The CD pipeline interacts with a production tool (typically Kubernetes or a tool like ArgoCD in a GitOps workflow. The orchestrator pulls the new, tagged Docker image from the registry. Ideally it'll begin a safe deployment strategy (e.g. rolling update or canary deployment) to replace the old application with the new one, ensuring zero downtime.

#### Step 5: Post-Deployment Monitoring and Feedback
- **Health Checks:** These are mechanisms used by the orchestrator to determine the status of our application. They're crucial for reliability, ensuring traffic goes to working instances and automatically restarting failed ones. In orchestrators like Kubernetes, health checks are implemented via **Probes**, which are simple requests periodically sent to the application container. There are three main types of probes:
  - **Liveness Probe:** Checks if the container is running and responsive. If this probe fails (e.g., the application is crashed), the orchestrator will restart the container. It's main job is to maintain a running process.
  - **Readiness Probe:** Checks if the container is ready to service traffic. This is important during application start up or if a dependency (e.g. a database) temporarily fails. If this probe fails, the orchestrator stops sending traffic to our container, and it won't try to restart it.
  - **Startup Probe:** This is used for slow-starting apps, checking if the application has finished its initial startup. While this probe is running, it temporarily disables liveness and readiness probes to prevent the orchestrator from prematurely restarting a container that's taking too long to initialize. 
  - Implementing Health Checks: 
    - **HTTP GET:** The orchestrator would send a HTTP request to a specific path and endpoint (e.g. `GET /health` on port 8080). A response with a status code between 200 and 399 means healthy. Thi sis the most common approach for web apps.
    - **TCP Socket:** The orchestrator tries to open a TCP connection to a specific port. If the connection succeeds, the container is healthy. For services that don't have an HTTP endpoint, like a database or gRPC service.
    - **Exec Command:** The orchestrator runs a command inside the container. If the command exits with a status code of 0, the container is healthy. This is useful for checking the internal state or file system dependencies.
- **Monitoring:** Continuous monitoring and observability tools (e.g. Prometheus, Grafana, or Datadog) track application performance, errors, and user impact in real time.
- **Automatic Rollback:** if monitoring detects critical errors (e.g. a high error rate or performance drop), a complex CD system will automatically trigger a rollback to a previous table version.