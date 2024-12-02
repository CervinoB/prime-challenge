Feature: Verificação de Login na plataforma

    Scenario: Teste de listagem de clientes
        When teste de resposta bem-sucedida
        Then teste validação dos campos
        Then teste validação de endpoint


    Scenario: Teste de adicionar clientes
        When teste de adição bem-sucedida
        Then teste de campos obrigatórios
        Then teste de validação do e-mail e URL do perfil

    Scenario: Teste de deletar clientes
        When teste de exclusão bem-sucedida
        Then teste de cliente não encontrado
        Then teste de exclusão sem ID


    Scenario: Teste de editar clientes
        When teste de atualização bem-sucedida
        Then teste de cliente não encontrado ao atualizar
        Then teste de atualização sem campos
