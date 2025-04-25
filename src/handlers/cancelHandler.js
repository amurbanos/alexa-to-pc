const CancelIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent';
    },
    handle(handlerInput) {
        const speechText = 'Até logo!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

module.exports = { CancelIntentHandler }; 