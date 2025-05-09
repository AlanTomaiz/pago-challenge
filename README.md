# teste-tecnico-backend-2025-trimestre-1
Teste técnico para a posição de Backend Dev. Edição do primeiro trimestre de 2025.

## A proposta: Upload e Streaming de Vídeos + Cache + Docker

- [ ] ROTA `POST /upload/video`
  -[ ] Deve receber um **único vídeo**;
  -[ ] Deve retornar status 400 arquivo invalído;
  -[ ] Deve retornar status 400 caso arquivo maior que 10MB;
  -[ ] Deve retornar status 204 caso sucesso;

- [ ] ROTA `GET /static/video/:filename`
  - [ ] Deve receber um Range por cabeçalho para indicar o offset de streaming;
  - [ ] Deve retornar status 404 caso arquivo inexistente;
  - [ ] Deve retornar o conteúdo completo caso nenhum range seja especificado com código de status 200;
  - [ ] Deve retornar a fatia desejada do conteúdo caso o range seja especificado com código de status 206;

Para infra, vamos usar o seguinte conjunto:
- [ ] `Dockerfile` para fazer o build da imagem a partir da imagem `node:22-alpine`;
- [ ] `docker-compose.yml` para compor um ambiente com algum serviço de cache de sua escolha.
