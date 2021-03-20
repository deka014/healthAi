import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import tree
import os

from sklearn.preprocessing import normalize
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.model_selection import train_test_split

from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.metrics import classification_report

from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_val_predict

from sklearn.neural_network import MLPClassifier

from sklearn import preprocessing
from sklearn.model_selection import train_test_split

import pickle

import warnings
warnings.filterwarnings("ignore")

def Symptom_analysis():

    # ******** Data loading *********

    url_train = "Dataset/training_data.csv"
    url_test = "Dataset/test_data.csv"
    train = pd.read_csv(url_train)
    test = pd.read_csv(url_test)
    train = train[train.columns[:-1]]

    concat = [train, test]

    data = pd.concat(concat)
    le = LabelEncoder()

    data['prognosis'] = le.fit_transform(data['prognosis'])

    # ******* Data seperation ********

    array = data.values
    X = array[:, 0:132]
    y = array[:, 132]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=10)

    X_valid, X_test, y_valid, y_test = train_test_split(X_test, y_test, test_size=0.5, random_state=42)

    # ****** Model loading *******

    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))

    x = [0, 1, 1, 0, 1, 1 , 1, 1, 0, 1, 0]
    x = x + [0 for i in range(121)]
    x = [x]

    y = loaded_model.predict(x)

    ans = le.inverse_transform(y)

    return ans[0]

print(Symptom_analysis())

# symptom_arr = data.columns.values
