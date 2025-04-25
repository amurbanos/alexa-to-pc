require('dotenv').config();
const express = require('express');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const { SkillBuilders } = require('ask-sdk');
const { OpenVSCodeIntentHandler } = require('./handlers/openVSCodeHandler');
const { LaunchRequestHandler } = require('./handlers/launchHandler');
const { HelpIntentHandler } = require('./handlers/helpHandler');
const { StopIntentHandler } = require('./handlers/stopHandler');
const { CancelIntentHandler } = require('./handlers/cancelHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do skill da Alexa
const skillBuilder = SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        OpenVSCodeIntentHandler,
        HelpIntentHandler,
        StopIntentHandler,
        CancelIntentHandler
    )
    .create();

const adapter = new ExpressAdapter(skillBuilder, true, true);

app.post('/alexa', adapter.getRequestHandlers());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 