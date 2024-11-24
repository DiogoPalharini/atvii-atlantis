import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class EdicaoCliente extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        console.clear();
        console.log("Iniciando a edição de cliente...");

        const armazem = Armazem.InstanciaUnica;
        const clientes = armazem.Clientes;

        // Listar todos os clientes e dependentes
        console.log("Selecione o cliente que deseja editar:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome} (${cliente.Titular ? 'Dependente' : 'Titular'})`);
        });

        const clienteIndex = this.entrada.receberNumero('Digite o número do cliente desejado:') - 1;

        // Validar o cliente selecionado
        if (clienteIndex >= 0 && clienteIndex < clientes.length) {
            const cliente = clientes[clienteIndex];

            console.log(`Editando informações de ${cliente.Nome}...`);

            // Menu de edição
            console.log("O que deseja editar?");
            console.log("1 - Nome");
            console.log("2 - Nome Social");
            console.log("3 - Data de Nascimento");
            console.log("0 - Cancelar");

            const opcaoEdicao = this.entrada.receberNumero("Escolha uma opção:");

            switch (opcaoEdicao) {
                case 1:
                    cliente.Nome = this.entrada.receberTexto("Digite o novo nome:");
                    console.log("Nome atualizado com sucesso!");
                    break;
                case 2:
                    cliente.NomeSocial = this.entrada.receberTexto("Digite o novo nome social:");
                    console.log("Nome social atualizado com sucesso!");
                    break;
                case 3:
                    cliente.DataNascimento = this.entrada.receberData("Digite a nova data de nascimento:");
                    console.log("Data de nascimento atualizada com sucesso!");
                    break;
                case 0:
                    console.log("Edição cancelada.");
                    break;
                default:
                    console.log("Opção inválida.");
            }
        } else {
            console.log("Cliente inválido.");
        }
    }
}
