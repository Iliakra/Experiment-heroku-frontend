function domBuild (tickets) {
    let ticketsContainer = document.getElementsByClassName('tickets-container')[0];
    for (let i=0; i<tickets.length; i++) {

        let ticketContainer = document.createElement('div');
        ticketContainer.classList.add('ticket-container');

        let statusIndicator = document.createElement('div');
        statusIndicator.classList.add('circle');
        if (tickets[i].status) {
            let readyStatusIcon = document.createElement('img');
            readyStatusIcon.classList.add('ready-status-icon');
            readyStatusIcon.src = 'images/ready-status-icon.png';
            statusIndicator.appendChild(readyStatusIcon);
        }
        ticketContainer.appendChild(statusIndicator);

        let ticketName = document.createElement('p');
        ticketName.classList.add('ticket-name');
        ticketName.textContent = tickets[i].name;
        ticketContainer.appendChild(ticketName);

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
        changeButtonIcon.classList.add('pencil');
        changeButtonIcon.src = 'images/pencil.jpg';
        changeButton.appendChild(changeButtonIcon);
        changeButton.classList.add('change-button', 'circle');
        deleteButton.classList.add('delete-button', 'circle');
        buttonsContainer.appendChild(changeButton);
        buttonsContainer.appendChild(deleteButton);
        ticketContainer.appendChild(buttonsContainer);

        ticketsContainer.appendChild(ticketContainer);
    }
}

const url = `http://heroku-iliakra.herokuapp.com/?method=allTickets`;
const xhr = new XMLHttpRequest();
xhr.open('GET', url ,true);
xhr.addEventListener('load', () => {
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

let openDialogWindow = document.getElementsByClassName('add-ticket-dialog')[0];

let addTicketDialogOpenHandler = () => {
    openDialogWindow.classList.remove('invisible');
}

let addTicketDialogCloseHandler = () => {
    event.preventDefault();
    openDialogWindow.classList.add('invisible');
}

let addTicketHandler = () => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    formData.append('id', null);
    console.log('formData',event.currentTarget);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `http://heroku-iliakra.herokuapp.com/?method=createTicket`);
    xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.response);
                console.log(data);
            } catch (e) {
                console.error(e);
            }
        }
    });
    xhr.send(formData);
    addTicketDialogCloseHandler();
}

let addTicketDialogOpenButton = document.getElementById('add-button');
addTicketDialogOpenButton.addEventListener('click', addTicketDialogOpenHandler);

let cancelAddingButton = document.getElementsByClassName('cancel-adding-button')[0];
cancelAddingButton.addEventListener('click', addTicketDialogCloseHandler);

let addTicketForm = document.getElementsByClassName('add-ticket-form')[0];
console.log(addTicketForm);
addTicketForm.addEventListener('submit', addTicketHandler);


