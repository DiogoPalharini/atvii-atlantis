import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente {
    private nome: string;
    private nomeSocial: string;
    private dataNascimento: Date;
    private dataCadastro: Date;
    private telefones: Telefone[] = [];
    private endereco!: Endereco;
    private documentos: Documento[] = [];
    private dependentes: Cliente[] = [];
    private titular?: Cliente; // Agora aceita undefined

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date(); // Data de cadastro é definida automaticamente
    }

    // Getters
    public get Nome(): string { return this.nome; }
    public get NomeSocial(): string { return this.nomeSocial; }
    public get DataNascimento(): Date { return this.dataNascimento; }
    public get DataCadastro(): Date { return this.dataCadastro; }
    public get Telefones(): Telefone[] { return this.telefones; }
    public get Endereco(): Endereco { return this.endereco; }
    public get Documentos(): Documento[] { return this.documentos; }
    public get Dependentes(): Cliente[] { return this.dependentes; }
    public get Titular(): Cliente | undefined { return this.titular; }

    // Setters
    public set Nome(nome: string) { this.nome = nome; }
    public set NomeSocial(nomeSocial: string) { this.nomeSocial = nomeSocial; }
    public set DataNascimento(dataNascimento: Date) { this.dataNascimento = dataNascimento; }
    public set Endereco(endereco: Endereco) { this.endereco = endereco; }
    public set Titular(titular: Cliente | undefined) { this.titular = titular; }

    // Métodos para manipular telefones
    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone);
    }

    public removerTelefone(telefone: Telefone): void {
        this.telefones = this.telefones.filter(tel => tel !== telefone);
    }

    // Métodos para manipular documentos
    public adicionarDocumento(documento: Documento): void {
        this.documentos.push(documento);
    }

    public removerDocumento(documento: Documento): void {
        this.documentos = this.documentos.filter(doc => doc !== documento);
    }

    // Métodos para manipular dependentes
    public adicionarDependente(dependente: Cliente): void {
        dependente.Titular = this; // Define este cliente como titular do dependente
        this.dependentes.push(dependente);
    }

    public removerDependente(dependente: Cliente): void {
        this.dependentes = this.dependentes.filter(dep => dep !== dependente);
        dependente.Titular = undefined; // Remove o titular do dependente
    }
}
