const { exec } = require('child_process');

class CommandHandler {
    constructor() {
        this.name = 'CommandHandler';
    }

    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OpenVSCodeIntent';
    }

    handle(handlerInput) {
        return new Promise((resolve, reject) => {
            exec('code', (error) => {
                if (error) {
                    const response = handlerInput.responseBuilder
                        .speak('Desculpe, não foi possível executar o comando.')
                        .getResponse();
                    resolve(response);
                    return;
                }

                const response = handlerInput.responseBuilder
                    .speak('Executando o comando.')
                    .getResponse();
                resolve(response);
            });
        });
    }
}

module.exports = CommandHandler; 