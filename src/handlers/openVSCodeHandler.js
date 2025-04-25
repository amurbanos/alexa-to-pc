const { exec } = require('child_process');

const OpenVSCodeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OpenVSCodeIntent';
    },
    handle(handlerInput) {
        return new Promise((resolve, reject) => {
            exec('code', (error) => {
                if (error) {
                    const response = handlerInput.responseBuilder
                        .speak('Desculpe, não foi possível abrir o Visual Studio Code. Verifique se ele está instalado corretamente.')
                        .getResponse();
                    resolve(response);
                    return;
                }

                const response = handlerInput.responseBuilder
                    .speak('Abrindo o Visual Studio Code para você.')
                    .getResponse();
                resolve(response);
            });
        });
    }
};

module.exports = { OpenVSCodeIntentHandler }; 