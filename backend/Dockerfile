
# Use a slim Python base image
FROM python:3.11-slim

# Set the working directory
WORKDIR /backend
COPY ./app ./app
# Copy requirements.txt and install dependencies
COPY requirements.txt .

RUN pip install -r requirements.txt --index-url https://pypi.python.org/simple
# Copy the FastAPI app code
# Expose the FastAPI port
EXPOSE 8000

CMD ["uvicorn", "--reload", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
