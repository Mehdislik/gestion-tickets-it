pipeline {
    agent {
        dockerContainer {
            image 'docker:20.10.16-dind'
            args '--privileged'
        }
    }

    environment {
        // Credentials stored in Jenkins
        DOCKER_CREDENTIALS = credentials('docker-registry-token')
        SONARQUBE_TOKEN   = credentials('sonarqube-token')
        
        // Replace with your actual SonarQube URL
        SONARQUBE_URL     = 'http://localhost:9000'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository from GitHub using the main branch
                git url: 'https://github.com/Mehdislik/gestion-tickets-it.git', branch: 'main'
            }
        }
        stage('Install Dependencies & Test') {
            steps {
                // Ensure that Node.js is installed or included in your Docker image.
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Verify Docker') {
            steps {
                // Verify that Docker is available in the container
                sh 'docker --version'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gestion-tickets-it:latest .'
            }
        }
        stage('Analyse de Code avec SonarQube') {
            steps {
                sh "sonar-scanner -Dsonar.projectKey=gestion-tickets-it -Dsonar.sources=src -Dsonar.host.url=${SONARQUBE_URL} -Dsonar.login=${SONARQUBE_TOKEN}"
            }
        }
        stage('Push Docker Image') {
            steps {
                // Log in to Docker registry using stored credentials
                sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}"
                sh "docker push gestion-tickets-it:latest"
            }
        }
        stage('Verify kubectl') {
            steps {
                // Check that kubectl is available (using microk8s)
                sh 'microk8s kubectl version --client'
            }
        }
        stage('Deploy on Kubernetes') {
            steps {
                // Deploy Kubernetes manifests from the k8s directory
                sh 'microk8s kubectl apply -f k8s/'
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}
