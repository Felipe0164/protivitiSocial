import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class Inovacao extends Tutorial {
	public static readonly tabela = "inovacao";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.Inovacao);
	}

	public static caminhoRelativoMiniatura(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Inovacao, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoAbsolutoMiniaturaExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Inovacao, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoRelativoVideo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Inovacao, id, Tutorial.extensaoVideo);
	}

	public static caminhoAbsolutoVideoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Inovacao, id, Tutorial.extensaoVideo);
	}

	public static validar(a: Inovacao): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<Inovacao[]> {
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
		return await Tutorial.listarPorTipo(Inovacao.tabela) as Inovacao[];
	}

	public static async obter(id: number): Promise<Inovacao> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(Inovacao.tabela, id) as Inovacao;
	}

	public static async criar(a: Inovacao, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(Inovacao.tabela, TipoTutorial.Inovacao, a, arquivo);
	}

	public static async uploadVideo(id: number, arquivo: any): Promise<string> {
		return await Tutorial.uploadVideoPorTipo(TipoTutorial.Inovacao, id, arquivo);
	}

	public static async alterar(a: Inovacao): Promise<string> {
		return await Tutorial.alterarPorTipo(Inovacao.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(Inovacao.tabela, TipoTutorial.Inovacao, id);
	}
}
