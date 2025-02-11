FROM node:23


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]