# Udacity-Capstone-Microservices
In this project you will:

Capstone project for AWS cloud Developer NanoDegree
This project will contain two microservices User Service to register and log-in user. Gratitude service allow user to post caption and image.
we will do following for each microservice:
Set up each microservice to be run in its own Docker container
Set up a Travis CI pipeline to push images to Dockerhub
Deploy the Dockerhub images to the Kubernetes cluster

1. Before starting project, we need to set up following while running the application either locally or on the cloud. 
An S3 bucket
A PostgreSQL database

2. Run Project locally:
npm install 
npm run dev

Visit http://localhost:8080/api/v0/gratitude and http://localhost:8080/api/v0/users in your web browser to verify that the application is running

3. Run the project locally in a multi-container environment:
Create images
# Remove unused and dangling images
docker image prune --all
# Run this command from the directory where you have the "docker-compose-build.yaml" file present
docker-compose -f docker-compose-build.yaml build --parallel
# Create another YAML file, docker-compose.yaml, in the project's parent directory. It will use the existing images and create containers. While creating containers, it defines the port mapping, and the container dependency.
docker-compose up

Visit http://localhost:8080/api/v0/gratitude and http://localhost:8080/api/v0/users in your web browser to verify that the application is running

4. Set up Travis continuous integration pipeline
Create Dockerhub Repositories
Log in to https://hub.docker.com/ and create four public repositories - each repository corresponding to your local Docker images. The names of the repositories must be exactly the same as the image name specified in the docker-compose-build.yaml file:

Set up Travis CI Pipeline
Use Travis CI pipeline to build and push images to your DockerHub registry.

Create an account on https://travis-ci.com/ (not https://travis-ci.org/). It is recommended that you sign in using your Github account.
Integrate Github with Travis: Activate your GitHub repository with whom you want to set up the CI pipeline.
Set up your Dockerhub username and password in the Travis repository's settings, so that they can be used inside of .travis.yml file while pushing images to the Dockerhub.
Add a .travis.yml configuration file to the project directory (locally). In addition to the mandatory sections, your Travis file should automatically read the Dockerfiles, build images, and push images to DockerHub. For build and push, you can use either docker-compose or individual docker build commands.

Trigger your build by pushing your changes to the Github repository. All of these steps mentioned in the .travis.yml file will be executed on the Travis worker node. It may take upto 15-20 minutes to build and push all four images.
Verify if the newly pushed images are now available in your Dockerhub account.

Container Orchestration with Kubernetes
Create an EKS Cluster and Node Group
Follow the instructions provided by AWS on Creating an Amazon EKS Cluster. https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
Create the EKS Node Groups
Once your cluster is created, we will need to add Node Groups so that the cluster has EC2 instances to process the workloads.

Follow the instructions provided by AWS on Create the EKS Node Groups
Once your cluster is created, we will need to add Node Groups so that the cluster has EC2 instances to process the workloads.

Follow the instructions provided by AWS on https://docs.aws.amazon.com/eks/latest/userguide/create-managed-node-group.html

Connecting kubectl with EKS
Follow the instructions provided by AWS on https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html

This will make it such that your kubectl will be running against your newly-created EKS cluster.

Once kubectl is configured to communicate with your EKS cluster, run the following to validate the connection to the cluster

kubectl get nodes

Deployment
In this step, we will deploy the Docker containers for backend API applications in their respective pods.

Deployment configuration: Create deployment.yaml file individually for each service. While defining container specs, make sure to specify the same images you've pushed to the Dockerhub earlier. Ultimately,backend API applications should run in their respective pods.

Service configuration: Similarly, create the service.yaml file thereby defining the right services/ports mapping.

Once, all deployment and service files are ready, you can use commands like:

# Apply env variables and secrets
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml
# Deployments - Double check the Dockerhub image name and version in the deployment files
kubectl apply -f backend-gratitude-deployment.yaml
# Do the same for other three deployment files
# Service
kubectl apply -f backend-gratitude-service.yaml
# Do the same for other three service files
Make sure to check the image names in the deployment files above.

Connect to the Kubernetes Services to Access the Application
If the deployment is successful, and services are created, use below option to access the application:

Expose External IP: You can expose the "reverseproxy" deployment using a Load Balancer's External IP.

# Check the deployment names and their pod status
kubectl get deployments
# Create a Service object that exposes the frontend deployment
# The command below will ceates an external load balancer and assigns a fixed, external IP to the Service.
kubectl expose deployment reverseproxy --type=LoadBalancer --name=publicreverseproxy
# Check name, ClusterIP, and External IP of all deployments
kubectl get services 
kubectl get pods # It should show the STATUS as Running

Replace localhost in following url http://{External-IP}:8080/api/v0/gratitude in browser.
Once deployment is successful, you can use postman collection present in project directory and test all API.
you can visit http://localhost:8080/api/v0/gratitude
