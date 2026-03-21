# SafeLink-AI 🛡️ | AI-Powered URL Safety Scanner

## Project Title & Description

SafeLink-AI is an intelligent, AI-powered URL safety scanner designed to protect users from malicious and phishing websites. By leveraging advanced machine learning techniques, specifically a pre-trained XGBoost classifier, the system analyzes various features extracted from URLs in real-time to determine their safety status. It provides a robust backend API for seamless integration into web applications, ensuring a secure browsing experience against online threats.

## Key Features & Benefits

*   **Real-time URL Scanning:** Instantly checks URLs for potential threats via a high-performance API.
*   **Machine Learning Core:** Utilizes a pre-trained XGBoost model (`XGBoostClassifier.pickle`) for high accuracy in classifying URLs as safe or malicious.
*   **Comprehensive Feature Extraction:** Employs a robust set of URL features (e.g., domain properties, IP presence, URL length, random domain detection) implemented in `URLFeatureExtraction.py` to identify suspicious patterns.
*   **Scalable Backend:** Built with FastAPI, providing a modern, fast, and asynchronous API that can handle concurrent requests efficiently.
*   **CORS Support:** Configured for seamless integration with various frontend applications (e.g., React/Vite).
*   **Developer-Friendly API:** Provides a clear and well-documented API endpoint for quick adoption by client applications.

## Technologies Used

The SafeLink-AI project is built using a combination of powerful languages, frameworks, and tools:

