# Nginx sin permisos de administrador (usuario nginx, puerto 8080)
FROM nginxinc/nginx-unprivileged:1.30-alpine

# Copiamos solo lo que forma parte de la web
COPY *.html styles.css /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets
