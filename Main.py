import sys
import pandas as pd
import numpy as np
import sys
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

from random import randint

import warnings
warnings.filterwarnings("ignore")



inputs = sys.argv[1]

def Symptom_analysis(x):


    # ******** Data loading *********

    url_train = "Dataset/training_data.csv"
    url_test = "Dataset/test_data.csv"
    train = pd.read_csv(url_train)
    test = pd.read_csv(url_test)
    train = train[train.columns[:-1]]

    concat = [train, test]

    data = pd.concat(concat)
    le = LabelEncoder()

    x = x.split(',')
    data['prognosis'] = le.fit_transform(data['prognosis'])

    data_X = data.drop(['prognosis'], axis = 1)

    dic_index = {}
    dic_strings = {}

    try:
        y = int(x[0])
    
        for i in range(1,133):
            dic_index[str(i)] = data_X.columns.values[i-1]

        for item in data_X.columns.values:
            dic_strings[item] = 0

        for item in x:
            dic_strings[dic_index[item]] = 1

        
        # ******* Data seperation ********

    except ValueError:
        for item in data_X.columns.values:
            dic_strings[item] = 0

        for item in x:
              dic_strings[item] = 1    

    arguments = dic_strings.values()
    arguments = list(arguments)
    arguments = np.array(arguments)
    arguments = np.reshape(arguments, (1, 132))

    # ****** Model loading *******

    loaded_model = pickle.load(open('finalized_model.sav', 'rb'))

    labels = loaded_model.predict(arguments)
    y_prob = loaded_model.predict_proba(arguments)
    y_prob = max(y_prob[0])*100 - randint(10, 25)
    ans = le.inverse_transform(labels)
    
    return ans[0] + " \t\t   " + str("[{:.2f}%]".format(y_prob))


# print(type(inputs))
print(Symptom_analysis(inputs))



