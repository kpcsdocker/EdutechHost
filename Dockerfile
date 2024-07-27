# Stage 1: Build the Angular application
FROM node:16.14.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build --prod
RUN npm run build -- --configuration=production

# Stage 2: Serve the Angular application with a Node.js server
FROM node:16.14.0-alpine
WORKDIR /app
COPY --from=build /app/dist/EDUTechUI ./dist/EDUTechUI
COPY server.js ./
COPY package*.json ./
#RUN npm install
RUN npm install --production
# Set environment variable for backend URL
# ENV BACKEND_URL http://localhost:8088/questions
EXPOSE 80
#CMD ["node", "server.js"]
CMD ["node", "server.js", "--", "--host=0.0.0.0", "--disable-host-check"]
