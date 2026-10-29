# Servidor web Nginx con los ficheros de la web
FROM nginx:1.30-alpine

# Copiamos solo lo que forma parte de la web (no todo el proyecto)
COPY index.html about.html project.html styles.css /usr/share/nginx/html/
COPY assets /usr/share/nginx/html/assets

# Sonar avisa de que la imagen de Nginx arranca como root.
# Revisado y aceptado en SonarQube Cloud (Accepted): es una web estática
# sin datos de usuarios ni secretos dentro de la imagen.
