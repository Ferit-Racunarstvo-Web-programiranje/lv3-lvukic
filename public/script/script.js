function prikaziTablicu(vremena) {
    const tbody = document.querySelector("#vrijeme-tablica tbody");
    tbody.innerHTML = "";

    for (const vrijeme of vremena) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${vrijeme.humidity}</td>
            <td>${vrijeme.temperature}</td>
            <td>${vrijeme["atmospheric Pressure"]}</td>
            <td>${vrijeme["clound Cover"]}</td>
            <td>${vrijeme.location}</td>
            <td>${vrijeme.season}</td>
            <td>${vrijeme.uv}</td>
            <td>${vrijeme.visibility}</td>
            <td>${vrijeme["weather type"]}</td>
            <td>${vrijeme["wind Speed"]}</td>
        `;
        tbody.appendChild(row);
    }
}

fetch("../weather_Small.csv")
    .then(res => res.text())
    .then(csv => {
        const rezultat = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        const vrijeme = rezultat.data.map(zapis => ({
            "atmospheric Pressure": Number(zapis["Atmospheric Pressure"]),
            "clound Cover": zapis["Cloud Cover"],
            humidity: Number(zapis.Humidity),
            location: zapis.Location,
            season: zapis.Season,
            temperature: Number(zapis.Temperature),
            uv: Number(zapis["UV Index"]),
            visibility: Number(zapis["Visibility (km)"]),
            "weather type": zapis["Weather Type"],
            "wind Speed": Number(zapis["Wind Speed"])
        }));

        const prvih20 = vrijeme.slice(0, 20);
        prikaziTablicu(prvih20);

    })
    .catch(error => console.error("Error during fetch:", error));
