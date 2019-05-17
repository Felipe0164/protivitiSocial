import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class Pec extends Tutorial {
	public static readonly tabela = "pec";
	public static readonly extensaoArquivo = "mp4";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.Pec);
	}

	public static caminhoRelativoArquivo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Pec, id, Pec.extensaoArquivo);
	}

	public static caminhoAbsolutoArquivoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Pec, id, Pec.extensaoArquivo);
	}

	public static validar(a: Pec): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<Pec[]> {
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
		return await Tutorial.listarPorTipo(Pec.tabela) as Pec[];
	}

	public static async obter(id: number): Promise<Pec> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(Pec.tabela, id) as Pec;
	}

	//public static async criar(a: Pec, arquivo: any): Promise<string> {
	//	return await Tutorial.criarPorTipo(Pec.tabela, TipoTutorial.Pec, a, arquivo, Pec.extensaoArquivo);
	//}

	public static async alterar(a: Pec): Promise<string> {
		return await Tutorial.alterarPorTipo(Pec.tabela, a);
	}

	//public static async excluir(id: number): Promise<string> {
	//	return await Tutorial.excluirPorTipo(Pec.tabela, TipoTutorial.Pec, id, Pec.extensaoArquivo);
	//}
}
