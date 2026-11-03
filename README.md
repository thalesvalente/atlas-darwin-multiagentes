# Atlas DARWIN — Biblioteca científica de orquestração multiagente

Portal acadêmico estático em português sobre orquestração de agentes de IA e engenharia de software.

**Site:** https://thalesvalente.github.io/atlas-darwin-multiagentes/

## Estrutura V4.2

- `index.html`: abertura visual aprovada e arquitetura DARWIN antes das recomendações de leitura.
- `arquitetura.html`: conceitos, padrões de coordenação, fan-out/fan-in, gates e limites.
- `biblioteca.html`: catálogo filtrável de 15 publicações científicas.
- `artigos/*.html`: 15 fichas de estudo com fontes acadêmicas originais.
- `trilha.html`: percurso de quatro semanas.
- `metodologia.html`, `glossario.html`, `comparar.html`: pesquisa, vocabulário e comparação de abordagens.
- `caderno.html`: anotações pessoais e exportação.
- `questionario.html`: autoavaliação didática.
- `sobre.html`: escopo e observações de proveniência.
- `historico/v3.html`: versão anterior preservada, além do histórico de commits Git.
- `assets/site.css` e `assets/site.js`: arquivos-fonte de estilos e interações; as páginas HTML da V4.2 também incorporam recursos necessários para visualização independente.

## Publicação

GitHub Pages usa a branch `main`, pasta `/(root)`, com `.nojekyll`. O site é estático e não precisa de backend, build Node, banco de dados nem fornecedores externos de aplicação.

Para testar em HTTP localmente, na raiz do repositório:

```bash
python -m http.server 8000
```

Abra http://localhost:8000/.

## Ciência, privacidade e limitações

- “DARWIN / two-wave” é nomenclatura de projeto, **não** uma arquitetura científica formalmente padronizada.
- O gráfico inicial é um **esquema conceitual**, não resultado de experimento nem promessa de ganhos mensurados.
- As referências bibliográficas podem estar abreviadas; confira os documentos e publicadores originais antes de citações formais.
- O site não distribui os PDFs integrais de terceiros; encaminha às fontes originais.
- Anotações e progresso de leitura usam armazenamento local no navegador; exporte seus registros antes de limpar dados. Não existe sincronização ou conta de usuário.
- Não há analytics, scripts de terceiros, e-mails, segredos, `.env` ou dados internos do HidroFloresta neste repositório.

## Preservação e reversão

A V3 aprovada anteriormente foi preservada em `historico/v3.html` e no histórico Git. Para reverter uma publicação, crie um novo commit restaurando os arquivos do commit anterior, sem reescrever o histórico público.

Os testes automatizados verificam estrutura, links, navegação, reflow, funções locais e alguns contrastes; não substituem avaliação de usabilidade com participantes ou certificação WCAG.
