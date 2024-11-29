Feature: Verificação de Login na plataforma

Scenario: Teste de resposta bem sucedida list clients
    When eu consulto o ep de listagem de clientes
    Then eu valido a estrutura dos campos
    