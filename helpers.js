export default function domBuild (tickets) {
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