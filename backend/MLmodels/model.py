from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        text = data['text']

        tokens = tokenizer.encode(text, return_tensors='pt')
        result = model(tokens)
        logits = result.logits
        predicted_class = int(torch.argmax(logits)) + 1

        return jsonify({'sentiment_class': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)})
    

new_data = pickle.load(open('recommender.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        title = request.json['title']
        print(title)

        index = new_data[new_data['title'] == title].index[0]

        distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])

        recommended_movies = [new_data.iloc[distance[0]]['id'] for distance in distances[1:5]]

        return jsonify({'recommendations': recommended_movies})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
