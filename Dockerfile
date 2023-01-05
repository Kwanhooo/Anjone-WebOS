FROM nginx

MAINTAINER Anjone co.ltd

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir "/usr/share/nginx/log/"

ADD default.conf /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html/


### RUN WITH THE FOLLOWING COMMAND ###

# Aliyun ECS
# 120.78.235.195:10088
#docker run -p 10088:80 \
#--restart=always \
#-v /root/anjone-frontend/log/:/usr/share/nginx/log/ \
#--name anjone-frontend \
#-d anjone-frontend

# Tencent Lighthouse
# anjone.0xcafebabe.cn
#docker run -p 10088:80 \
#--restart=always \
#-v /root/anjone/anjone-webos/log/:/usr/share/nginx/log/ \
#--name anjone-webos \
#-d anjone-webos

# Firefly
#docker run -p 3000:80 \
#--restart=always \
#-v /home/firefly/project/anjone-frontend/:/usr/share/nginx/log/ \
#--name anjone-frontend \
#-d anjone-frontend

######################################
