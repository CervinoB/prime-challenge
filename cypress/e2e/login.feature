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

  Scenario: Realizar Logout com sucesso ao clicar em “Finalizar”
    When eu clico em “Finalizar” para realizar logout
    Then eu devo ser deslogado com sucesso

  Scenario: Recuperar senha de acesso
    When eu tento recuperar minha senha de acesso
    Then eu devo receber um email com instruções para redefinir minha senha

  Scenario: Validar preenchimento “Informações do Candidato” ao clicar em “Finalizar e Enviar”
    When eu preencho as Informações do Candidato e clico em Finalizar e Enviar
    Then eu devo ver uma mensagem de confirmação indicando que as informações foram enviadas com sucesso