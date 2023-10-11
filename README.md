# GameList-back

**GameList-back** é uma aplicação Node.js que fornece uma API para gerenciar informações sobre jogos de videogame. Esta API permite a pesquisa de jogos por nome, bem como o fornecimento de detalhes específicos de um jogo com base no seu ID. A aplicação também inclui uma documentação Swagger para facilitar o entendimento dos endpoints disponíveis.

## Configuração Inicial

Antes de executar a aplicação, você precisa configurar algumas variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e defina as seguintes variáveis:

- **APIKEY**: Chave de API para acessar a API da RAWG (https://rawg.io/apidocs).
- **SWAGGER_SENHA_DOC**: Senha para acessar a documentação Swagger.

Certifique-se de instalar as dependências necessárias executando o seguinte comando:
 
 Executando a Aplicação

##Para iniciar o servidor, utilize o seguinte comando:

-npm start

O servidor será iniciado na porta especificada no arquivo .env (ou na porta 4000 por padrão). Você poderá acessar a API através de http://localhost:<PORTA>/games para pesquisar jogos e http://localhost:<PORTA>/games/:id para obter detalhes específicos de um jogo pelo seu ID.
Geração da Documentação Swagger

A documentação Swagger é gerada automaticamente com base nos endpoints definidos na aplicação. Para gerar ou visualizar a documentação, utilize os seguintes comandos:

    Para gerar a documentação:

    npm run autoDoc

    A documentação será gerada no arquivo swagger/swagger_output.json.

    Para visualizar a documentação, acesse http://localhost:<PORTA>/doc. Será solicitada uma senha para acessar a documentação. Utilize a senha configurada na variável SWAGGER_SENHA_DOC no arquivo .env.

Endpoints Disponíveis

    GET /games: Retorna uma lista de jogos correspondentes à pesquisa.
        Parâmetros de Consulta:
            search (obrigatório): Nome do jogo a ser pesquisado.
        Exemplo de Uso:

        curl -X GET "http://localhost:<PORTA>/games?search=The+Witcher+3"

    GET /games/:id: Retorna detalhes específicos de um jogo com base no seu ID.

    Parâmetros de Rota:
        id (obrigatório): ID do jogo desejado.
    Exemplo de Uso:

        curl -X GET "http://localhost:<PORTA>/games/1234"

Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Se você encontrar problemas ou tiver sugestões, por favor, abra uma nova issue neste repositório.