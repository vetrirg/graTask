import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.chunk import ne_chunk

# Download NLTK data (if not already downloaded)
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('vader_lexicon')
nltk.download('maxent_ne_chunker')
nltk.download('words')

def analyze_text(text):
    tokenized_text = nltk.word_tokenize(text)
    num_words = len(tokenized_text)
    num_unique_words = len(set(tokenized_text))
    num_stopwords = len([word for word in tokenized_text if word.lower() in nltk.corpus.stopwords.words('english')])
    num_sentences = len(nltk.sent_tokenize(text))

    # Part-of-speech tagging
    pos_tags = nltk.pos_tag(tokenized_text)
    num_nouns = len([word for word, pos in pos_tags if pos.startswith('NN')])

    # Average word length
    avg_word_length = sum(len(word) for word in tokenized_text) / num_words if num_words > 0 else 0

    # Type-Token Ratio (TTR)
    ttr = num_unique_words / num_words if num_words > 0 else 0

    # Sentiment analysis
    sentiment_analyzer = SentimentIntensityAnalyzer()
    compound_sentiment_score = sentiment_analyzer.polarity_scores(text)['compound']

    # Named Entity Recognition (NER)
    ner_tags = ne_chunk(pos_tags)
    num_named_entities = len([chunk for chunk in ner_tags if hasattr(chunk, 'label')])

    return {
        'numWords': num_words,
        'numUniqueWords': num_unique_words,
        'numStopwords': num_stopwords,
        'numSentences': num_sentences,
        'numNouns': num_nouns,
        'avgWordLength': avg_word_length,
        'ttr': ttr,
        'compoundSentimentScore': compound_sentiment_score,
        'numNamedEntities': num_named_entities,
        # Add other statistics here
    }
