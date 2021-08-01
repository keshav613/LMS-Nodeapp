FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /LMS

COPY . /LMS

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node"] 

CMD ["app.js"]
