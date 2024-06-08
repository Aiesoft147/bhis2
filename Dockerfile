# Frontend development container for BHIS WEBAPP

# Download Node Alpine image
FROM node:19-alpine AS compile-image

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -aG appgroup

# Switch to the non-root user
USER appuser

# Setup the working directory
WORKDIR /opt/ng

# Copy package.json into container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force
RUN npm fund 
RUN npm audit fix --legacy-peer-deps
RUN npm fund

# Install angular cli
RUN npm install -g @angular/cli
RUN npm fund

# Copy other files and folder to working directory
COPY . .

# Build angular application
RUN ng build

# In prod using http server
# Download NGINX image
FROM nginx:alpine

# Create a non-root user for NGINX
RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built angular files (content of dist) to NGINX HTML folder
COPY --from=compile-image /opt/ng/dist/bhis_app /usr/share/nginx/html

# Switch to the non-root nginx user
USER nginxuser

# Ensure the nginx server runs as the non-root user
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Development commands (uncomment when needed)
# CMD ng build
# CMD ng serve --host 0.0.0.0 --port 4200

# Docker build and run commands
# docker build -t <bhis/bhis> .
# docker run --name bhiswebapp -d -p 80:80 bhis/bhis
# Open port 80
# ipadddress:80
