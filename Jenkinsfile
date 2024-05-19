pipeline {
    agent any
    tools {
    nodejs "node" 
    dockerTool 'docker'
    }
    
    
    stages {
        stage('Checkout') {
            steps {
        checkout scmGit(branches: [[name: '*/development_reg']], extensions: [], userRemoteConfigs: [[credentialsId: 'cc4b7c07-ca4c-4757-9181-cb50c49c6eb6', url: 'https://github.com/Compulectro-BHIS/BHISDEV-2.0']])
            }
        }
        stage('Build and Test') {
            steps {
                sh 'npm install --force'
                sh 'npm install -g @angular/cli'
                sh 'npm fund'
                sh 'npm audit fix --legacy-peer-deps'
                
            }
        }
        
        stage('Build Artifact') {
            steps {
                sh 'ng build'
                sh 'ng build && tar -zcvf dist.tgz dist/'
                archiveArtifacts artifacts: '**/*', fingerprint: true
            }
        }
        
        stage('upload artifacts to nexus repo') {
            steps {
               nexusArtifactUploader artifacts: [[artifactId: 'bhisartifact', classifier: '', file: '/var/lib/jenkins/workspace/Bhis_frontend/dist.tgz', type: 'tgz']], credentialsId: 'nexusnew', groupId: 'bhisrawgroup', nexusUrl: '172.173.200.219:8081', nexusVersion: 'nexus3', protocol: 'http', repository: 'bhisraw', version: '1.0.0'
            }
        }
        
        stage ('Build docker image from docker file in scm') {
            steps {
                sh 'docker build -t bhis/bhis .'
            }
        }
        
        stage('push docker image to container repo'){
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', \
                usernameVariable: 'DOCKER_USERNAME', \
                passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker tag bhis/bhis aiesoft/bhisfrontend:latest'
                    sh 'docker push aiesoft/bhisfrontend:latest'
                }
            }
            
        }
        
        
    }   
