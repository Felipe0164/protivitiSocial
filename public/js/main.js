"use strict";

window.isEmpty = function (x) {
	return (x === undefined || x === null);
};
window.seal$ = function (obj) {
	if (Object.seal)
		Object.seal(obj);
	return obj;
};
window.freeze$ = function (obj) {
	if (Object.freeze)
		Object.freeze(obj);
	return obj;
};
window._ = function (id) {
	return ((typeof id === "string") ? document.getElementById(id) : id);
};
window.cancelEvent = function (evt) {
	if (evt) {
		if ("isCancelled" in evt)
			evt.isCancelled = true;
		if ("preventDefault" in evt)
			evt.preventDefault();
		if ("stopPropagation" in evt)
			evt.stopPropagation();
	}
	return false;
};
window.parseQueryString = function () {
	var i, pair, assoc = {}, keyValues = location.search.substring(1).split("&");
	for (i in keyValues) {
		pair = keyValues[i].split("=");
		if (pair.length > 1) {
			assoc[decodeURIComponent(pair[0].replace(/\+/g, " "))] = decodeURIComponent(pair[1].replace(/\+/g, " "));
		}
	}
	window.queryString = assoc;
	return assoc;
};
window.encode = (function () {
	var lt = /</g, gt = />/g;
	return function (x) {
		return (x ? x.replace(lt, "&lt;").replace(gt, "&gt;") : "");
	};
})();
window.format2 = function (x) {
	return ((x < 10) ? ("0" + x) : x);
};
window.formatPeriod = function (period) {
	return (period < 60 ? (period + " minutos") : (period == 60 ? "1 hora" : (((period / 60) | 0) + " horas")));
};
window.formatDuration = function (duration) {
	var s = ((duration / 1000) | 0), m = ((s / 60) | 0);
	s = s % 60;
	return format2(m) + ":" + format2(s);
};
window.formatSize = (function () {
	var expr = /\B(?=(\d{3})+(?!\d))/g;
	window.formatSizeLong = function (size) {
		if (size < 16384)
			return size + " bytes";
		return ((size * 0.0009765625) | 0).toString().replace(expr, ".") + " KiB";
	};
	return function (size) {
		if (size < 16384)
			return size + " bytes";
		return (size >>> 10).toString().replace(expr, ".") + " KiB";
	};
})();
window.formatNumber = (function () {
	var expr = /\B(?=(\d{3})+(?!\d))/g;
	return function (x) {
		return x.toString().replace(expr, ".");
	};
})();
window.formatHour = function (x) {
	return format2(x >>> 6) + ":" + format2(x & 63);
};
//https://github.com/igorescobar/jQuery-Mask-Plugin
//https://igorescobar.github.io/jQuery-Mask-Plugin/
window.maskCNPJ = function (field) {
	$(field).mask("00.000.000/0000-00");
};
window.maskCPF = function (field) {
	$(field).mask("000.000.000-00");
};
window.maskPhone = function (field) {
	$(field).mask("(00) 0000-0000JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", { translation: { "J": { pattern: /[\d\D]/g } } });
};
window.maskHour = function (field) {
	$(field).mask("00:00");
};
window.addFilterButton = function (parent, icon, text, handler) {
	var p = _(parent), label, btn, i;
	if (!p)
		return;
	label = document.createElement("label");
	btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.className = "btn btn-outline btn-sm btn-default";
	i = document.createElement("i");
	i.className = "fa fa14 " + icon;
	btn.appendChild(i);
	if (text)
		btn.appendChild(document.createTextNode(text));
	btn.onclick = handler;
	label.appendChild(btn);
	p.insertBefore(document.createTextNode(" "), p.firstChild);
	p.insertBefore(label, p.firstChild);
	return btn;
};
window.parseNoNaN = function (str) {
	var x = parseInt(trim(str));
	return (isNaN(x) ? 0 : x);
};
window.trim = (function () {
	if (window.String && window.String.prototype && window.String.prototype.trim)
		return function (str) { return str.trim(); };
	var expr = /^\s+|\s+$/g;
	return function (str) { return str.replace(expr, ""); };
})();
window.trimValue = function (input) {
	return trim(_(input).value);
};
window.endsWith = function (str, end) {
	// Para simular o comportamento do endsWith() real
	if (str === "")
		return (end === "");
	if (!str)
		return false;
	if (end === "")
		return true;
	if (!end || end.length > str.length)
		return false;
	var i = str.lastIndexOf(end);
	return (i >= 0 && i === (str.length - end.length));
};
/*!
 JsonWebApi v1.0.0 is distributed under the FreeBSD License

 Copyright (c) 2016, Carlos Rafael Gimenes das Neves
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 https://github.com/carlosrafaelgn/JsonWebApi
*/
(function () {
	var buildException = function (xhr, ex) {
		return (ex.message ?
			{ xhr: xhr, success: false, status: -1, value: JsonWebApi.messages.exceptionDescription + ex.message, exceptionType: (ex.name || "Error") } :
			{ xhr: xhr, success: false, status: -1, value: JsonWebApi.messages.exceptionDescription + ex, exceptionType: (ex.name || "Error") });
	},
		buildResponse = function (xhr) {
			try {
				if (xhr.status === 200) {
					return { xhr: xhr, success: true, status: 200, value: JSON.parse(xhr.responseText) };
				} else if (xhr.status > 200 && xhr.status < 299) {
					return { xhr: xhr, success: true, status: xhr.status, value: "" };
				} else {
					// Errors are handled here (299 is a special value treated as error)
					var err = JSON.parse(xhr.responseText);
					if (err && err.ExceptionMessage)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.ExceptionMessage, exceptionType: (err.ExceptionType || "System.Exception") };
					else if (err && err.Message)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.Message, exceptionType: (err.ExceptionType || "System.Exception") };
					else if (err && err.length)
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: err.toString(), exceptionType: (err.ExceptionType || "System.Exception") };
					else
						return { xhr: xhr, success: false, status: (xhr.status === 299 ? 500 : xhr.status), value: JsonWebApi.messages.networkError + xhr.status, exceptionType: "System.Exception" };
				}
			} catch (ex) {
				if (ex.name === "SyntaxError")
					return { xhr: xhr, success: false, status: -1, value: xhr.responseText, exceptionType: "SyntaxError" };
				return buildException(xhr, ex);
			}
		},
		buildFullUrl = function (url, args, start) {
			var name, value, i, j, fullUrl = url + "?";
			for (i = start; i < args.length; i += 2) {
				name = args[i];
				value = args[i + 1];

				if (!name && name !== 0)
					throw JsonWebApi.messages.invalidParameterName;
				name = encodeURIComponent(name) + "=";

				// Completely skip the parameter
				if (value === undefined || value === null)
					continue;

				if (value.constructor === Array) {
					if (!value.length) {
						// Completely skip the parameter, because if "name=" is sent, ASP.NET
						// will deserialize it as an array with 1 element containing default(type)
						continue;
					} else {
						if (i !== start)
							fullUrl += "&";

						fullUrl += name + encodeURIComponent((value[0] === undefined || value[0] === null) ? "" : value[0]);
						for (j = 1; j < value.length; j++)
							fullUrl += "&" + name + encodeURIComponent((value[j] === undefined || value[j] === null) ? "" : value[j]);
						continue;
					}
				} else {
					switch ((typeof value)) {
						case "function":
							throw JsonWebApi.messages.parameterValueCannotBeFunction;
						case "object":
							throw JsonWebApi.messages.parameterValueCannotBeObject;
					}
				}

				if (i !== start)
					fullUrl += "&";

				fullUrl += name + encodeURIComponent(value);
			}
			return fullUrl;
		},
		sendRequest = function (async, method, url, callback, bodyObject) {
			var done = false, xhr;

			JsonWebApi.active++;

			try {
				xhr = new XMLHttpRequest();

				xhr.open(method, url, async);

				if (JsonWebApi.avoidCache) {
					xhr.setRequestHeader("Cache-Control", "no-cache, no-store");
					xhr.setRequestHeader("Pragma", "no-cache");
				}

				xhr.setRequestHeader("Accept", "application/json");

				if (async) {
					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4 && !done) {
							done = true;
							JsonWebApi.active--;
							callback(buildResponse(xhr));
						}
					}
				}

				if (bodyObject != undefined) {
					xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
					xhr.send(JSON.stringify(bodyObject));
				} else {
					xhr.send();
				}

				if (async)
					return true;

				return buildResponse(xhr);
			} catch (ex) {
				if (!async)
					return buildException(xhr, ex);

				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
				return false;
			} finally {
				if (!async)
					JsonWebApi.active--;
			}
		};
	window.JsonWebApi = {
		messages: {
			invalidURL: "URL inválido",
			invalidCallback: "Callback inválido",
			invalidBodyObject: "Objeto do corpo da requisição inválido",
			invalidArguments: "Argumentos inválidos",
			invalidArgumentCount: "Quantidade de argumentos inválidos",
			invalidParameterName: "Nome do parâmetro inválido",
			parameterValueCannotBeObject: "O valor de um parâmetro não podem ser um objeto",
			parameterValueCannotBeFunction: "O valor de um parâmetro não podem ser uma função",
			exceptionDescription: "Ocorreu o seguinte erro: ",
			networkError: "Ocorreu um erro de rede: "
		},
		active: 0,
		avoidCache: true,
		redirect: function (url, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			window.location.href = ((arguments.length > 1) ? buildFullUrl(url, arguments, 1) : url);

			return true;
		},
		getSync: function (url, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(false, "get", (arguments.length > 1) ? buildFullUrl(url, arguments, 1) : url, null);
		},
		get: function (url, callback, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (!callback)
				throw JsonWebApi.messages.invalidCallback;

			if ((arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(true, "get", (arguments.length > 2) ? buildFullUrl(url, arguments, 2) : url, callback);
		},
		postSync: function (url, bodyObject, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (bodyObject === undefined)
				throw JsonWebApi.messages.invalidBodyObject

			if ((arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(false, "post", (arguments.length > 2) ? buildFullUrl(url, arguments, 2) : url, null, bodyObject);
		},
		post: function (url, bodyObject, callback, name0, value0) {
			if (!url)
				throw JsonWebApi.messages.invalidURL;

			if (bodyObject === undefined)
				throw JsonWebApi.messages.invalidBodyObject;

			if (!callback)
				throw JsonWebApi.messages.invalidCallback;

			if (!(arguments.length & 1))
				throw JsonWebApi.messages.invalidArgumentCount;

			return sendRequest(true, "post", (arguments.length > 3) ? buildFullUrl(url, arguments, 3) : url, callback, bodyObject);
		},
		postForm: function (url, callback, name0, value0) {
			//
			//Para usar isso:
			//
			//http://stackoverflow.com/questions/11593595/is-there-a-way-to-handle-form-post-data-in-a-web-api-controller
			//
			//
			if (!url || !url.length) {
				throw "URL inválido";
			}

			if (!callback) {
				throw "Callback inválido";
			}

			if ((arguments.length & 1) || arguments.length < 4) {
				throw "Quantidade de argumentos inválidos";
			}

			var i, name, value, req, done, formData = new FormData();

			JsonWebApi.active++;

			try {
				//Preenche todos os campos do formulário
				for (i = 2; i < arguments.length; i += 2) {
					if (!arguments[i] || !arguments[i + 1]) {
						throw "Argumentos inválidos";
					}
					name = arguments[i].toString();
					value = arguments[i + 1].toString();
					if (!name || !name.length) {
						throw "Argumentos inválidos";
					}
					formData.append(name, value);
				}

				// Cria uma requisição AJAX
				req = new XMLHttpRequest();

				// Abre a requisição com o método HTTP POST

				// *** A requisição está sendo aberta em modo assíncrono!
				req.open("post", url, true);

				// Configura a requisição para enviar dados JSON através do corpo
				// da mensagem (por onde será enviado o objeto pessoa)
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				// Pede para o servidor devolver dados em JSON
				req.setRequestHeader("Accept", "application/json");

				// Configura o callback assíncrono
				req.onreadystatechange = function () {
					if (req.readyState === 4 && !done) {
						done = true;
						JsonWebApi.active--;
						callback(buildResponse(req));
					}
				}

				// Envia a requisição assincronamente
				req.send(formData);
			} catch(ex) {
				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
			}
		},
		postFormData: function (url, formData, callback) {
			//
			//Para usar isso:
			//
			//http://stackoverflow.com/questions/11593595/is-there-a-way-to-handle-form-post-data-in-a-web-api-controller
			//
			//
			if (!url || !url.length) {
				throw "URL inválido";
			}

			if (!formData) {
				throw "Formulário inválido";
			}

			if (!callback) {
				throw "Callback inválido";
			}

			var req, done;

			JsonWebApi.active++;

			try {
				// Cria uma requisição AJAX
				req = new XMLHttpRequest();

				// Abre a requisição com o método HTTP POST

				// *** A requisição está sendo aberta em modo assíncrono!
				req.open("post", url, true);

				// Configura a requisição para enviar dados JSON através do corpo
				// da mensagem (por onde será enviado o objeto pessoa)
				var formDataPuro = (!window.$ || formData.constructor == FormData);
				if (!formDataPuro)
					req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

				// Pede para o servidor devolver dados em JSON
				req.setRequestHeader("Accept", "application/json");

				// Configura o callback assíncrono
				req.onreadystatechange = function () {
					if (req.readyState === 4 && !done) {
						done = true;
						JsonWebApi.active--;
						callback(buildResponse(req));
					}
				}

				// Envia a requisição assincronamente
				req.send(formDataPuro ? formData : $(formData).serialize());
			} catch (ex) {
				done = true;
				JsonWebApi.active--;
				callback(buildException(xhr, ex));
			}
		}
	};
})();
/* https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
:: cookies.js ::

A complete cookies reader/writer framework with full unicode support.

Revision #1 - September 4, 2014

https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
https://developer.mozilla.org/User:fusionchess

This framework is released under the GNU Public License, version 3 or later.
http://www.gnu.org/licenses/gpl-3.0-standalone.html

Modified by Carlos Rafael Gimenes das Neves
*/
window.Cookies = {
	create: function (name, value, expires, path, domain, secure) {
		if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) return false;
		var exp = "";
		if (expires) {
			switch (expires.constructor) {
				case Number:
					if (expires === Infinity) {
						exp = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
					} else {
						exp = new Date();
						exp.setTime(exp.getTime() + (expires * 60 * 60 * 1000));
						exp = "; expires=" + exp.toUTCString();
					}
					break;
				case Date:
					exp = "; expires=" + expires.toUTCString();
					break;
				case String:
					exp = "; expires=" + expires;
					break;
			}
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + exp + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
		return true;
	},
	get: function (name) {
		return (!name ? null : (decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null));
	},
	remove: function (name, path, domain) {
		if (!Cookies.exists(name)) return false;
		document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "");
		return true;
	},
	exists: function (name) {
		if (!name) return false;
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	names: function () {
		var ns = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var len = ns.length, idx = 0; idx < len; idx++) ns[idx] = decodeURIComponent(ns[idx]);
		return ns;
	}
};
window.Notification = {
	div: null,
	span: null,
	btn: null,
	version: 0,
	timeout: 0,
	timeoutVisible: 0,
	timeoutGone: 0,
	isVisible: false,
	wait: function (msg, basePath) {
		var div = document.createElement("div");
		div.innerHTML = "<img alt=\"Aguarde\" src=\"" + (basePath || "/") + "imagens/loading-grey-t.gif\"> " + (msg || "Por favor, aguarde...");
		return Notification.show(div, "default", -1);
	},
	success: function (message, important) {
		return Notification.show(message, "success", important ? 5000 : 2500, true);
	},
	error: function (message, important) {
		return Notification.show(message, "danger", important ? 5000 : 2500, true);
	},
	show: function (message, type, timeout, closeable) {
		if (!Notification.div) {
			Notification.div = document.createElement("div");
			Notification.div.setAttribute("role", "alert");
			Notification.div.className = "alert alert-notification";
			Notification.span = document.createElement("span");
			Notification.btn = document.createElement("button");
			Notification.btn.setAttribute("aria-label", "Fechar");
			Notification.btn.innerHTML = "&times;";
			Notification.btn.onclick = Notification.hide;
			Notification.div.appendChild(Notification.span);
			Notification.div.appendChild(Notification.btn);
			document.body.appendChild(Notification.div);
		}

		Notification.isVisible = true;
		Notification.version++;

		var version = Notification.version;

		if (Notification.timeout) {
			clearTimeout(Notification.timeout);
			Notification.timeout = 0;
		}

		if (Notification.timeoutVisible) {
			clearTimeout(Notification.timeoutVisible);
			Notification.timeoutVisible = 0;
		}

		if (Notification.timeoutGone) {
			clearTimeout(Notification.timeoutGone);
			Notification.timeoutGone = 0;
		}

		if (timeout !== -1) {
			if (isNaN(timeout) || timeout <= 0)
				closeable = true;
			else
				Notification.timeout = setTimeout(function () {
					if (Notification.version !== version)
						return;
					Notification.hide();
				}, timeout + 30);
		}

		if (type !== "success" && type !== "info" && type !== "danger" && type !== "warning")
			type = "default";

		Notification.btn.className = (closeable ? "close" : "close hidden");
		Notification.div.className = "alert alert-notification alert-" + type + (closeable ? " alert-dismissible" : "");
		Notification.timeoutVisible = setTimeout(function () {
			if (Notification.version !== version)
				return;

			if ((typeof message) === "string") {
				Notification.span.textContent = message;
			} else {
				while (Notification.span.firstChild)
					Notification.span.removeChild(Notification.span.firstChild);
				Notification.span.appendChild(message);
			}

			$(Notification.div).addClass("alert-notification-shown");
		}, 30);
	},
	hide: function () {
		if (!Notification.div || !Notification.isVisible)
			return;

		Notification.isVisible = false;
		Notification.version++;

		var version = Notification.version;

		if (Notification.timeout) {
			clearTimeout(Notification.timeout);
			Notification.timeout = 0;
		}

		if (Notification.timeoutVisible) {
			clearTimeout(Notification.timeoutVisible);
			Notification.timeoutVisible = 0;
		}

		if (Notification.timeoutGone) {
			clearTimeout(Notification.timeoutGone);
			Notification.timeoutGone = 0;
		}

		$(Notification.div).removeClass("alert-notification-shown");
		Notification.timeoutGone = setTimeout(function () {
			if (Notification.version !== version)
				return;
			$(Notification.div).addClass("alert-notification-gone");
		}, 600);
	}
};
window.BlobDownloader = {
	blobURL: null,

	saveAs: (window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || window.navigator.saveBlob || window.navigator.webkitSaveBlob || window.navigator.mozSaveBlob || window.navigator.msSaveBlob),

	supported: (("Blob" in window) && ("URL" in window) && ("createObjectURL" in window.URL) && ("revokeObjectURL" in window.URL)),

	alertNotSupported: function () {
		Notification.error("Infelizmente seu navegador não suporta essa funcionalidade \uD83D\uDE22", true);
		return false;
	},

	download: function (filename, blob) {
		if (!BlobDownloader.supported)
			return false;
		if (BlobDownloader.blobURL) {
			URL.revokeObjectURL(BlobDownloader.blobURL);
			BlobDownloader.blobURL = null;
		}

		if (BlobDownloader.saveAs) {
			try {
				BlobDownloader.saveAs.call(window.navigator, blob, filename);
				return;
			} catch (ex) {
				Notification.error("Ocorreu um erro durante o download dos dados \uD83D\uDE22", true);
			}
		}

		var a = document.createElement("a"), evt;
		BlobDownloader.blobURL = URL.createObjectURL(blob);
		a.href = BlobDownloader.blobURL;
		a.download = filename;
		if (document.createEvent && (window.MouseEvent || window.MouseEvents)) {
			try {
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(evt);
				return;
			} catch (ex) {
			}
		}
		a.click(); // Works on Chrome but not on Firefox...
		return true;
	}
};
// Search for selects
(function () {
	var regSlash = /[\/\\]/g, regTrim = /^\s+|\s+$/g, regA = /[ÁÀÃÂÄ]/g, regE = /[ÉÈÊË]/g, regI = /[ÍÌÎ]/g, regO = /[ÓÒÕÔ]/g, regU = /[ÚÙÛ]/g, regC = /[Ç]/g;

	function cbSearch_SetValue(select, value) {
		select.value = value;
		if ("createEvent" in document) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("change", false, true);
			select.dispatchEvent(evt);
		} else {
			select.fireEvent("onchange");
		}
	}

	function cbSearch_Normalize(x) {
		return x.toUpperCase().replace(regSlash, " ").replace(regTrim, "").replace(regA, "A").replace(regE, "E").replace(regI, "I").replace(regO, "O").replace(regU, "U").replace(regC, "C");
	}

	function cbSearch_Change() {
		var i, opt = this.selectedOptions, v;
		if (opt) {
			opt = opt[0];
			this.cbSearchInput.value = ((opt && opt.value && parseInt(opt.value)) ? opt.textContent : "");
		} else {
			opt = this.options;
			v = this.value;
			if (v && parseInt(v)) {
				for (i = opt.length - 1; i >= 0; i--) {
					if (opt[i].value == v) {
						this.cbSearchInput.value = opt[i].textContent;
						return;
					}
				}
			}
			this.cbSearchInput.value = "";
		}
	}

	function cbSearch_MouseDown(e) {
		if (e.button)
			return;
		if (e.offsetX < 38) { //(this.offsetWidth - 25)) {
			this.cbSearchFocusByMouse = false;
			this.cbSearchInput.focus();
			if (this.cbSearchInput.setSelectionRange)
				this.cbSearchInput.setSelectionRange(0, this.cbSearchInput.value.length);
			else
				this.cbSearchInput.select();
			return cancelEvent(e);
		} else {
			this.cbSearchFocusByMouse = true;
		}
	}

	function cbSearch_Blur() {
		if (this.cbSearchSelect) {
			var data = this.cbSearchData;
			if (!data)
				return;

			if (data.timerID)
				clearTimeout(data.timerID);

			if (data.dropDown.className != "dropdown") {
				data.version++;
				data.timerID = setTimeout(cbSearch_BlurTimeout, 300, { data: data, version: data.version });
			}

			if (!this.value)
				cbSearch_SetValue(this.cbSearchSelect, this.cbSearchSelect.options[0].value);
			else
				cbSearch_Change.apply(this.cbSearchSelect);
		} else if (this.cbSearchInput) {
			$(this.cbSearchInput).removeClass("forced-focus");
		}
	}

	function cbSearch_BlurTimeout(x) {
		if (!x || !x.data || x.data.version !== x.version)
			return;
		x.data.close();
		//if (x.data.onblur)
		//	x.data.onblur.call(x.data.elemento);
		cbSearch_Change.apply(x.data.cbSearchSelect);
	}

	function cbSearch_Focus() {
		if (this.cbSearchInput) {
			$(this.cbSearchInput).addClass("forced-focus");
			if (this.cbSearchFocusByMouse)
				this.cbSearchFocusByMouse = false;
			else
				this.cbSearchInput.focus();
		}
	}

	function cbSearch_AClick(e) {
		var data = this.cbSearchData;
		if (data) {
			data.close();
			cbSearch_SetValue(data.cbSearchSelect, this.parentNode.cbSearchValue);
		}
		return cancelEvent(e);
	}

	function cbSearch_KeyDown(e) {
		var data = this.cbSearchData, keyCode;
		if (!data)
			return;

		if ("key" in e) {
			switch (e.key) {
				case "ArrowUp":
					keyCode = 38;
					break;
				case "ArrowDown":
					keyCode = 40;
					break;
				case "ArrowLeft":
					keyCode = 37;
					break;
				case "ArrowRight":
					keyCode = 39;
					break;
				case "Enter":
					keyCode = 13;
					break;
				case "Escape":
					keyCode = 27;
					break;
				case "Shift":
				case "ShiftLeft":
				case "ShiftRight":
					keyCode = 16;
					break;
				case "Control":
				case "ControlLeft":
				case "ControlRight":
					keyCode = 17;
					break;
				case "Tab":
					keyCode = 9;
					break;
				default:
					keyCode = 0;
					break;
			}
		} else if ("keyCode" in e) {
			keyCode = e.keyCode;
		} else {
			keyCode = e.which;
		}

		switch (keyCode) {
			case 9: // tab
			case 16: // shift
			case 17: // ctrl
			case 37: // left
			case 39: // right
				return true;
			case 38: // up
				if (e.preventDefault)
					e.preventDefault();
				if (data.dropDown.className != "dropdown") {
					data.selection--;
					data.updateSelection();
				} else {
					data.open(data.cbSearchInput.value);
				}
				return false;
			case 40: // down
				if (e.preventDefault)
					e.preventDefault();
				if (data.dropDown.className != "dropdown") {
					data.selection++;
					data.updateSelection();
				} else {
					data.open(data.cbSearchInput.value);
				}
				return false;
			case 13: // enter
				if (e.preventDefault)
					e.preventDefault();
				if (data.dropDown.className == "dropdown")
					data.open(data.cbSearchInput.value);
				return false;
			case 27: // escape
				if (data.dropDown.className != "dropdown") {
					data.close();
					return cancelEvent(e);
				}
				break;
		}
		return true;
	}

	function cbSearch_KeyUp(e) {
		var data = this.cbSearchData, keyCode;
		if (!data)
			return;

		if ("key" in e) {
			switch (e.key) {
				case "ArrowUp":
					keyCode = 38;
					break;
				case "ArrowDown":
					keyCode = 40;
					break;
				case "ArrowLeft":
					keyCode = 37;
					break;
				case "ArrowRight":
					keyCode = 39;
					break;
				case "Enter":
					keyCode = 13;
					break;
				case "Escape":
					keyCode = 27;
					break;
				case "Shift":
				case "ShiftLeft":
				case "ShiftRight":
					keyCode = 16;
					break;
				case "Control":
				case "ControlLeft":
				case "ControlRight":
					keyCode = 17;
					break;
				case "Tab":
					keyCode = 9;
					break;
				default:
					keyCode = 0;
					break;
			}
		} else if ("keyCode" in e) {
			keyCode = e.keyCode;
		} else {
			keyCode = e.which;
		}

		switch (keyCode) {
			case 9: // tab
			case 16: // shift
			case 17: // ctrl
			case 37: // left
			case 39: // right
				return true;
			case 38: // up
			case 40: // down
				if (e.preventDefault)
					e.preventDefault();
				if (data.dropDown.className != "dropdown")
					return false;
				data.lastSearch = null;
				break;
			case 13: // enter
				if (e.preventDefault)
					e.preventDefault();
				if (data.dropDown.className != "dropdown") {
					data.select();
					return false;
				}
				data.lastSearch = null;
				break;
			//case 27: // escape
			//	return cancelEvent(e);
		}

		var normalized = cbSearch_Normalize(this.value);
		if (data.lastSearch == normalized)
			return;

		data.lastSearch = normalized;

		if (normalized)
			data.open(normalized);
		else
			data.close();

		return true;
	}

	function cbSearch_DataSelect() {
		if (!this.menu || !this.menu.childNodes.length)
			return;
		if (this.selection < 0)
			this.selection = 0;
		else if (this.selection >= this.menu.childNodes.length)
			this.selection = this.menu.childNodes.length - 1;
		var li = this.menu.childNodes[this.selection];
		this.close();
		cbSearch_SetValue(this.cbSearchSelect, li.cbSearchValue);
	}

	function cbSearch_DataUpdateSelection() {
		if (!this.menu || !this.menu.childNodes.length)
			return;
		if (this.selection < 0)
			this.selection = 0;
		else if (this.selection >= this.menu.childNodes.length)
			this.selection = this.menu.childNodes.length - 1;
		var i, c;
		for (i = this.menu.childNodes.length - 1; i >= 0; i--)
			this.menu.childNodes[i].style.background = "";
		c = this.menu.childNodes[this.selection];
		this.menu.scrollTop = c.offsetTop - 5;
		c.style.background = "rgba(102,175,233,.75)";
	}

	function cbSearch_DataOpen(normalized) {
		var i, li, a, ok = false, cbSearchSelect = this.cbSearchSelect, list = cbSearchSelect.getElementsByTagName("OPTION"), menu = this.menu, txt, norm, value = null;

		while (this.menu.firstChild)
			this.menu.removeChild(this.menu.firstChild);

		for (i = 0; i < list.length; i++) {
			li = list[i];
			if (!(value = li.value) || !parseInt(value))
				continue;
			txt = li.textContent;
			norm = li.cbSearchNormalized;
			if (!norm) {
				norm = cbSearch_Normalize(txt);
				li.cbSearchNormalized = norm;
			}
			if (!normalized || norm.indexOf(normalized) >= 0) {
				li = document.createElement("li");
				if (value)
					li.cbSearchValue = value;
				if (!ok)
					li.style.background = "rgba(102,175,233,.75)";
				a = document.createElement("a");
				a.setAttribute("href", "#");
				a.cbSearchData = this;
				a.onclick = cbSearch_AClick;
				a.appendChild(document.createTextNode(txt));
				li.appendChild(a);
				menu.appendChild(li);
				ok = true;
			}
		}
		menu.scrollTop = 0;

		this.version++;

		if (this.timerID) {
			clearTimeout(this.timerID);
			this.timerID = null;
		}

		this.selection = 0;

		if (ok)
			this.dropDown.className = "dropdown open";
		else
			this.dropDown.className = "dropdown";
	}

	function cbSearch_DataClose() {
		while (this.menu.firstChild)
			this.menu.removeChild(this.menu.firstChild);
		this.version++;
		if (this.timerID) {
			clearTimeout(this.timerID);
			this.timerID = null;
		}
		this.lastSearch = null;
		this.selection = -1;
		this.dropDown.className = "dropdown";
	}

	window.prepareCbSearch = function (select) {
		if (!select)
			return;

		var parent = select.parentNode,
			outerdiv = document.createElement("div"),
			groupdiv = document.createElement("div"),
			span = document.createElement("span"),
			button = document.createElement("button"),
			i = document.createElement("i"),
			input = document.createElement("input"),
			data = {
				cbSearchSelect: select,
				cbSearchInput: input,
				selection: -1,
				lastSearch: null,
				version: 0,
				dropDown: outerdiv,
				menu: document.createElement("ul"),
				select: cbSearch_DataSelect,
				updateSelection: cbSearch_DataUpdateSelection,
				open: cbSearch_DataOpen,
				close: cbSearch_DataClose
			};

		select.cbSearchData = data;
		select.cbSearchInput = input;
		select.onfocus = cbSearch_Focus;
		select.onblur = cbSearch_Blur;
		select.onmousedown = cbSearch_MouseDown;
		select.addEventListener("change", cbSearch_Change);
		select.cbSearchChange = cbSearch_Change;
		outerdiv.className = "dropdown";
		groupdiv.className = "form-group input-group";
		groupdiv.style.position = "absolute";
		groupdiv.style.left = "0";
		groupdiv.style.top = "0";
		groupdiv.style.pointerEvents = "none";
		span.className = "input-group-btn";
		button.className = "btn btn-default btn-force-border";
		button.setAttribute("type", "button");
		button.setAttribute("aria-label", "Pesquisar");
		button.setAttribute("tabindex", "-1");
		button.cbSearchSelect = select;
		i.className = "fa fa-nomargin fa-filter";
		input.className = "form-control upper select-arrow";
		input.setAttribute("type", "text");
		input.setAttribute("spellcheck", "false");
		input.setAttribute("tabindex", "-1");
		if (select.options[0])
			input.setAttribute("placeholder", select.options[0].textContent);
		input.cbSearchData = data;
		input.cbSearchSelect = select;
		input.onfocus = cbSearch_Focus;
		input.onblur = cbSearch_Blur;
		input.onkeydown = cbSearch_KeyDown;
		input.onkeyup = cbSearch_KeyUp;
		data.menu.className = "dropdown-menu";
		data.menu.style.maxHeight = "140px";// 10 (padding) + (26 x item count)
		data.menu.style.overflowY = "auto";

		button.appendChild(i);
		span.appendChild(button);
		groupdiv.appendChild(span);
		groupdiv.appendChild(input);

		parent.removeChild(select);
		select.style.borderColor = "transparent";
		select.style.webkitBoxShadow = "0 0 0";
		select.style.boxShadow = "0 0 0";

		outerdiv.appendChild(select);
		outerdiv.appendChild(groupdiv);
		outerdiv.appendChild(data.menu);

		parent.appendChild(outerdiv);

		if (select.value && parseInt(select.value))
			cbSearch_Change.apply(select);
	};
})();
