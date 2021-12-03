FROM nginx
ENV APP_HOME=/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN mkdir ./build
ADD ./build ./build

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]