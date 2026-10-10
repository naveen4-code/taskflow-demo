
pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm run install:all'
      }
    }

    stage('Build Docker Image') {
      steps {
        bat 'docker build -t taskflow-manager:demo .'
      }
    }

    stage('Verify Docker Image') {
      steps {
        bat 'docker image inspect taskflow-manager:demo'
      }
    }
  }

  post {
    success {
      echo 'TaskFlow dependencies installed and Docker image verified successfully.'
    }
    failure {
      echo 'Pipeline failed. Check Console Output for the failing stage.'
    }
  }
}