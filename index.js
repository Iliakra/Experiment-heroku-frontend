import domBuild from './helpers'

/*
function domBuild (tickets) {
    let ticketsContainer = document.getElementsByClassName('tickets-container')[0];
    let cancelAddingButton = document.getElementsByClassName('cancel-adding-button')[0];
    let cancelDeletionButton = document.getElementsByClassName('cancel-deletion-button')[0];
    cancelAddingButton.addEventListener('click', addTicketDialogCloseHandler);
    cancelDeletionButton.addEventListener('click', deleteTicketDialogCloseHandler);
    for (let i=0; i<tickets.length; i++) {

        let ticketContainer = document.createElement('div');
        ticketContainer.classList.add('ticket-container');
        ticketContainer.setAttribute('data-id',tickets[i].id);
        ticketContainer.addEventListener('click', showDescription_handler);

        let statusIndicator = document.createElement('div');
        statusIndicator.classList.add('circle');
        if (tickets[i].status === "true") {
            let readyStatusIcon = document.createElement('img');
            readyStatusIcon.classList.add('ready-status-icon');
            readyStatusIcon.src = 'images/ready-status-icon.png';
            statusIndicator.appendChild(readyStatusIcon);
        }
        ticketContainer.appendChild(statusIndicator);

        let textContainer = document.createElement('div');
        textContainer.classList.add('ticket-text-container');

        let ticketName = document.createElement('p');
        ticketName.classList.add('ticket-name');
        ticketName.textContent = tickets[i].name;

        let descriptionContainer = document.createElement('p');
        descriptionContainer.classList.add('description','invisible');
        ticketContainer.appendChild(descriptionContainer);

        if (tickets[i].hasOwnProperty('description')) {
            descriptionContainer.classList.remove('invisible');
            descriptionContainer.textContent = tickets[i].description;
        }

        textContainer.appendChild(ticketName);
        textContainer.appendChild(descriptionContainer);

        ticketContainer.appendChild(textContainer);

        let dataTimeIndicator = document.createElement('p');
        dataTimeIndicator.classList.add('data-time-indicator');
        dataTimeIndicator.textContent = tickets[i].created;
        ticketContainer.appendChild(dataTimeIndicator);

        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        let changeButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        let changeButtonIcon = document.createElement('img');
        changeButton.addEventListener('click', openChangeTicketDialog_handler);
        changeButtonIcon.classList.add('pencil');
        changeButtonIcon.src = 'images/pencil.jpg';
        changeButton.appendChild(changeButtonIcon);
        changeButton.classList.add('change-button', 'circle');
        changeButton.setAttribute('data-id',tickets[i].id);
        deleteButton.classList.add('delete-button', 'circle');
        deleteButton.setAttribute('data-id',tickets[i].id);
        deleteButton.addEventListener('click', openDeleteTicketDialog_handler);
        buttonsContainer.appendChild(changeButton);
        buttonsContainer.appendChild(deleteButton);
        ticketContainer.appendChild(buttonsContainer);

        ticketsContainer.appendChild(ticketContainer);
    }
}
*/

let preloader = document.getElementsByClassName('donut')[0];
console.log('preloader',preloader);

