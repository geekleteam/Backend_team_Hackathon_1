# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev \
  && apt-get clean

# Copy the application code into the container
COPY . /code/

# Set the working directory in the container
WORKDIR /code

# Install Python dependencies
RUN pip install --upgrade pip \
  && pip install -r requirements.txt

CMD ["sh", "-c", "sleep 5s"]
