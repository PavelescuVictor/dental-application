# Pull Base Image
FROM python:3.8-alpine

# Set Environment Variables
ENV PYTHONUNBUFFERED=1

# Set Work Directory
WORKDIR /dentalapp-backend

# Installing requirements
RUN ls -l
COPY ./dentalapp-backend/requirements.txt ./dentalapp-backend/
RUN pip install -r ./dentalapp-backend/requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
