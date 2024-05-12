const populate = async (value, currencyCode) => {
    let myStr = "";
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_Dy0gKLfxtOG0pWPuq5LcI78R3VouInsqmDVw2Em4&currency=${currencyCode}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch currency data');
        }
        const rJson = await response.json();

        document.querySelector(".output").style.display = "block";

        if (rJson && rJson["data"]) {
            for (let key of Object.keys(rJson["data"])) {
                myStr += `
                    <tr>
                       
                        <td>${rJson["data"][key]['code']}</td>
                        <td>${rJson["data"][key]['value'] * value}</td>
                    </tr>
                `;
            }
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = myStr;
        } else {
            throw new Error('Invalid currency data format');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const btn = document.querySelector("#btn");
btn.addEventListener('click', (e) => {
    e.preventDefault();

    const currencyValue = parseInt(document.querySelector("[name=currencyValue]").value);
    const currencyCode = document.querySelector("[name=currencyCode]").value;

    populate(currencyValue, currencyCode);
});
