FROM node:22
WORKDIR /app/react-app
COPY ./react-app/package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm" , "run" , "dev"]