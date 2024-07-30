# TODO App
<a href="https://ec2-18-189-69-172.us-east-2.compute.amazonaws.com">🌐 Deployed project</a>
## Project Description
This project is a scalable TODO application built using Django for the backend and React with Vite.js for the frontend.

## Architecture
- Backend (Django)
- Frontend (React with Vite.js)
- Server (Nginx)

## Containerization (Docker Compose)
- Separate containers for the Django backend, React frontend

## Deployment
- GitHub Actions: Automates the deployment process using GitHub Actions for continuous integration and deployment.
- Docker Compose: Streamlines the deployment process by managing the containers for the frontend, backend, and Nginx server.
- Nginx Configuration: Optimized to serve the React application and proxy requests to the Django backend efficiently.

## Getting Started
### Prerequisites
- Docker
- Docker Compose
```mermaid
flowchart TD
    Project(Project):::contrast
    Technologies(Technologies):::rootEl
    DjangoT(Django)
    GunicornT(Gunicorn)
    NginxT(Nginx)
    ViteT(Vite.js bundler)
    ReactT(React)
    SCSST(SCSS)
    TailwindcssT(Tailwindcss)
    CICD(CI/CD):::rootEl
    Build(Build:)
    NPM(Installation and build of React app)
    Dockerize(Pull, build and push docker images from this project)
    Tag(Adding tag :latest to new docker image)
    Latest(Latest image in github registry)
    Deploy(Deploy:)
    EC2(Connecting to EC2)
    Pull(Pulling docker images) <---> Latest
    RUN(Starting containers on EC2 instance)
    Logic(Docker Logic):::rootEl
    backendDocker(Dockerized backend)
    backendDockerPort(exposed to :8000 in docker-compose)
    frontendDocker(Dockerized frontend)
    Nginx(Nginx :80 with gzip compression)
    static(Serving static site)
    proxy(Proxy requests) <--> backendDockerPort
    Development(Development):::rootEl
    QS[Quick start]
    script(chmod +x development.sh)
    runScript($ ./development.sh)
    runContainers(docker-compose up --build)
    Node(cd frontend && npm i && npm run dev)

    Attention[Dev server proxying requests </br> to :80 in docker-compose]:::contrast


    Development --- Project
    Logic --- Project

    Project --- CICD
    Project --- Technologies


    Build --- NPM
    Build --- Dockerize
    Dockerize --- Tag
    Tag --- Latest
    Deploy --- EC2
    EC2 --- Pull
    Pull ---> RUN
    Pull <---> latest


    backendDocker --- backendDockerPort
    frontendDocker --- Nginx
    Nginx --- static
    Nginx --- proxy


    QS --- script
    script --- runScript
    Development --- QS
    Development --- runContainers
    runContainers --- Node
    Node <---> Logic
    Node --- Attention

    Technologies --- DjangoT
    Technologies --- NginxT
    Technologies --- ViteT
    DjangoT --- GunicornT
    ViteT --- ReactT
    ViteT --- SCSST
    ViteT --- TailwindcssT

    CICD --- Build
    CICD --- Deploy

    Logic --- frontendDocker
    Logic --- backendDocker

    classDef contrast fill:#ebbf3b,stroke:black,color:black,stroke-width:2px;
    classDef rootEl fill:black,stroke:black,color:#ebbf3b,stroke-width:2px,tooltip;
    linkStyle 2 stroke:#39c0cc,stroke-width:2px,stroke-dasharray: 5, 5;
    linkStyle 3 stroke:#39c0cc,stroke-width:2px,stroke-dasharray: 5, 5;
    linkStyle 4 stroke:#39c0cc,stroke-width:2px,stroke-dasharray: 5, 5;
    linkStyle 5 stroke:#39c0cc,stroke-width:2px,stroke-dasharray: 5, 5;
    linkStyle 24 stroke:#ffc804,stroke-width:2px,stroke-dasharray: 5, 5;
```