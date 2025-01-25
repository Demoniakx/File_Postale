class Client {
    constructor(name, service, priority) {
        this.name = name;
        this.service = service;
        this.priority = priority;
    }
}

class FilePostale {
    constructor() {
        this.clients = [];
        this.historique = [];
    }

    addClient(client) {
        this.clients.push(client);
    }

    serveClient() {
        let indexPriority = this.clients.findIndex(client => client.priority);
        let clientServed;

        if (indexPriority >=0) {
            clientServed = this.clients.splice(indexPriority, 1)[0];
        } else {
            clientServed = this.clients.shift();
        }

        if(clientServed) {
            this.historique.push(clientServed);
        }

        return clientServed;
    }

    listClients() {
        return this.clients.map(client =>
            `<li class="client">
                ${client.name} (Service : ${client.service}, Prioritaire : ${client.priority ? 'Oui' : 'Non'})
            </li>`).join('');
    }

    supprimerClient(name) {
        const index = this.clients.findIndex(client => client.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            this.clients.splice(index, 1);
        } else {
            alert(`Aucun client avec le nom "${name}" trouvé dans la file.`);
        }
    }

    afficherHistorique() {
        return this.historique.map(client => `
            <li class="client">
                ${client.name} (Service : ${client.service}, Prioritaire : ${client.priority ? 'Oui' : 'Non'})
            </li>`).join('');
    }
}

export {FilePostale, Client};