# ReactJS Web App and Python Server

This repository contains a simple ReactJS web app and a Python server, demonstrating the integration of frontend and backend components.

## Project Structure

- **/my-app**: Contains the ReactJS web app.
  - `/src`: Source code for the React app.
  - `/public`: Public assets and HTML template.
  - `/node_modules`: Node.js modules and dependencies.
  - `package.json`: Configuration file for Node.js dependencies.

- **/my-app/server**: Houses the Python server.
  - `server.py`: Python script for the server.
  - `requirements.txt`: List of Python dependencies.
  - Any additional files related to the server.

## Setup and Run

### ReactJS Web App

1. Navigate to the `/my-app` directory.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the app:

    ```bash
    npm start
    ```

   The app will be accessible at [http://localhost:3000](http://localhost:3000).

### Python Server

1. Navigate to the `/my-app/server` directory.
2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run the server:

    ```bash
    python server.py
    ```

   The server will be accessible at [http://localhost:5000](http://localhost:5000).

## Explanation

The ReactJS web app and Python server work together to perform text analysis using natural language processing (NLP) techniques. Here's a breakdown of the key components and functionalities:

### Text Analysis in Python Server

The Python server, implemented in `server.py`, leverages the Natural Language Toolkit (NLTK) library for text analysis. The `analyze_text` function in the server performs the following NLP tasks:

1. **Tokenization:** Splits the text into individual words.
2. **Basic Statistics:**
   - Number of words
   - Number of unique words
   - Number of stopwords
   - Number of sentences
3. **Part-of-Speech Tagging:** Identifies the grammatical parts of words (e.g., nouns).
   - Number of nouns
4. **Average Word Length:** Calculates the average length of words.
5. **Type-Token Ratio (TTR):** Measures vocabulary diversity.
6. **Sentiment Analysis:** Determines the compound sentiment score using the VADER sentiment analysis tool.
7. **Named Entity Recognition (NER):** Identifies and counts named entities.

### ReactJS Web App

The ReactJS web app communicates with the Python server to analyze user-inputted text. Users can input text in a textarea or upload a text file. The app provides a user-friendly interface for analyzing text and comparing statistics with an earlier task.

## Usage

- Open the ReactJS web app and input text for analysis or upload a text file.
- Click the "Analyze Text" button to get statistics for the entered/uploaded text.
- Optionally, click the "Compare with Earlier Task" button to see a comparison between current and earlier task statistics.


## Author

Vetrivel
