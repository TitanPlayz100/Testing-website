function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength - 3) + '\n...';
    } else {
        return str;
    }
}

async function loadData() {
    try {
        // Fetch the JSON file
        const response = await fetch('./assets/youtube-subscriptions.json');
        const jsonData = await response.json();

        // sort the things by its channel name
        jsonData.sort((a, b) => a.Title.localeCompare(b.Title));

        const container = document.getElementById('channel-container');

        jsonData.forEach(item => {
            // Create a new div element
            const link = document.createElement('a');
            link.classList.add('channelbox');
            link.href = item.Channel;

            const paragraph = document.createElement('p');
            paragraph.textContent = item.Title;
            paragraph.textContent.replace("\n\n", "\n")
            paragraph.classList.add('channelname');
            link.appendChild(paragraph);

            const description = document.createElement('p');
            description.innerText = truncateString(item.Description, 100);
            description.classList.add('channeldescription');
            link.appendChild(description);

            container.appendChild(link);
        });
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

function searchFunction() {
    var input, filter, channels, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    channels = document.querySelectorAll(".channelbox");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < channels.length; i++) {
        a = channels[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            channels[i].style.display = "";
        } else {
            channels[i].style.display = "none";
        }
    }
}  

window.onload = loadData;