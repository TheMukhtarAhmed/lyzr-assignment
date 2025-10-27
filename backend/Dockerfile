FROM python:3.13-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Set work directory
WORKDIR /app

# Copy files
COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-root --no-interaction

# Copy app source
COPY . .

# Default command (overridden by docker-compose)
CMD ["poetry", "run", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "src", "--reload"]
