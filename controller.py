from flask_restful import Resource



class Prediction(Resource):
    def get(self, url):
        return jsonify(sys.modules["cnn"].predict(url))
