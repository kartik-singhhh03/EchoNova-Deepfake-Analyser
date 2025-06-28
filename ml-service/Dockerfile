FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsndfile1 \
    libsndfile1-dev \
    ffmpeg \
    libavcodec-extra \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Create directories
RUN mkdir -p models temp logs

# Create non-root user
RUN useradd -m -u 1001 mluser && chown -R mluser:mluser /app
USER mluser

EXPOSE 5001

CMD ["python", "app.py"]