Here's a full instruction set for using your Dockerfile—from building the image to deploying on Azure App Service with deployment slots:

---

## ✅ Dockerfile Summary

Your multi-stage Dockerfile is structured as:

1. **Base layer**: Installs all dependencies.
2. **Dev layer**: For development (`npm run dev`).
3. **Build layer**: Builds the SSR app (`npm run build`).
4. **Prod layer**: Runs production version with only production deps.

---

## 🔧 1. How to Build the Docker Image

Use the production stage (`prod-env`) to build the image:

```bash
docker build -t my-node-app:latest --target prod-env .
```

- `--target prod-env`: Specifies the final stage you want to build.
- `-t my-node-app:latest`: Tags your image.
- Example:

## For DEV

```bash
 docker build -t teeverse-dev --target dev-env .
```

---

## ▶️ 2. How to Run the Container

Run the container from the built image:

```bash
docker run -d -p 3000:3000 --name my-node-app-container my-node-app:latest
```

- `-d`: Run in detached mode.
- `-p 3000:3000`: Map port 3000 of host to container.
- `--name my-node-app-container`: Name the container.
- for dev map port with 5173
- Example:

```bash
docker run -e NODE_ENV=development -p 5173:5173 teeverse-dev
```

You can check logs with:

```bash
docker logs -f my-node-app-container
```

---

## 🗑️ 3. How to Delete the Container and Image

### Stop and remove the container:

```bash
docker stop my-node-app-container
docker rm my-node-app-container
```

### Remove the image:

```bash
docker rmi my-node-app:latest
```

Optional: To prune unused images and containers:

```bash
docker system prune -a
```

---

## 🚀 4. Deployment Settings for Azure App Service (Deployment Slot)

To deploy on **Azure App Service for Linux (Container)** using a **deployment slot**, follow these:

### A. **Prepare Docker Image**

- Push your image to a container registry like Docker Hub or Azure Container Registry (ACR):

```bash
docker tag my-node-app:latest <your-registry>/my-node-app:latest
docker push <your-registry>/my-node-app:latest
```

### B. **Configure App Service Deployment Slot**

1. **Create a Deployment Slot**

   - In Azure Portal > App Service > Deployment Slots > Add Slot.
   - Name it something like `staging`.

2. **Configure Slot Settings**

   - In the slot, under "Deployment Center":

     - Choose "Docker Hub" or "Azure Container Registry".
     - Provide image name, tag (`latest` or specific version).

   - In "Configuration":

     - Add environment variables if needed.
     - Ensure `WEBSITES_PORT=3000` is set if your app listens on port 3000.

3. **Enable Continuous Deployment (Optional)**:

   - You can connect your container registry and automate deployments on new image pushes.

4. **Swap Slots to Promote**

   - After testing in staging, swap to `production` using the "Swap" button.

---

## ✅ Summary Cheatsheet

```bash
# Build
docker build -t my-node-app:latest --target prod-env .

# Run
docker run -d -p 3000:3000 --name my-node-app-container my-node-app:latest

# Stop & Remove
docker stop my-node-app-container && docker rm my-node-app-container
docker rmi my-node-app:latest
```

Would you like a `docker-compose.yml` version or a GitHub Actions CI/CD pipeline for automated deployments?
