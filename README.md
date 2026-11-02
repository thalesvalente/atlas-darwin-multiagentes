# Atlas DARWIN — Biblioteca científica de orquestração multiagente

Site estático dedicado à pesquisa sobre agentes de IA para engenharia de software.

## Conteúdo

- Biblioteca de 15 publicações, com links acadêmicos e PDFs de origem.
- Arquitetura didática de coordenador único, fan-out/fan-in e duas ondas.
- Trilha de quatro semanas, fichamentos, filtros, quiz e exportação.
- Proposta de pesquisa com baseline de agente único, métricas de qualidade e custo.

**Distinguir evidência de proposta:** “DARWIN / two-wave” é nomenclatura de trabalho, não denominação padronizada pela literatura. Dados bibliográficos estão abreviados e devem ser conferidos no publicador antes de citação formal.

## GitHub Pages — sem workflow adicional

1. Crie um repositório **público** `thalesvalente/atlas-darwin-multiagentes`, com branch `main`. Não use o repositório do HidroFloresta.
2. Publique `index.html`, `.nojekyll`, `README.md` e `catalogo.json` na raiz do branch `main`.
3. Em **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/(root)`, depois **Save**.
4. Consulte em **Settings → Pages** o endereço publicado; o padrão para um projeto é `https://thalesvalente.github.io/atlas-darwin-multiagentes/` (endereço previsto; confirmar após o deploy).

Referência oficial: https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Teste local

Abra `index.html` no navegador. Não são necessários Node, Bun, npm, servidor ou provedor de banco.

Para um teste HTTP opcional (com Python instalado): `python -m http.server 8000` na raiz e abra `http://localhost:8000`.

## Privacidade e direitos

- Este site não inclui chaves, cookies, e-mails, dados de usuários ou documentos privados do projeto HidroFloresta.
- As notas de leitura ficam no `localStorage` do navegador. A exportação para Markdown é responsabilidade do leitor.
- Textos integrais dos artigos não são redistribuídos; os links levam às fontes acadêmicas originais.
- Não há rastreamento de analytics nem scripts de terceiros.
- Não inclua `.env`, anexos privados ou artefatos internos ao publicar.
