FROM node:14.5

RUN mkdir /var/www
RUN mkdir /var/www/html
RUN mkdir /var/data
ADD . /var/www/html
WORKDIR /var/www/html
RUN npm i
CMD ["npm", "start"]
