// Arquivo para criar metadados para as imagens da aplicação
const imageMetadata = {
  "homer-statue.jpg": {
    "title": "Estátua de Homero",
    "description": "Busto de Homero, poeta grego a quem são atribuídas as epopeias Ilíada e Odisseia",
    "source": "Museu Britânico",
    "license": "Domínio público"
  },
  "camoes.jpg": {
    "title": "Retrato de Luís Vaz de Camões",
    "description": "Retrato de Luís Vaz de Camões, autor d'Os Lusíadas, por Fernão Gomes (c. 1577)",
    "source": "Sociedade Histórica de Lisboa",
    "license": "Domínio público"
  },
  "iliad.jpg": {
    "title": "Cena da Ilíada",
    "description": "Aquiles e Ajax jogando um jogo de tabuleiro com Atena observando",
    "source": "Staatliche Antikensammlungen",
    "license": "Domínio público"
  },
  "odyssey.jpg": {
    "title": "Cena da Odisseia",
    "description": "Ulisses e as Sereias, episódio da Odisseia de Homero",
    "source": "Museu Britânico",
    "license": "Domínio público"
  },
  "aeneid.jpg": {
    "title": "Cena da Eneida",
    "description": "A Fuga de Eneias de Troia, por Federico Barocci",
    "source": "Galleria Borghese",
    "license": "Domínio público"
  },
  "map-route.jpg": {
    "title": "Rota de Vasco da Gama para a Índia",
    "description": "Mapa ilustrando o caminho marítimo para a Índia, viagem narrada n'Os Lusíadas",
    "source": "Arquivo Nacional de Portugal",
    "license": "Domínio público"
  }
};

// Exportar os metadados para uso na aplicação
if (typeof module !== 'undefined' && module.exports) {
  module.exports = imageMetadata;
}
