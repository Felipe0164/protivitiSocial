import express = require("express");
import multer = require("multer");
import FS = require("./fs");

export = class Upload {
	public static async gravarArquivoDeForm(expressRequest: express.Request, expressResponse: express.Response, caminhoRelativoPasta: string, nomeArquivo: string, tamanhoMaximoArquivoEmBytes: number, campoArquivoNoForm: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoPasta;
			try {
				caminhoAbsolutoPasta = FS.gerarCaminhoAbsoluto(caminhoRelativoPasta);
			} catch (e) {
				reject("Caminho relativo inválido!");
				return;
			}

			if (!(nomeArquivo = FS.validarNomeDeArquivo(nomeArquivo))) {
				reject("Nome de arquivo inválido!");
				return;
			}

			let storage = multer.diskStorage({
				destination: function (req, file, callback) {
					callback(null, caminhoAbsolutoPasta)
				},
				filename: function (req, file, callback) {
					callback(null, nomeArquivo)
				}
			});

			let upload = multer({
				storage: storage,
				limits: {
					fieldNameSize: 255,
					fieldSize: tamanhoMaximoArquivoEmBytes
				}
			}).single(campoArquivoNoForm);

			upload(expressRequest, expressResponse, (err) => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			});
		});
	}
};
