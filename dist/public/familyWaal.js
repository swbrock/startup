//get all users in family
//get all events in family

//get all events for all users in family
async function getEvents() {
    let events = [];
    try {
        const response = await fetch('/api/events');
        events = await response.json();

        localStorage.setItem('events', JSON.stringify(events));
    } catch (err) {
        const eventsJSON = localStorage.getItem('events');
        if (eventsJSON) {
            events = JSON.parse(eventsJSON);
        }
    }
    displayEvents(events);
}

function displayEvents(events) {
    const tableBodyE1 = document.querySelector('#events');

    if (events.length) {
        for (const [i, event] of events.entries()) {
            const startDateTdE1 = document.createElement('td');
            const endDateTdE1 = document.createElement('td');
            const titleTdE1 = document.createElement('td');

            startDateTdE1.textContent = event.startDate;
            endDateTdE1.textContent = event.endDate;
            titleTdE1.textContent = event.title;

            const row = document.createElement('tr');
            row.appendChild(titleTdE1);
            row.appendChild(startDateTdE1);
            row.appendChild(endDateTdE1);

            tableBodyE1.appendChild(row);
        }
    } else {
        tableBodyE1.innerHTML = '<tr><td colspan="3">No events</td></tr>';
    }
}

