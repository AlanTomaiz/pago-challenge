# teste-tecnico-backend-2025-trimestre-1
Teste técnico para a posição de Backend Dev. Edição do primeiro trimestre de 2025.

## A proposta: Upload e Streaming de Vídeos + Cache + Docker

- [x] ROTA `POST /upload/video`
  -[x] Deve receber um **único vídeo**;
  -[x] Deve retornar status 400 arquivo invalído;
  -[x] Deve retornar status 400 caso arquivo maior que 10MB;
  -[x] Deve retornar status 204 caso sucesso;

- [x] ROTA `GET /static/video/:filename`
  - [x] Deve receber um range por cabeçalho para indicar o offset de streaming;
  - [x] Deve retornar status 404 caso arquivo inexistente;
  - [x] Deve retornar o conteúdo completo caso nenhum range seja especificado com código de status 200;
  - [x] Deve retornar a fatia desejada do conteúdo caso o range seja especificado com código de status 206;

Para infra, vamos usar o seguinte conjunto:
- [x] `Dockerfile` para fazer o build da imagem a partir da imagem `node:22-alpine`;
- [x] `docker-compose.yml` para compor um ambiente com algum serviço de cache de sua escolha.
