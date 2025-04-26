const fs = require('fs');
const path = require('path');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        try {
            const commandsPath = path.join(__dirname, '../../../front/commands.json');
            const commandsData = fs.readFileSync(commandsPath, 'utf8');
            const commands = JSON.parse(commandsData);
            
            const commandNames = commands.map(cmd => cmd.name).join(', ');
            const speechText = `Bem-vindo. Os comandos disponíveis são: ${commandNames}.`;

            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        } catch (error) {
            console.error('Erro ao carregar comandos:', error);
            const speechText = 'Desculpe, não foi possível carregar a lista de comandos.';

            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    }
};

module.exports = { LaunchRequestHandler }; 