# Prime Challenge

## Seção 1 -> BDD

### Cenário

Neste projeto, utilizei a linguagem Gherkin para definir cenários de teste de forma clara e compreensível, e o Cypress para automatizar esses testes end-to-end, garantindo que o comportamento do sistema esteja conforme o esperado, melhorando a qualidade do software e acelerando o processo de desenvolvimento.

```Gherkin
Scenario: Criar uma nova conta com sucesso
  When eu tento criar uma nova conta com um email válido
  Then eu devo ver uma mensagem de sucesso indicando que a conta foi criada

Scenario: Validar criação de uma conta com email já cadastrado
  When eu tento criar uma nova conta com um email já cadastrado
  Then eu devo ver uma mensagem de erro indicando que o email já está em uso
```
## Seção 2 -> Automação com Cypress

### [GitHub Repo](https://github.com/CervinoB/prime-challenge)

#### Instalação

##### Clonar Repositório

```bash
git clone git@github.com:CervinoB/prime-challenge.git ; cd prime-challenge
```

##### Instalar dependências

```bash
npm install
```

##### Iniciar Cypress

```bash
npx cypress open
```

ou executar testes e2e individuais

```bash
npm run --spec "<specPath>"
```

## URLs

- [URL WEB](https://challenge.primecontrol.com.br/)
- [API](https://api-challenge.primecontrol.com.br/listClients)

João Pedro Cervino Barbosa
<jcervinobarbosa@gmail.com>
