import {FilePostale,Client} from './FilePostale.js';

const filePostale = new FilePostale();

const formAddClient = document.getElementById('form-add-client');
const queueContainer = document.getElementById('queue');
const historiqueContainer = document.getElementById('historique');
const messageContainer = document.getElementById('message');
const boutonServeClient = document.getElementById('serve-client');

formAddClient.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const priority = document.getElementById('priority').checked;

    if (name && service) {
        const client = new Client(name, service, priority);
        filePostale.addClient(client);
        showQueue();

        formAddClient.reset();
    } else {
        alert('Veuillez remplir tous les champs requis.');
    }
});

boutonServeClient.addEventListener('click', () => {
    const clientServed = filePostale.serveClient();

    if (clientServed) {
        messageContainer.textContent = `${clientServed.name} (Service : ${clientServed.service}) a été servi.`;
        showQueue();
        afficherHistorique();
    } else {
        messageContainer.textContent = "Aucun client dans la file d'attente.";
    }
});

function showQueue() {
    queueContainer.innerHTML = filePostale.listClients();
}

const formDeleteClient = document.getElementById('form-delete-client');

formDeleteClient.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name-delete').value;

    if (name) {
        filePostale.supprimerClient(name);
        showQueue();
        formDeleteClient.reset();
    } else {
        alert('Veuillez entrer un nom.');
    }
});

function afficherHistorique() {
    historiqueContainer.innerHTML = filePostale.afficherHistorique();
};