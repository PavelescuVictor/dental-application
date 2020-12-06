# # Pull Base Image
# FROM python:3.8-alpine

# # Set Environment Variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED=1
# 
# # Set Work Directory
# RUN mkdir /dentalapp
# 
# # Installing requirements
# COPY dentalapp-backend/requirements.txt /dentalapp/
# # RUN pip install -r dentalapp/requirements.txt
# 
# RUN python -m pip install -U pip
# 
# # Copying rest of the files
# COPY dentalapp-backend/dentalapp /dentalapp
# WORKDIR /dentalapp
# 
# EXPOSE 8000
# CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]

# # Pull Base Image
# FROM python:3.8-alpine
# 
# # Set Environment Variables
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED=1
# 
# # Set Work Directory
# RUN mkdir /dentalapp
# WORKDIR /dentalapp
# 
# # Copy requirements to the container
# COPY dentalapp-backend/Pipfile dentalapp-backend/Pipfile.lock /dentalapp/
# 
# # Install the requirements to the container
# RUN pip install pipenv && pipenv install --system
# 
# # Copying rest of the files
# COPY dentalapp-backend/dentalapp /dentalapp/
# 
# EXPOSE 8000
# CMD ["ls" "-l"]
# CMD ["pipenv", "shell"]
# CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000" , "--settings=mysite.settings.prod" ]

# Pull Base Image
FROM python:3.8

 # Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
RUN mkdir /dentalapp

COPY dentalapp-backend/requirements.txt /dentalapp/
RUN pip install -r dentalapp/requirements.txt

COPY dentalapp-backend/dentalapp/ /dentalapp
WORKDIR /dentalapp

EXPOSE 8000

CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]