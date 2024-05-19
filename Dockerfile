#frontend development container for BHIS WEBAPP
#Download Node Alpine image
FROM node:19-alpine AS compile-image

#Setup the working directory
WORKDIR /opt/ng

#Copy package.json into container
COPY . .

#Install dependencies
RUN npm install --force
RUN npm fund 
RUN npm audit fix --legacy-peer-deps

#install angular cli
RUN npm install -g @angular/cli

#Copy other files and folder to working directory
COPY . .

#build angular application
RUN ng build

##in prod using htttp server, 
#download NGINX image
FROM nginx

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

#copy built angular files(content of dist) to NGINX HTML folder
COPY --from=compile-image /opt/ng/dist/bhis_app /usr/share/nginx/html

##in development with host 0.0.0.0 which means it listens to all interfaces.
###CMD ng build
###CMD ng serve --host 0.0.0.0 --port 4200

###docker build -t <bhis/bhis> .
###docker run --name bhiswebapp -d -p 80:80 bhis/bhis <>
###open port 80
###ipadddress:80
