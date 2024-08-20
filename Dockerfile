
FROM node:22.6.0-alpine3.20

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

RUN mkdir data

COPY --chown=app:node package*.json ./

# RUN npm install

COPY --chown=app:node . .

# ENV Owner="Farshid Ahmadi"
# ENV VITE_APP_URL=http://localhost:1000
# ENV VITE_API_BASE_URL=http://localhost:1001

EXPOSE 1000

# CMD [ "npm" , "run" , "dev" ]