function initialRequest () {
    preloader.classList.remove('invisible');
    const url = `https://heroku-iliakra.herokuapp.com/?method=allTickets`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url ,true);
    xhr.addEventListener('load', () => {
        preloader.classList.add('invisible');
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                let tickets = data;
                domBuild(tickets);
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send();
}

initialRequest();

let openDialogWindow = document.getElementsByClassName('add-ticket-dialog')[0];
let deleteTicketDialogWindow = document.getElementsByClassName('delete-ticket-dialog')[0];
let form = document.getElementsByClassName('add-ticket-form')[0];

let deleteTicketDialogCloseHandler = () => {
    event.preventDefault();
    form.reset();
    deleteTicketDialogWindow.classList.add('invisible');
}


let addTicketDialogCloseHandler = () => {
    event.preventDefault();
    form.reset();
    openDialogWindow.classList.add('invisible');
}

let addTicketHandler = () => {
    event.preventDefault();
    preloader.classList.remove('invisible');
    let formData = new FormData(event.currentTarget);
    formData.append('id', null);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://heroku-iliakra.herokuapp.com/?method=createTicket`);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            preloader.classList.add('invisible');
            try {
                if (xhr.responseText === 'OK') {
                    let ticketsContainerElement = document.getElementsByClassName('tickets-container')[0];
                    ticketsContainerElement.remove();
                    let newTicketsContainer = document.createElement('div');
                    newTicketsContainer.classList.add('tickets-container');
                    let mainContainer = document.getElementsByClassName('main-container')[0];
                    mainContainer.appendChild(newTicketsContainer);
                    initialRequest();
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send(formData);
    form.reset();
    addTicketDialogCloseHandler();
    form.removeEventListener('submit', addTicketHandler);
}

let openAddTicketDialog_handler = (e) => {
    e.stopPropagation();
    let title = document.getElementsByClassName('dialog-title')[0];
    title.textContent = 'Добавить тикет';
    form.addEventListener('submit', addTicketHandler);
    openDialogWindow.classList.remove('invisible');
}

let changeTicketHandler = () => {
    event.preventDefault();
    preloader.classList.remove('invisible');
    let submitButton = document.getElementsByClassName('submit-button')[0];
    let requestedId = submitButton.dataset.submitid;
    let formData = new FormData(event.currentTarget);
    formData.append('id', requestedId);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://heroku-iliakra.herokuapp.com/?method=createTicket`);
    xhr.addEventListener('load', () => {
        preloader.classList.add('invisible');
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                if (xhr.responseText === 'OK') {
                    let ticketsContainerElement = document.getElementsByClassName('tickets-container')[0];
                    ticketsContainerElement.remove();
                    let newTicketsContainer = document.createElement('div');
                    newTicketsContainer.classList.add('tickets-container');
                    let mainContainer = document.getElementsByClassName('main-container')[0];
                    mainContainer.appendChild(newTicketsContainer);
                    initialRequest();
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send(formData);
    addTicketDialogCloseHandler();
    form.reset();
    form.removeEventListener('submit', changeTicketHandler);
}

let openChangeTicketDialog_handler = (e) => {
    e.stopPropagation();
    let title = document.getElementsByClassName('dialog-title')[0];
    let submitButton = document.getElementsByClassName('submit-button')[0];
    let changeTicketForm = document.getElementsByClassName('add-ticket-form')[0];
    changeTicketForm.addEventListener('submit', changeTicketHandler);
    title.textContent = 'Изменить тикет';
    let targetElement = e.currentTarget;
    let requestedId = targetElement.dataset.id;
    submitButton.setAttribute('data-submitId', requestedId);
    preloader.classList.remove('invisible');

    openDialogWindow.classList.remove('invisible');

    const url = `https://heroku-iliakra.herokuapp.com/?method=ticketById&id=${requestedId}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url ,true);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            preloader.classList.add('invisible');
            try {
                const data = JSON.parse(xhr.response);
                let short_description_input = document.getElementsByName('short_description')[0];
                let long_description_input = document.getElementsByName('long_description')[0];
                short_description_input.value = data.name;
                long_description_input.value = data.description;

                let radioButtons = document.getElementsByName('status');
                for (let i=0; i<radioButtons.length; i++) {
                    if (radioButtons[i].value === data.status.toString()) {
                        radioButtons[i].checked = true;
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send();
}

let deleteTicket_handler = (e) => {
    let targetElement = e.currentTarget;
    let deleteTicketId = targetElement.dataset.deleteid;
    preloader.classList.remove('invisible');

    const url = `https://heroku-iliakra.herokuapp.com/?method=deleteTicketById&deleteId=${deleteTicketId}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url ,true);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            preloader.classList.add('invisible');
            try {
                if (xhr.responseText === 'OK') {
                    let ticketsContainerElement = document.getElementsByClassName('tickets-container')[0];
                    ticketsContainerElement.remove();
                    let newTicketsContainer = document.createElement('div');
                    newTicketsContainer.classList.add('tickets-container');
                    let mainContainer = document.getElementsByClassName('main-container')[0];
                    mainContainer.appendChild(newTicketsContainer);
                    initialRequest();
                }
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send();
    deleteTicketDialogCloseHandler();
}


let openDeleteTicketDialog_handler = (e) => {
    e.stopPropagation();
    let targetElement = e.currentTarget;
    let deleteTicketId = targetElement.dataset.id;

    let okButton = document.getElementsByClassName('deletion-button')[0];
    okButton.setAttribute('data-deleteId', deleteTicketId);
    okButton.addEventListener('click', deleteTicket_handler);
    deleteTicketDialogWindow.classList.remove('invisible');
}


let showDescription_handler = (e) => {
    let targetElement = e.currentTarget;
    let descriptionContainer = targetElement.querySelector('.description');
    if (! descriptionContainer.classList.contains('invisible')) {
        descriptionContainer.classList.add('invisible');
    } else {
        let descriptionTicketId = targetElement.dataset.id;
        preloader.classList.remove('invisible');
        const url = `https://heroku-iliakra.herokuapp.com/?method=showTicketDescription&descriptionId=${descriptionTicketId}`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url ,true);
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                preloader.classList.add('invisible');
                try {
                    let ticketsContainerElement = document.getElementsByClassName('tickets-container')[0];
                    ticketsContainerElement.remove();
                    let newTicketsContainer = document.createElement('div');
                    newTicketsContainer.classList.add('tickets-container');
                    let mainContainer = document.getElementsByClassName('main-container')[0];
                    mainContainer.appendChild(newTicketsContainer);
                    
                    const data = JSON.parse(xhr.responseText);
                    let tickets = data;
                    domBuild (tickets);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        xhr.send();
    }
}


let addTicketDialogOpenButton = document.getElementById('add-button');
addTicketDialogOpenButton.addEventListener('click', openAddTicketDialog_handler);
  



