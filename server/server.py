from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk_utils import analyze_text
import csv

app = Flask(__name__)
CORS(app)

# Sample individual results (replace this with actual results)
individual_results = [
    {"numWords": 200, "numUniqueWords": 150, "numStopwords": 50, "numSentences": 10, "numNouns": 80,
     "avgWordLength": 5.2, "ttr": 0.75, "compoundSentimentScore": 0.2, "numNamedEntities": 5},
    # Add other individual results here
]
#read the csv file aggregated_results.csv and store the data in new variable agg_results
agg_results = []
with open('aggregated_results.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        agg_results.append(row)

#change the agg_results header to match the header in individual_results and store it in new variable agg_results_new
agg_results_new = []
for i in agg_results:
    agg_results_new.append({'numWords': i['Number of Words'], 'numUniqueWords': i['Number of Unique Words'], 'numStopwords': i['Number of Stopwords'], 'numSentences': i['Number of Sentences'], 'numNouns': i['Number of Nouns'], 'avgWordLength': i['Average Word Length'], 'ttr': i['Type-Token Ratio'], 'compoundSentimentScore': i['Compound Sentiment Score'], 'numNamedEntities': i['Number of Named Entities']})


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    stats = analyze_text(text)
    return jsonify(stats)


@app.route('/aggregated-results', methods=['GET'])
def aggregated_results():
    return jsonify(agg_results_new)


if __name__ == '__main__':
    app.run(port=5000)
