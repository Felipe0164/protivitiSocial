import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class CarreiraCapacitacaoTreinamentos extends Tutorial {
	public static readonly tabela = "carreira_capacitacao_treinamentos";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos);
	}

	public static caminhoRelativoMiniatura(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoAbsolutoMiniaturaExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, Tutorial.extensaoMiniatura);
	}

	public static caminhoRelativoVideo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, Tutorial.extensaoVideo);
	}

	public static caminhoAbsolutoVideoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, Tutorial.extensaoVideo);
	}

	public static validar(a: CarreiraCapacitacaoTreinamentos): string {
		return Tutorial.validarPorTipo(a);
	}

	public static async listar(): Promise<CarreiraCapacitacaoTreinamentos[]> {
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
		return await Tutorial.listarPorTipo(CarreiraCapacitacaoTreinamentos.tabela) as CarreiraCapacitacaoTreinamentos[];
	}

	public static async obter(id: number): Promise<CarreiraCapacitacaoTreinamentos> {
		// Ver comentário em listar();
		return await Tutorial.obterPorTipo(CarreiraCapacitacaoTreinamentos.tabela, id) as CarreiraCapacitacaoTreinamentos;
	}

	public static async criar(a: CarreiraCapacitacaoTreinamentos, arquivo: any): Promise<string> {
		return await Tutorial.criarPorTipo(CarreiraCapacitacaoTreinamentos.tabela, TipoTutorial.CarreiraCapacitacaoTreinamentos, a, arquivo);
	}

	public static async uploadVideo(id: number, arquivo: any): Promise<string> {
		return await Tutorial.uploadVideoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, arquivo);
	}

	public static async alterar(a: CarreiraCapacitacaoTreinamentos): Promise<string> {
		return await Tutorial.alterarPorTipo(CarreiraCapacitacaoTreinamentos.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(CarreiraCapacitacaoTreinamentos.tabela, TipoTutorial.CarreiraCapacitacaoTreinamentos, id);
	}
}
