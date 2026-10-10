
pipeline {
  agent any

  environment {
    PATH = "C:\\Program Files\\nodejs;${env.PATH}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Node and npm') {
      steps {
        bat 'where node'
        bat 'where npm'
        bat 'node --version'
        bat 'npm --version'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm.cmd run install:all'
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