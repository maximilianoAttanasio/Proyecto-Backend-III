# Imagen base
FROM node:22

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa Express 
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]
