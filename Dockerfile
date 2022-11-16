FROM nginx

MAINTAINER Anjone co.ltd

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir "/usr/share/nginx/log/"

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/


### RUN WITH THE FOLLOWING COMMAND ###

# docker run -p 10088:80 \
# -v /root/anjone-frontend/log/:/usr/share/nginx/log/ \
# --name anjone-frontend \
# -d anjone-frontend

#docker run -p 3000:80 \
#-v /home/firefly/project/anjone-frontend/:/usr/share/nginx/log/ \
#--name anjone-frontend \
#-d anjone-frontend

######################################
