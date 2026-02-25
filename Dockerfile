# Use the official NGINX image from Docker Hub
FROM nginx:alpine

# Copy the static content (html, css, js) into the web server's root directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80
