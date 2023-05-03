FROM node
MAINTAINER john williams <jrw@mit.edu>

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package.json /usr/src
RUN npm install
COPY . /usr/src

EXPOSE 6600
CMD ["npm", "start"]

