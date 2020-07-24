FROM node:14.5

RUN mkdir /var/www
RUN mkdir /var/www/qa
RUN mkdir /var/data
ADD . /var/www/qa
WORKDIR /var/www/qa
RUN npm i
CMD ["npm", "start"]
