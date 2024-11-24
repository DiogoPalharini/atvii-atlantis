import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExclusaoCliente extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        console.clear();
        console.log("Iniciando a exclusão de cliente...");

        const armazem = Armazem.InstanciaUnica;
        const clientes = armazem.Clientes;

        // Listar todos os clientes
        console.log("Selecione o cliente que deseja excluir:");
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome} (${cliente.Titular ? 'Dependente' : 'Titular'})`);
        });

        const clienteIndex = this.entrada.receberNumero('Digite o número do cliente desejado:') - 1;

        // Validar a seleção
        if (clienteIndex >= 0 && clienteIndex < clientes.length) {
            const cliente = clientes[clienteIndex];

            if (cliente.Titular) {
                // Remover dependente da lista de dependentes do titular
                cliente.Titular.removerDependente(cliente);
                console.log(`Dependente ${cliente.Nome} foi excluído com sucesso!`);
            } else {
                // Remover titular e todos os seus dependentes
                console.log(`O titular ${cliente.Nome} será excluído junto com seus dependentes.`);
                cliente.Dependentes.forEach(dep => dep.Titular = undefined); // Remove a referência do titular nos dependentes
                clientes.splice(clienteIndex, 1);
            }

            console.log(`Cliente ${cliente.Nome} foi excluído com sucesso!`);
        } else {
            console.log("Cliente inválido.");
        }
    }
}
