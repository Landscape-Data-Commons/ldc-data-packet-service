#  using node alpine 3.13
FROM node:alpine3.13 

# dev dependencies
RUN apk update && \
    apk add curl && \ 
    apk add vim && \
    apk add bash


#  setting workdir usr /app inside container
WORKDIR /usr/src

#  copying local directory into /usr/app
COPY ./ /usr/src

#  installing app dependencies/packages
RUN npm install


EXPOSE 5100
# uncomment below to run development
# mode with nodemon inside container
# RUN /usr/sbin/crond -f -l 0 -c /usr/src -L /var/log/cron.log

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]