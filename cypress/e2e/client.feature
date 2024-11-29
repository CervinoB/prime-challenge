Feature: Cadastro e Gerenciamento de Clientes

  Background: Navego para a página home e faço o login
    When navego para a página de login atraves da home
    Then preencho os dados e logo com sucesso na plataforma

  Scenario: Realizar Cadastro de Clientes com sucesso na aba Perfil
    When eu insiro todas as informações necessárias e válidas para cadastrar um cliente
    Then o cliente deve ser cadastrado com sucesso

  Scenario: Validar Pesquisa de Cliente recém cadastrado e exibição dos dados em tela
    When eu realizo a pesquisa pelo nome ou email do cliente na listagem
    Then os dados completos do cliente devem ser exibidos corretamente na tela

  Scenario: Editar Cliente através do botão na listagem de clientes
    When eu clico no botão de editar para esse cliente
    When eu altero informações válidas do cliente
    Then as alterações devem ser salvas com sucesso

@focus
  Scenario: Validar Cadastro de Clientes com Email inválido e campos obrigatórios na aba Perfil
    When eu tento cadastrar um cliente com um email inválido e sem preencher os campos obrigatórios
    Then eu devo ver uma mensagem de erro indicando que o email é inválido e falta de campos preenchidos
  