### Languages
*   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
*   ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### Frameworks & Libraries
*   ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white) (Python Web Framework)
*   ![XGBoost](https://img.shields.io/badge/XGBoost-1E90FF?style=for-the-badge&logo=xgboost&logoColor=white) (Machine Learning Library)
*   Pydantic
*   NumPy
*   Uvicorn (ASGI server)

### Tools & Technologies
*   ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
*   ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
*   ESLint

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed on your system:

*   **Python 3.8+**: For running the backend API.
*   **Node.js & npm (or yarn)**: For any potential frontend development or JavaScript tooling (like ESLint).
*   **`pip`**: Python package installer.
*   **`git`**: For cloning the repository.

### Backend Dependencies (`back-end/requirements.txt`)

While a `requirements.txt` file is not explicitly present in the provided project structure, the following Python packages are necessary for the backend to function. You will need to create this file in the `back-end/` directory:

```txt
fastapi
uvicorn
pydantic
numpy
scikit-learn # Often a dependency for ML models even if not directly used for XGBoost
xgboost
```

## Installation & Setup Instructions

Follow these steps to get your SafeLink-AI instance up and running locally.

### 1. Clone the Repository

First, clone the SafeLink-AI repository to your local machine:

```bash
git clone https://github.com/anan5093/SafeLink-AI.git
cd SafeLink-AI
```

### 2. Backend Setup

The backend is developed using Python and FastAPI.

#### a. Navigate to the Backend Directory

```bash
cd back-end
```

#### b. Create `requirements.txt`

Create a file named `requirements.txt` in the `back-end/` directory and populate it with the dependencies listed in the [Prerequisites & Dependencies](#prerequisites--dependencies) section.

#### c. Create a Virtual Environment (Recommended)

```bash
python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
```

#### d. Install Dependencies

Install all required Python packages:

```bash
pip install -r requirements.txt
```

#### e. Environment Variables

While `main.py` directly defines CORS origins, for more flexible configuration or for sensitive data like API keys, you can use a `.env` file in the project root (`SafeLink-AI/.env`). For example, you might add:

```ini
# .env (example)
ALLOWED_ORIGINS="http://localhost:5173,https://your-frontend-domain.com"
API_PORT=8000
```
You would then need to integrate `python-dotenv` into `main.py` to load these variables.

#### f. Run the Backend Server

Start the FastAPI application using Uvicorn:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The API will now be accessible at `http://localhost:8000`.

### 3. Frontend Setup (Conceptual)

The presence of `eslint.config.js` and `Node.js` in the technical details, along with CORS origins for `http://localhost:5173` (Vite/React) and `https://anan5093.github.io` (GitHub Pages), suggests that a frontend client is intended or exists externally.

If you have a frontend client that consumes this API:
1.  Navigate to your frontend project directory.
2.  Install its dependencies (e.g., `npm install` or `yarn install`).
3.  Start your frontend development server (e.g., `npm run dev`).
    *   **Important:** Ensure your frontend's origin is listed in the `origins` array in `back-end/main.py` for CORS to work correctly.

## Usage Examples & API Documentation

The SafeLink-AI backend exposes a RESTful API for URL scanning.

### API Endpoint

*   **Base URL:** `http://localhost:8000` (or your deployed domain)
*   **Endpoint:** `/predict`
*   **Method:** `POST`

### Request Body

Send a JSON object with a `url` string field:

```json
{
  "url": "https://example.com/malicious-link"
}
```

### Example Usage (cURL)

To test the API, you can use `curl` from your terminal:

```bash
curl -X POST \
  http://localhost:8000/predict \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://www.google.com"
  }'
```

A response for a safe URL might look like:
```json
{
  "prediction": 0,
  "prediction_label": "Safe",
  "prediction_score": 0.99
}
```
And for a malicious URL:
```json
{
  "prediction": 1,
  "prediction_label": "Malicious",
  "prediction_score": 0.85
}
```

### Example Usage (Python)

```python
import requests
import json

api_url = "http://localhost:8000/predict"
test_url = "http://phishing-site.com/login" # Replace with a real (or simulated) URL for testing

payload = {"url": test_url}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(api_url, data=json.dumps(payload), headers=headers)
    response.raise_for_status() # Raise an exception for HTTP errors

    result = response.json()
    print(f"URL: {test_url}")
    print(f"Prediction: {result['prediction_label']} (Score: {result['prediction_score']:.2f})")
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")
```

### Interactive API Documentation

FastAPI automatically generates interactive API documentation (Swagger UI and ReDoc). Once the server is running, you can access them at:

*   **Swagger UI:** `http://localhost:8000/docs`
*   **ReDoc:** `http://localhost:8000/redoc`

## Configuration Options

### CORS (Cross-Origin Resource Sharing)

The backend is configured to handle CORS for specific origins, defined in `back-end/main.py`. You can modify the `origins` list to allow requests from your frontend application(s):

```python
# back-end/main.py
origins = [
    "http://localhost:5173",   # React (Vite) development server
    "http://localhost",
    "http://127.0.0.1:5173",
    "https://anan5093.github.io", # Production frontend (GitHub Pages)
    # Add your frontend URLs here, e.g., "https://your-frontend-domain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Contributing Guidelines

We welcome contributions to SafeLink-AI! If you'd like to contribute, please follow these guidelines:

1.  **Fork the Repository:** Start by forking the `anan5093/SafeLink-AI` repository to your GitHub account.
2.  **Clone Your Fork:** Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/YOUR_USERNAME/SafeLink-AI.git
    cd SafeLink-AI
    ```
3.  **Create a New Branch:** Create a new branch for your feature or bug fix.
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Make Changes:** Implement your changes, ensuring code quality and adherence to existing coding styles.
    *   For Python code, follow [PEP 8](https://www.python.org/dev/peps/pep-0008/).
    *   For JavaScript (if adding frontend or JS tooling), ensure `eslint.config.js` rules are respected.
5.  **Test Your Changes:** Thoroughly test your changes to ensure they work as expected and don't introduce regressions.
6.  **Commit Your Changes:** Write clear and concise commit messages.
    ```bash
    git commit -m "feat: Add new feature for X"
    ```
7.  **Push to Your Fork:** Push your new branch to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```
8.  **Create a Pull Request:** Open a pull request from your branch to the `main` branch of the original `anan5093/SafeLink-AI` repository. Provide a detailed description of your changes.

### GitHub Actions

The repository uses GitHub Actions (`.github/workflows/main.yml`) for continuous integration. Ensure your contributions pass any defined CI checks.

## License Information

This project currently does not have an explicit license specified. This means that, by default, all rights are reserved by the copyright holder (`anan5093`).

**Recommendation:** It is highly recommended to add an open-source license (e.g., MIT, Apache 2.0, GPL) to encourage community contributions and clarify usage rights. You can do this by adding a `LICENSE` file to the root of the repository.

## Acknowledgments

*   Special thanks to the developers of FastAPI, Uvicorn, XGBoost, and the broader open-source community for providing powerful tools and libraries that made this project possible.
*   The URL feature extraction logic is inspired by common techniques used in phishing detection research.
