<div align="center">

# Eduq challenge

<img src="./eduq.jpeg" width="150px">

Esse repositório se trata do teste técnico para empresa [EduQ Soluções Educacionais](https://medq.com.br/home2/).


</div>

## Descrição
O projeto faz a simulção de vendas de infoprodutos, e está separado em três serviços diferentes que se interligam entre si.
Cada pasta na raiz é referente a um serviço, que são o de usuário, de venda e o do curso.
O de usuário, é onde é possivel o cadastro de novos usuarios, e tambem determinar os acessos que ele vai ter no serviço de curso de acordo com o infoproduto comprado.
O de vendas, é onde registra a compra e o cancelamento de algum infoproduto.
O serviço de curso, é onde verifica o acesso de cada usuario.

## Tecnologias:
  - NodeJS;
  - Typescript;
  - Mongoose;
  - MongoDB.

## Instruções de uso para API localmente:
- Clone o repositório em sua máquina;
- Acesse as pasta `/usuario`, `/vendas` e `/curso`;
- Rode o comando `npm install` em cada pasta para instalação das dependencias;
- Rode o comando `npm start` em cada pasta para inicializar os serviços;
- As APIs rodarão nas portas 3001, 3002 e 3003 localmente;
- É necessário o serviço do MongoDB funcionando localmente;

## Serviços

### Usuário:
- Esse serviço possui as seguintes rotas:
  - POST, GET: `/users`
  - GET: `/users/:id`
  - GET: `/users/email/:email`
  - PUT: `/users/purchase/:id`
  - PUT: `/users/cancel/:id`

#### POST `/users`:
- API permite que seja criado um novo usuario através do método POST no endpoint `/users` passando no body um json no formato:
```json
    {
      "email": "String no formato de email.",
      "role": "String, onde só pode ser preenchido com PREMIUM_USER e DEFAULT_USER",
      "products": "Array",
    }
```

#### GET `/users`, `/users/:id` e `/users/email/:email`:
- API permite que seja possivel listar todas os usuarios registrados através dp método GET no endpoint `/users`, listar um registro especifico com o endpoint `/users/:id`, passando um id de um usuario já cadastrado, e lista um usuario pelo endpoint `/users/email/:email`, passando um email de um usuario ja cadastrado.

#### PUT `/register/purchase/:id` e `/register/cancel/:id`:
- API permite que seja editado um usuario, através do método PUT no endpoint `/register/purchase/:id` passando o id de um usuario já cadastrado, essa rota é para cadastrar um produto que o usuario adquiriu. Também é possivel editar um usuario pela rota `/register/purchase/:id`, passando o id de um usuario já cadastrado, essa rota é para cancelar um produto que o usuario adquiriu. É necessário passar um body, no formato json com a seguinte chave:
```json
    {
      "productId": "String, onde só pode ser preenchido com 123456 ou 987654"
    }
```

### Vendas:
- Esse serviço possui as seguintes rotas:
  - POST, GET: `/sales`
  - PUT: `/sales/:id`

#### POST `/sales`:
- API permite que seja criado uma nova venda através do método POST no endpoint `/sales` passando no body um json no formato:
```json
    {
      "serviceKey": "String.",
      "buyerEmail": "String, no formato de email, de um usuario ja cadastrado",
      "productId": "String, onde só pode ser preenchido com 123456 ou 987654",
    }
```

#### GET `/sales`:
- API permite que seja possivel listar todas as vendas através dp método GET no endpoint `/sales`.

#### PUT `/sales/:id`:
- API permite que seja editado um usuario, através do método PUT no endpoint `/sales/:id` passando o id de um usuario já cadastrado. Essa rota vai alterar o status da venda, para cancelado. Não é necessário passar nada no body.

### Cursos:
- Esse serviço possui as seguintes rotas:
  - GET: `/course/:course/:id`

#### GET `/course/:course/:id`:
- API permite verificar se o usuario tem acesso de algum curso, através do método GET no endpoint `/course/:course/:id`, onde course é o nome do curso, que tem que ser entre `COURSE_ABCD` ou `COURSE_XYZ`, e o id de algum usuário cadastrado no serviço usuarios.

## Próximos passos no projeto:
- Aprimoramento nos testes;
- Mais testes;
- Implementação login com algum tipo de token de autenticação.

### Considerações finais:
  Dúvidas ou sugestões me contate por:
  - Linkedin: https://www.linkedin.com/in/guicouto90/
  - Email: gui.couto90@yahoo.com.br