import numpy as np
from pyvi import ViTokenizer
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min
from gensim.models import KeyedVectors
from pyvi import ViTokenizer
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import scipy
from gensim.models.doc2vec import Doc2Vec
from flask import request, Flask, jsonify
from flask_cors import CORS

# Load word2vec pretrained
word2vec_model = KeyedVectors.load_word2vec_format('baomoi.vn.model.bin', binary=True)
embedd_vectors = word2vec_model.vectors
unknown_embedd = np.zeros(300)
#Load doc2vec pretrained
model= Doc2Vec.load("d2v.model")

def word_embedding(sen):
    embeded = 0
    word_list = ViTokenizer.tokenize(sen).split()
    for i in range(len(word_list)):
        if ((word_list[i] in word2vec_model.index2word) == True):
            embeded = embeded + word2vec_model.get_vector(word_list[i])
        else:
            embeded = embeded + unknown_embedd
    return embeded

def doc_embedding(sen):
    return model.infer_vector(nltk.word_tokenize(sen))

def tf_embedding(data):
    sentences = nltk.sent_tokenize(data)
    tf=TfidfVectorizer(min_df=5,max_df=0.8,max_features=3000,sublinear_tf=True)
    tf.fit(sentences)
    tfidf_vec=tf.transform(sentences)
    newtf = scipy.sparse.csr_matrix.toarray(tfidf_vec)
    return newtf

def vec(data,mode):
    data = data.lower()
    sentences = nltk.sent_tokenize(data)
    index = []
    vec = []
    if (mode == 'all'):
        newtf = tf_embedding(data)
        for i in range(len(sentences)):
            concated = np.concatenate((word_embedding(sentences[i]),newtf[i],doc_embedding(sentences[i])),axis=0)
            vec.append(concated)
            index.append(i)
    if (mode == 'd2v'):
        for i in range(len(sentences)):
            vec.append(doc_embedding(sentences[i]))
            index.append(i)
    if (mode == 'w2v'):
        for i in range(len(sentences)):
            vec.append(word_embedding(sentences[i]))
            index.append(i) 
    if (mode == 't2v'):
        vec = tf_embedding(data)
    return vec

def summary(data,mode):
    avg = []
    vector = vec(data,mode)
    sentences = nltk.sent_tokenize(data)
    n_clusters = len(sentences)//3
    kmeans = KMeans(n_clusters=n_clusters)
    kmeans = kmeans.fit(vector)
    for j in range(n_clusters):
        idx = np.where(kmeans.labels_ == j)[0]
        avg.append(np.mean(idx))
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, vector)
    ordering = sorted(range(n_clusters), key=lambda k: avg[k])
    summary = ' '.join([sentences[closest[idx]] for idx in ordering])
    return summary

app = Flask(__name__)
CORS(app)

@app.route('/text_summary', methods=["POST"])
def text_summary():
    content = request.get_json()
    mode = content['mode']
    text = content['mytext'] 
    print("mode:",mode,"\ntext:", text)
    result = summary(text,mode)
    # result = 'xin chào đức anh'
    print(result)
    return jsonify({"content":result})

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)


# import requests
# res = requests.post('http://localhost:5000/text_summary', json={"mytext":"trường tiểu. tôi không. tôi có. tôi thường","mode":"d2v"})
# if res.ok:
#     print(res.json())