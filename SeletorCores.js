class SeletorCores {
	
	// recebe o elemento que esta o nome da cor
	constructor(classElementoLabelCor) {
		this._classElementoLabelCor = classElementoLabelCor
		this._elementoCor = []
		this.cor = null

		// init class
		this.aplicaSeletorDeCores()
	}

	// pega o elemento aguardando pelo carregamento do DOM atráves da API MutationObserver
	pegaElemento (observer) {
		if (document.querySelector(this._classElementoLabelCor)) {
			observer.disconnect()
			let labels = document.querySelectorAll(this._classElementoLabelCor)
			Array.from(labels).map(item => this._elementoCor.push(item))
			this.criaElementoImagem()
		}	
	}

	// encontra o elemento recebido pela classe
	encontraElemento () {
		let observer = new MutationObserver(mutation => {
			this.pegaElemento(observer)
		})
		let confObserver = { subtree: true, childList: true }
		observer.observe(document, confObserver)
	}

	// pega o nome da cor e monta o path
	pegaPathDaImagem (elementoCor) {
		return '/arquivos/' + elementoCor.textContent + '.jpg'
	}

	// verifica se a imagem foi encontrada, caso sim aplica a imagem na label 
	// caso não returna mas no DOM continua o texto da imagem
	aplicaImagemNaLabel (img, elementoLabel) {
		img.onload = () => {
			elementoLabel.textContent = ''
			elementoLabel.append(img)
		}
		img.onerror = () => {
			return "não tem imagem"
		}
	}

	// cria o elemento da imagem e ja solicita para aplicar a imagem na label
	criaElementoImagem () {
		this._elementoCor.map((item) => {
			let img = new Image(35, 10)
			img.src = this.pegaPathDaImagem(item)
			this.aplicaImagemNaLabel(img, item)
		})
	}

	// ao chamar este metodo ele inicia todo o ciclo de atividade desta classe
	aplicaSeletorDeCores () {
		// encontrar os elementos labels populando a classe com os elementos das cores
		this.encontraElemento()
	}

}
