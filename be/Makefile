# Variabel
PYTHON = .venv/bin/python
PIP = .venv/bin/pip
FLASK = .venv/bin/flask
RUFF = .venv/bin/ruff
GUNICORN = .venv/bin/gunicorn
WAITRESS = .venv/bin/waitress-serve

.PHONY: help venv install dev lint format clean test

help:
	@echo "Perintah yang tersedia:"
	@echo "  make venv          : Membuat virtual environment"
	@echo "  make install       : Instalasi library dari requirements.txt"
	@echo "  make dev           : Jalankan server development"
	@echo "  make test          : Jalankan test.py"
	@echo "  make lint          : Cek kualitas kode"
	@echo "  make format        : Rapikan kode"
	@echo "  make clean         : Hapus file sampah (__pycache__)"

# Lingkungan
venv:
	python -m venv .venv
	$(PIP) install --upgrade pip

install:
	$(PIP) install -r requirements.txt

# Menjalankan Aplikasi
dev:
	$(PYTHON) server.py

gunicorn:
	$(GUNICORN) server:app --bind 0.0.0.0:5000

waitress:
	$(WAITRESS) --host=0.0.0.0 --port=5000 server:app

# Scripts (Menjalankan file di folder scripts/)
test:
	$(PYTHON) scripts/test.py

# Kualitas Kode
lint:
	$(RUFF) check .

format:
	$(RUFF) format .

# Pembersihan
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete