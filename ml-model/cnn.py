import pandas as pd
from fastai.vision.learner import load_learner
from fastai.vision.image import open_image
from PIL import Image
import sys
import requests
from io import BytesIO

def predict(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).resize((512,384), Image.ANTIALIAS)
    filename = "./ml-model/data/img.jpg"
    img.save(filename)

    learn = load_learner("./ml-model/")

    category = str(learn.predict(open_image(filename))[0])
    tensor_probs = learn.predict(open_image(filename))[2]
    pred_probs = {
    "cardboard": round(float(tensor_probs[0]),2),
    "glass": round(float(tensor_probs[1]),2),
    "metal": round(float(tensor_probs[2]),2),
    "paper": round(float(tensor_probs[3]),2),
    "plastic": round(float(tensor_probs[4]),2),
    "trash": round(float(tensor_probs[5]),2)
    }
    ans = {
    "url": url,
    "category": category,
    "pred_probs": pred_probs
    }

    return ans
