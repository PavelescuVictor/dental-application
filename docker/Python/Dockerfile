# Pull Base Image
FROM python:3.8-alpine

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
RUN mkdir /dentalapp

# Installing requirements
COPY dentalapp-backend/requirements.txt /dentalapp/

RUN python -m pip install -U pip

RUN pip install -r dentalapp/requirements.txt

# Copying rest of the files
COPY dentalapp-backend/dentalapp /dentalapp
WORKDIR /dentalapp

EXPOSE 8000
CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]
