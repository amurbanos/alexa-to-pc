# Alexa PC Controller

Este projeto executar comandos no pc através da Amazon Alexa.

## Requisitos

- Node.js (versão 14 ou superior)
- NPM (geralmente vem com o Node.js)
- Conta de desenvolvedor da Alexa
- ngrok (para expor seu servidor local)

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Configuração

1. Crie um arquivo `.env` na pasta ./api do projeto com as seguintes variáveis:
```
PORT=3000
ALEXA_SKILL_ID=seu_skill_id
ALEXA_ACCESS_TOKEN=seu_access_token
```

2. Configure o ngrok para expor seu servidor local:
```bash
ngrok http 3000
```

3. Crie uma skill na Alexa Developer Console (https://developer.amazon.com/alexa/console/ask)

4. Configure o modelo de interação da skill com o seguinte JSON:
```json
{
    "interactionModel": {
        "languageModel": {
            "invocationName": "vscode controller",
            "intents": [
                {
                    "name": "OpenVSCodeIntent",
                    "samples": [
                        "abrir vscode",
                        "abrir visual studio code",
                        "iniciar vscode",
                        "iniciar visual studio code"
                    ]
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                }
            ]
        }
    }
}
```

5. Configure o endpoint da skill:
   - Na Alexa Developer Console, vá para a seção "Endpoint"
   - Selecione "HTTPS"
   - Cole a URL do ngrok + `/alexa` (exemplo: `https://seu-subdominio.ngrok.io/alexa`)
   - Selecione "My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority"

## Executando o projeto

1. Inicie o servidor:
```bash
npm run dev
```

2. Mantenha o ngrok rodando em um terminal separado:
```bash
ngrok http 3000
```

## Comandos Disponíveis

- "Alexa, abrir vscode"
- "Alexa, abrir visual studio code"
- "Alexa, iniciar vscode"
- "Alexa, iniciar visual studio code"
- "Alexa, ajuda" (para ver os comandos disponíveis)
- "Alexa, para" (para encerrar a skill)
- "Alexa, cancelar" (para encerrar a skill)

## Estrutura do Projeto

- `src/` - Código fonte do projeto
  - `controllers/` - Controladores da aplicação
  - `handlers/` - Handlers da Alexa
  - `index.js` - Arquivo principal do servidor

## Segurança

Este projeto requer que o VSCode esteja instalado e acessível. Certifique-se de:
1. Manter suas credenciais da Alexa seguras
2. Não compartilhar sua URL do ngrok publicamente

## Solução de Problemas

1. Se a Alexa não responder:
   - Verifique se o servidor está rodando
   - Confirme se o ngrok está ativo
   - Verifique os logs do servidor para erros

2. Se o VSCode não abrir:
   - Verifique se o VSCode está instalado
   - Confirme se o comando `code` está no PATH do sistema
   - Tente abrir o VSCode manualmente para verificar se está funcionando

3. Se a skill não reconhecer comandos:
   - Verifique se o modelo de interação está configurado corretamente
   - Confirme se o invocation name está correto
   - Tente recompilar o modelo de interação


   npm run dev:full
