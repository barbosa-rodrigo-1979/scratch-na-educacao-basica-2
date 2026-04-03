# Cartilha Pedagógica: Scratch no Ensino Fundamental II

[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Status](https://img.shields.io/badge/status-finalizado-brightgreen)
![Scratch](https://img.shields.io/badge/Scratch-3.0-orange)

> **Portal interativo para professores do 6º ao 9º ano** – sequência didática completa com projetos, planos de aula e alinhamento à BNCC/DCE-PR.

## 📖 Sobre o Projeto

Este repositório contém o código-fonte de uma **cartilha pedagógica digital** desenvolvida na Universidade Tecnológica Federal do Paraná (UTFPR) – Campus Siqueira Campos. O material foi criado para apoiar professores do Ensino Fundamental II na implementação de uma sequência didática de **Pensamento Computacional** utilizando a plataforma **Scratch**.

A cartilha apresenta uma progressão anual (6º ao 9º ano) que aprofunda conceitos de programação: estruturas de dados (listas), blocos personalizados (procedimentos), clones, simulações e uma ponte para linguagens textuais como Python. Todos os projetos estão alinhados à **Base Nacional Comum Curricular (BNCC)** e às **Diretrizes Curriculares do Estado do Paraná (DCE-PR)**.

## 🧩 Estrutura do Site

O portal é composto por **8 páginas HTML** interligadas, estilizadas com CSS responsivo e com suporte a tema claro/escuro:

| Página | Descrição |
|--------|------------|
| `index.html` | Página inicial com apresentação, resumo acadêmico e visão geral da sequência didática |
| `primeiros_passos.html` | Guia completo para professores: interface do Scratch, primeiros projetos, recursos avançados (listas, blocos personalizados, clones) |
| `projetos_6_ano.html` | Projetos para o 6º ano: narrativa interativa, labirinto numérico, decisões territoriais, experimento científico |
| `projetos_7_ano.html` | Projetos para o 7º ano: quiz educativo, desafio numérico, planejador urbano, simulador ecológico |
| `projetos_8_ano.html` | Projetos para o 8º ano: ecossistema dinâmico, fractais com clones, urbanização, herança genética |
| `projetos_9_ano.html` | Projetos para o 9º ano: Super Trunfo (listas + blocos personalizados), simulador de juros compostos, dinâmica populacional, hereditariedade |
| `planos_de_aula.html` | Planos de aula detalhados (4 a 5 aulas cada) por ano e por disciplina (Língua Portuguesa, Matemática, Geografia, Ciências) |
| `referencias_BNCC.html` | Alinhamento curricular completo, referências bibliográficas e instruções de citação |

### Recursos comuns a todas as páginas:
- Cabeçalho com logotipo UTFPR e menu de navegação
- Rodapé com informações institucionais e links úteis
- Botão flutuante para alternar entre tema **claro/escuro**
- Design responsivo (adaptado para desktop e dispositivos móveis)
- Blocos de código Scratch simulados em texto (`<div class="scratch-code">`)

## 🛠️ Tecnologias Utilizadas

- **HTML5** – estrutura semântica das páginas
- **CSS3** – estilização responsiva, grid/flexbox, suporte a temas claro/escuro
- **JavaScript** (Vanilla) – funcionalidades:
  - Alternância de tema (armazenamento local)
  - Impressão seletiva de projetos (`printProjetos7Btn`, `printPrimeirosPassosBtn`)
  - Comportamentos interativos do menu
- **Imagens** – logotipo UTFPR e ilustrações dos projetos (arquivos `.png`)

## 🚀 Como Utilizar este Material

### 1. Visualização local
Faça o download ou clone este repositório e abra qualquer arquivo `.html` em seu navegador:

```bash
git clone https://github.com/seu-usuario/scratch-ef2-cartilha.git
cd scratch-ef2-cartilha
# Abra index.html no seu navegador
```

### 2. Em sala de aula
- Utilize os **projetos** como roteiro para as aulas práticas de programação com Scratch.
- Consulte os **planos de aula** para organização temporal (duração, etapas, avaliação).
- Use as **referências BNCC** para justificar o trabalho interdisciplinar.
- Projete o portal diretamente para os alunos acompanharem os passos de implementação.

### 3. Adaptação e customização
Todo o código é aberto e pode ser modificado livremente sob a licença MIT. Sugestões:
- Substitua as imagens placeholder pelas capturas de tela reais dos projetos dos seus alunos.
- Altere as cores do tema no arquivo `style.css` (variáveis CSS).
- Adicione novos projetos seguindo o padrão das seções existentes.

## 🤝 Como Contribuir

Contribuições são bem-vindas! Você pode ajudar de várias formas:

- **Correções de bugs** ou melhorias de acessibilidade (HTML/CSS/JS)
- **Novos projetos** ou planos de aula (siga o formato das seções existentes)
- **Tradução** para outros idiomas
- **Documentação** – sugestões para este README ou comentários no código

Para contribuir:
1. Faça um *fork* do projeto
2. Crie uma *branch* para sua modificação (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para o *branch* (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

## 📄 Licença

Este projeto está licenciado sob os termos da **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2026 Gisele Nunes e Rodrigo Barbosa (UTFPR - Campus Siqueira Campos)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Autores

- **Gisele Nunes** – [giseleacn@gmail.com](mailto:giseleacn@gmail.com)
- **Rodrigo Barbosa** – [barbosa.rodrigo.1979@gmail.com](mailto:barbosa.rodrigo.1979@gmail.com)

**Orientador:** Prof. Alexandre Busquim  
**Instituição:** Universidade Tecnológica Federal do Paraná – Campus Siqueira Campos  
**Ano:** 2026

## 🙏 Agradecimentos

- **MIT Media Lab** pelo desenvolvimento e disponibilização gratuita do Scratch.
- **Comunidade Scratch Brasil** pelas trocas de experiências e inspirações.
- **UTFPR** pelo apoio institucional e incentivo à produção de materiais educacionais abertos.
