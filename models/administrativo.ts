import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class Administrativo extends Tutorial {
	public static readonly tabela = "administrativo";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.Administrativo);
	}

	public static caminhoRelativoMiniatura(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Administrativo, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoAbsolutoMiniaturaExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Administrativo, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoRelativoVideo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.Administrativo, id, Tutorial.extensaoVideo);
	}

	public static caminhoAbsolutoVideoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.Administrativo, id, Tutorial.extensaoVideo);
	}

	public static validar(a: Administrativo): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<Administrativo[]> {
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
		return await Tutorial.listarPorTipo(Administrativo.tabela) as Administrativo[];
	}

	public static async obter(id: number): Promise<Administrativo> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(Administrativo.tabela, id) as Administrativo;
	}

	public static async criar(a: Administrativo, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(Administrativo.tabela, TipoTutorial.Administrativo, a, arquivo);
	}

	public static async uploadVideo(id: number, arquivo: any): Promise<string> {
		return await Tutorial.uploadVideoPorTipo(TipoTutorial.Administrativo, id, arquivo);
	}

	public static async alterar(a: Administrativo): Promise<string> {
		return await Tutorial.alterarPorTipo(Administrativo.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(Administrativo.tabela, TipoTutorial.Administrativo, id);
	}
}
