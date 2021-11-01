FROM nginx:alpine
RUN apk add bash && \
    apk add vim && \
    apk add curl
    
COPY ./server/node.conf /etc/nginx/conf.d/node.conf