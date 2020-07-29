FROM node:14.5

WORKDIR /var/www/qa
COPY . /var/www/qa
RUN npm i
RUN echo $LOADERIO > loaderio-verification.txt
CMD ["npm", "start"]
