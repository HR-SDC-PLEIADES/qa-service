FROM node:14.5

WORKDIR /var/www/qa
RUN mkdir /var/www/data
COPY . /var/www/qa
RUN npm i
CMD ["npm", "start"]
