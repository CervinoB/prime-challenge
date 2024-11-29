Feature: Verificação de Login na plataforma

  Scenario: Criar uma nova conta com sucesso
    When eu tento criar uma nova conta com um email válido
    Then eu devo ver uma mensagem de sucesso indicando que a conta foi criada

  Scenario: Validar criação de uma conta com email já cadastrado
    When eu tento criar uma nova conta com um email já cadastrado
    Then eu devo ver uma mensagem de erro indicando que o email já está em uso

  Scenario: Realizar login com sucesso
    When eu insiro credenciais de login válidas
    Then eu devo ser logado com sucesso

  Scenario: Validar login com senha inválida
    When eu insiro uma senha inválida
    Then eu devo ver uma mensagem de erro indicando que a senha está incorreta