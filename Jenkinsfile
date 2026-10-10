pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build Docker image') {
      steps { bat 'docker build -t taskflow-manager:demo .' }
    }
    stage('Verify image') {
      steps { bat 'docker image inspect taskflow-manager:demo' }
    }
  }
  post {
    success { echo 'TaskFlow image built and verified successfully.' }
    failure { echo 'Pipeline failed. Check the stage console output.' }
  }
}
