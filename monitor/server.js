const axios = require("axios");
const TotalVoice = require("totalvoice-node");
const client = new TotalVoice("Seu token");

const servers = [
	{
		name: "Servidor 1",
		url: "http://localhost:4001",
		developer: {
			name: "Gabriel",
			telephone:"seunumero"
		}
	},
	{
		name: "Servidor 2",
		url: "http://localhost:4002",
		developer: {
			name: "Gabriel",
			telephone: "Seunumero"
		}
	}
];

(async function () {
	console.log("Iniciando monitoramento dos servidores...");
	for (const server of servers) {
		await axios({
			url: server.url,
			method: "get"
		}).then((response) => {
			console.log(`${server.name} está no ar!`);
		}).catch(() => {
			console.log(`${server.name} está fora do ar!`);
			const message = `${server.developer.name} o ${server.name} está forá do ar, acabou o mundo`;
			const options = {
				velocidade: 2,
				tipo_voz: "br-Vitoria"
			};
			client.tts.enviar(server.developer.telephone, message, options).then(() => {
				console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`);
			});
		});
	}
	console.log("Finalizando monitoramento dos servidores...");
})();