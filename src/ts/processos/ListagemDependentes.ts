import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class ListagemDependentes extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        console.clear();
        console.log("Iniciando a listagem de dependentes...");

        const armazem = Armazem.InstanciaUnica;
        const clientes = armazem.Clientes;

        // Exibir titulares disponíveis
        console.log("Selecione o titular para listar seus dependentes:");
        clientes.forEach((cliente, index) => {
            if (cliente.Titular === undefined) {
                console.log(`${index + 1} - ${cliente.Nome}`);
            }
        });

        const titularIndex = this.entrada.receberNumero('Digite o número do titular desejado:') - 1;

        // Validar o titular selecionado
        if (titularIndex >= 0 && titularIndex < clientes.length && clientes[titularIndex].Titular === undefined) {
            const titular = clientes[titularIndex];

            if (titular.Dependentes.length > 0) {
                console.log(`Dependentes de ${titular.Nome}:`);
                titular.Dependentes.forEach((dependente, index) => {
                    console.log(`${index + 1} - Nome: ${dependente.Nome}, Nome Social: ${dependente.NomeSocial}`);
                });
            } else {
                console.log(`${titular.Nome} não possui dependentes cadastrados.`);
            }
        } else {
            console.log("Titular inválido.");
        }
    }
}

