FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY marketplace/dist/marketplace /usr/share/nginx/html
