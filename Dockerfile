FROM node:lts

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    vim \
    curl \
    netcat \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "sh", "/usr/src/app/docker-entry.sh" ]