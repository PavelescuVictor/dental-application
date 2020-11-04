# Pull Base Image
FROM python:3.8-alpine

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
WORKDIR /usr/src/app

# Installing requirements
COPY /dentalapp-backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY /dentalapp-backend/dentalapp ./

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
