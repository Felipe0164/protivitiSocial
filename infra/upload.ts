import express = require("express");
import multer = require("multer");
import fs = require("fs");
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

	public static async gravarArquivo(arquivo: any, caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			fs.writeFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

	public static async criarArquivoVazio(caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			try {
				fs.exists(caminhoAbsolutoArquivo, (exists) => {
					if (exists) {
						reject("Arquivo já existe!");
						return;
					}

					fs.writeFile(caminhoAbsolutoArquivo, [], (err) => {
						if (err)
							reject(err);
						else
							resolve();
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	public static async adicionarAoFinalDoArquivo(arquivo: any, caminhoRelativoPasta: string, nomeArquivo: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let caminhoAbsolutoArquivo;
			try {
				caminhoAbsolutoArquivo = FS.gerarCaminhoAbsolutoArquivo(caminhoRelativoPasta, nomeArquivo);
			} catch (e) {
				reject("Caminho inválido!");
				return;
			}

			try {
				fs.exists(caminhoAbsolutoArquivo, (exists) => {
					if (!exists) {
						reject("Arquivo inexistente!");
						return;
					}

					fs.appendFile(caminhoAbsolutoArquivo, arquivo.buffer, (err) => {
						if (err)
							reject(err);
						else
							resolve();
					});
				});
			} catch (e) {
				reject(e);
			}
		});
	}
};
