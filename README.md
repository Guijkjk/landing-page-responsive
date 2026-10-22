# Portfólio — Guilherme Rodrigo

Portfólio em português com HTML semântico, CSS responsivo e JavaScript sem dependências externas.

## Abrir

Abra `dist/index.html` no navegador. Para servir por HTTP, execute na pasta `dist`:

```sh
python -m http.server 8000
```

Acesse `http://localhost:8000`. Para hospedar, use o conteúdo da pasta `dist`.

## Organização

- `dist/index.html`: conteúdo, navegação, seções e metadados.
- `dist/styles.css`: tokens de cor, layout, componentes, responsividade e movimento reduzido.
- `dist/script.js`: menu, abas acessíveis, painel ilustrativo, copiar telefone e navegação ativa.
- `dist/assets/guilherme-rodrigo.png`: foto original fornecida, exibida em preto e branco via CSS.
- `dist/assets/favicon.svg`: símbolo do portfólio.

## Personalizar

As cores ficam em `:root` no começo do CSS. Os dados pessoais e links ficam no HTML. Os textos das abas e números do painel ficam nos objetos `technologies` e `dashboardData` no JavaScript.

O dashboard usa dados fictícios claramente identificados. Não representa resultados de clientes nem um projeto profissional real. Substitua a demonstração por projetos próprios quando desejar.

O número de WhatsApp configurado é `5592982861754`. LinkedIn: `https://www.linkedin.com/in/guilherme-rodrigo-805b6626b/`.

## Acessibilidade

Link para pular ao conteúdo, foco visível, hierarquia de títulos, navegação por teclado nas abas, textos alternativos, estados ARIA e suporte a `prefers-reduced-motion`. Conteúdo principal e contatos funcionam sem JavaScript. Não há formulário, rastreamento, cookies ou coleta de dados no site.
