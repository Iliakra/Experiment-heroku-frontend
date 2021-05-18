const url = `https://heroku-iliakra.herokuapp.com/?method=allTickets`;
const xhr = new XMLHttpRequest();
xhr.open('GET', url ,true);
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
});
xhr.send();