require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const { SkillBuilders } = require('ask-sdk');
const { CommandHandler } = require('./handlers/CommandHandler');
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
        CommandHandler,
        HelpIntentHandler,
        StopIntentHandler,
        CancelIntentHandler
    )
    .create();

const adapter = new ExpressAdapter(skillBuilder, true, true);

// Rota da Alexa deve ser configurada antes de qualquer outro middleware
app.post('/alexa', adapter.getRequestHandlers());

// Middleware para parsear JSON
app.use(express.json());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../front')));

// Rota para salvar comandos
app.post('/api/commands', (req, res) => {
    try {
        const commandsPath = path.join(__dirname, '../../front/commands.json');
        fs.writeFileSync(commandsPath, JSON.stringify(req.body, null, 2));
        res.status(200).json({ message: 'Comandos salvos com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar comandos:', error);
        res.status(500).json({ error: 'Erro ao salvar comandos' });
    }
});

// Rota principal que serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../front/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 