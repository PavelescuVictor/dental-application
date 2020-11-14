# Pull Base Image
FROM python:3.8-alpine

# Set Environment Variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

# Set Work Directory
RUN mkdir /dentalapp
WORKDIR /dentalapp
COPY ./dentalapp-backend/dentalapp/ ./
COPY ./dentalapp-backend/requirements.txt ./
RUN cat ./requirements.txt
RUN ls ./

# Install requirements
# RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
