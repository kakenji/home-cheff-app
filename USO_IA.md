01/10/2026
A IA Replit foi utilizada para dar base e gerar protótipos funcionais e navegáveis para a aplicação. O seguinte prompt foi utilizado:
Crie um protótipo de interface mobile para um app de gestão de receitas e compras. Desenhe uma tela inicial, uma tela de despensa e uma tela de emergência (painel de apoio a vítimas de violência), acessada via gatilho oculto de sua escolha. Utilize dados mockados.

19/11/2026
Usamos o Claude, pelo Claude Code no VS Code, como apoio em algumas tarefas do projeto. A estrutura do app, as telas, a API e as regras de negócio já tinham sido feitas pelo grupo. Nós definimos o que precisava ser feito, e a IA ajudou a implementar e testar:

- Banco de dados: troca do arquivo JSON da API pelo MongoDB Atlas. A IA adaptou o banco.js, o Repositorio e as rotas para que todas as operações passem pelo banco, mantendo as validações e as respostas que o grupo já tinha feito. A URL de conexão fica no arquivo .env, que não vai para o GitHub.
- Testes: os endpoints foram testados num MongoDB local, e o atalho e o botão de emergência foram testados na versão web do app. Ainda falta testar no celular.
- Também ajudou a explicar o erro de autenticação do git push (o GitHub exige um token).