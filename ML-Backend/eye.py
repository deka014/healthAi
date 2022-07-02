import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os

# E:/healthAi/Dataset/test.jpeg

import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
import cv2
from sklearn.model_selection import train_test_split
from sklearn.utils import shuffle

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout,Flatten
from tensorflow.keras.layers import Conv2D,MaxPool2D
from tensorflow.keras.layers import Input, Dense
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt

from tensorflow.keras.applications.vgg16 import VGG16
import pandas as pd
import numpy as np
import os
from numpy import argmax
import tensorflow as tf
import sys
from PIL import Image as pil_image
import warnings

warnings.filterwarnings("ignore")


img = sys.argv[1]

def predict(img):
    path = "./eye_trained/"
    imported = tf.saved_model.load(path)

    img_rows=224
    img_cols=224

    img_d_list = []
    # target_c = []

    input_img = cv2.imread(img)
    input_img_resize = cv2.resize(input_img,(img_rows,img_cols))

    img_d_list.append(input_img_resize)
    # target_c.append(dataset)

    classes_names_list = ['Bulging_Eyes', 'Cataracts', 'Crossed_Eyes', 'Glaucoma', 'Uveitis']

    num_classes = len(classes_names_list)
    # print("num_classes",num_classes)

    im_data = np.array(img_d_list) # convert images in numpy array
    im_data = im_data.astype('float32')
    im_data /= 255

    num_of_s = im_data.shape[0]
    input_sh = im_data[0].shape

    results = imported(im_data)[0].numpy()

    for index in range(len(results)):
        if max(results) == results[index]:
            return classes_names_list[index]


disease = predict(img)

print(disease)
