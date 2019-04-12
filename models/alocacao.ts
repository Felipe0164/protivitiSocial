import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class Alocacao extends Tutorial {
	public static readonly tabela = "alocacao";
	public static readonly extensaoArquivo = "mp4";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.Alocacao);
	}

	public static caminhoRelativoArquivo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Alocacao, id, Alocacao.extensaoArquivo);
	}


	public static caminhoAbsolutoArquivoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Alocacao, id, Alocacao.extensaoArquivo);
	}

	public static validar(a: Alocacao): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<Alocacao[]> {
		// ******************************************************************************
		// Essa técnica só funciona porque os objetos não têm métodos de instância.
		//
		// Se os objetos tivessem métodos de instância, o retorno de sql.query() jamais
		// poderia ser convertido para Tutorial e depois para essa classe, porque
		// sql.query() retorna objetos criados em tempo real, similar a criar objetos
		// usando JSON convencional.
		//
		// Se quiséssemos que os objetos retornados fossem efetivamente da nossa classe,
		// precisaríamos instanciar objeto por objeto, em vez de simplesmente repassar
		// a lista retornada por sql.query().
		// ******************************************************************************
		return await Tutorial.listarPorTipo(Alocacao.tabela) as Alocacao[];
	}

	public static async obter(id: number): Promise<Alocacao> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(Alocacao.tabela, id) as Alocacao;
	}

	public static async criar(a: Alocacao, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(Alocacao.tabela, TipoTutorial.Alocacao, a, arquivo, Alocacao.extensaoArquivo);
	}

	public static async alterar(a: Alocacao): Promise<string> {
		return await Tutorial.alterarPorTipo(Alocacao.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(Alocacao.tabela, TipoTutorial.Alocacao, id, Alocacao.extensaoArquivo);
	}
}
