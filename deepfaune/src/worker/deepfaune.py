from src.deepfaune.predictTools import Predictor
import time

## PREDICTOR OBJECT
LANG = 'fr'
MAXLAG = 20
THRESHOLD = 0.5


def predict(filenames: list):
    predictor = Predictor(filenames, THRESHOLD, LANG)

    ## RUNNING BATCHES OF PREDICTION
    predictor.allBatch()

    ## GETTING THE RESULTS
    ## without using the sequences
    predictedclass_base, predictedscore_base = predictor.getPredictions()
    ## or using the sequences
    predictedclass, predictedscore = predictor.getPredictionsWithSequences(MAXLAG)

    ## OUTPUT
    dates = predictor.getDates()
    seqnum = predictor.getSeqnums()

    return {'filename':filenames, 'dates':dates, 'seqnum':seqnum, 'predictionbase':predictedclass_base, 'scorebase':predictedscore_base, 'prediction':predictedclass, 'score':predictedscore}