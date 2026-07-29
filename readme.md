# AdoptMe Backend

Proyecto desarrollado con Node.js, Express y MongoDB.

## Imagen en Docker Hub

https://hub.docker.com/r/uselessmawi/adoptme-backend

## Construir la imagen

```bash
docker build -t adoptme-backend .
```

## Ejecutar el contenedor

```bash
docker run -p 8080:8080 --env-file .env adoptme-backend
```

## Variables de entorno

Crear un archivo `.env` con:

```env
PORT=8080
MONGO_URL=tu_uri_de_mongodb
```

## Acceso a Swagger

```
http://localhost:8080/api-docs
```