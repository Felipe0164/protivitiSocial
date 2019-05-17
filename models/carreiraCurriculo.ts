import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class CarreiraCurriculo extends Tutorial {
	public static readonly tabela = "carreira_curriculo";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.CarreiraCurriculo);
	}

	public static caminhoRelativoMiniatura(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.CarreiraCurriculo, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoAbsolutoMiniaturaExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.CarreiraCurriculo, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoRelativoVideo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.CarreiraCurriculo, id, Tutorial.extensaoVideo);
	}

	public static caminhoAbsolutoVideoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.CarreiraCurriculo, id, Tutorial.extensaoVideo);
	}

	public static validar(a: CarreiraCurriculo): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<CarreiraCurriculo[]> {
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
		return await Tutorial.listarPorTipo(CarreiraCurriculo.tabela) as CarreiraCurriculo[];
	}

	public static async obter(id: number): Promise<CarreiraCurriculo> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(CarreiraCurriculo.tabela, id) as CarreiraCurriculo;
	}

	public static async criar(a: CarreiraCurriculo, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(CarreiraCurriculo.tabela, TipoTutorial.CarreiraCurriculo, a, arquivo);
	}

	public static async uploadVideo(id: number, arquivo: any): Promise<string> {
		return await Tutorial.uploadVideoPorTipo(TipoTutorial.CarreiraCurriculo, id, arquivo);
	}

	public static async alterar(a: CarreiraCurriculo): Promise<string> {
		return await Tutorial.alterarPorTipo(CarreiraCurriculo.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(CarreiraCurriculo.tabela, TipoTutorial.CarreiraCurriculo, id);
	}
}
