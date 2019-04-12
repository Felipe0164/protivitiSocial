import TipoTutorial = require("./enums/tipoTutorial");
import Tutorial = require("./tutorial");

export = class CarreiraCapacitacaoTreinamentos extends Tutorial {
	public static readonly tabela = "carreiraCapacitacaoTreinamentos";
	public static readonly extensaoArquivo = "mp4";

	public static caminhoAbsolutoPastaExterno(): string {
		return Tutorial.caminhoAbsolutoPastaExternoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos);
	}

	public static caminhoRelativoArquivo(id: number): string {
		return Tutorial.caminhoRelativoArquivoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, CarreiraCapacitacaoTreinamentos.extensaoArquivo);
	}


	public static caminhoAbsolutoArquivoExterno(id: number): string {
		return Tutorial.caminhoAbsolutoArquivoExternoPorTipo(TipoTutorial.CarreiraCapacitacaoTreinamentos, id, CarreiraCapacitacaoTreinamentos.extensaoArquivo);
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
		return await Tutorial.criarPorTipo(CarreiraCapacitacaoTreinamentos.tabela, TipoTutorial.Alocacao, a, arquivo, CarreiraCapacitacaoTreinamentos.extensaoArquivo);
	}

	public static async alterar(a: CarreiraCapacitacaoTreinamentos): Promise<string> {
		return await Tutorial.alterarPorTipo(CarreiraCapacitacaoTreinamentos.tabela, a);
	}

	public static async excluir(id: number): Promise<string> {
		return await Tutorial.excluirPorTipo(CarreiraCapacitacaoTreinamentos.tabela, TipoTutorial.Alocacao, id, CarreiraCapacitacaoTreinamentos.extensaoArquivo);
	}
}
