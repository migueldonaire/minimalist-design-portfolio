# Servidor web ligero con los ficheros de la web
FROM nginx:1.30-alpine
COPY . /usr/share/nginx/html
