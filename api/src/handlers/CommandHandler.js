const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const CommandHandler = {
    commands: null,

    loadCommands() {
        try {
            const commandsPath = path.join(__dirname, '../../../front/commands.json');
            const commandsData = fs.readFileSync(commandsPath, 'utf8');
            this.commands = JSON.parse(commandsData);
        } catch (error) {
            console.error('Erro ao carregar comandos:', error);
            this.commands = [];
        }
    },

    canHandle(handlerInput) {
        if (!this.commands) {
            this.loadCommands();
        }

        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },

    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        console.log('Processando requisição para o intent:', intentName);

        return new Promise((resolve, reject) => {
            try {
                const command = this.commands.find(cmd => 
                    cmd.name.toLowerCase() === intentName.toLowerCase()
                );

                if (!command) {
                    const response = handlerInput.responseBuilder
                        .speak('Desculpe, não encontrei o comando solicitado.')
                        .getResponse();
                    resolve(response);
                    return;
                }

                exec(command.comandsh, (error, stdout, stderr) => {
                    console.log('Resultado do comando:', { error, stdout, stderr });
                    
                    if (error) {
                        console.error('Erro ao executar comando:', error);
                        const response = handlerInput.responseBuilder
                            .speak(`Desculpe, não foi possível executar o comando ${command.name}.`)
                            .getResponse();
                        resolve(response);
                        return;
                    }

                    const response = handlerInput.responseBuilder
                        .speak(`Executando o comando ${command.name}.`)
                        .getResponse();
                    resolve(response);
                });
            } catch (err) {
                console.error('Erro inesperado:', err);
                const response = handlerInput.responseBuilder
                    .speak('Ocorreu um erro inesperado ao tentar executar o comando.')
                    .getResponse();
                resolve(response);
            }
        });
    }
};

module.exports = { CommandHandler }; 