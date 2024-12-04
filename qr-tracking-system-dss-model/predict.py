from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from flask_cors import CORS

# Flask uygulaması oluşturuluyor
app = Flask(__name__)
CORS(app)  # Bu satır, tüm kaynaklardan gelen istekleri kabul eder.

# Modeli ve vektörleştiriciyi yükleyin
data = pd.read_csv('dataset.csv')
data = data.dropna()

X = data['title']
y = data['main_category']

vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X_tfidf = vectorizer.fit_transform(X)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_tfidf, y)

# API endpoint: Kategoriyi tahmin et
@app.route('/predict', methods=['POST'])
def predict_category():
    data = request.get_json()
    product_title = data['title']  # Kullanıcının gönderdiği başlık
    product_tfidf = vectorizer.transform([product_title])
    prediction = model.predict(product_tfidf)
    return jsonify({"category": prediction[0]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
