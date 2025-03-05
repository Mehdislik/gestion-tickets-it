pipeline {
  agent any

  environment {
    // Récupération des credentials stockés dans Jenkins
    DOCKER_CREDENTIALS = credentials('docker-registry-token')
    SONARQUBE_TOKEN   = credentials('sonarqube-token')
    
    // Remplacez cette URL par l'URL réelle de votre serveur SonarQube
    SONARQUBE_URL     = 'http://votre-sonarqube-url:9000'
  }

  stages {
    stage('Checkout') {
      steps {
        // Utilisation du token GitHub pour cloner le repository si nécessaire
        git url: 'https://github.com/Mehdislik/gestion-tickets-it.git', branch: 'main'

      }
    }
    stage('Install Dependencies & Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t gestion-tickets-it:latest .'
      }
    }
    stage('Analyse de Code avec SonarQube') {
      steps {
        // Lancer l'analyse SonarQube en utilisant le token et l'URL définis dans l'environnement
        sh "sonar-scanner -Dsonar.projectKey=gestion-tickets-it -Dsonar.sources=src -Dsonar.host.url=${SONARQUBE_URL} -Dsonar.login=${SONARQUBE_TOKEN}"
      }
    }
    stage('Push Docker Image') {
      steps {
        // Connexion au registre Docker en utilisant les credentials
        sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}"
        sh "docker push gestion-tickets-it:latest"
      }
    }
    stage('Deploy on Kubernetes') {
      steps {

        // Utiliser ce kubeconfig pour déployer sur le cluster
        sh ' microk8s kubectl apply -f k8s/'
      }
    }
  }

  post {
    always {
      echo 'Pipeline terminé.'
    }
  }
}
