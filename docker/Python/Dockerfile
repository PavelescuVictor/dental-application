# Pull Base Image
FROM python:3.8-alpine

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
RUN mkdir /dentalapp-backend/code
WORKDIR /dentalapp-backend/code

# Installing requirements
COPY /dentalapp-backend/requirements.txt /dentalapp-backend/code/
RUN pip install -r requirements.txt
COPY /dentalapp-backend/ /dentalapp-backend/code/