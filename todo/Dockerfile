# Pull the image from Dockerhub
#FROM python:3.8.10-alpine3.13
#FROM python:alpine3.19
FROM python:3.10.10

WORKDIR /todo

# set up python environment variables

ENV PYTHONDOWNWRITEBYTECODE 1
ENV PYTHONNUNBUFFER 1

RUN echo ls -a
RUN echo "api docker"

# update and  install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /api/requirements.txt
RUN pip install -r /api/requirements.txt

# copy project
COPY . .

# Expose the port server is running on
EXPOSE 8000