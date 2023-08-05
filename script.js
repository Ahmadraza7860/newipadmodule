async function getData() {
    try {
        // Fetch the user's IP address using ipify.org client-side API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;
        document.getElementById("user-ip").innerText = userIP;

        // Fetch additional details using the user's IP address
       const geoResponse = await fetch(`https://ipinfo.io/43.247.41.95?token=30dd7efacbc702`);
        const geoinfo = await geoResponse.json();

        // Display the fetched information
        document.getElementById("timezone").innerText = geoinfo.timezone;
        document.getElementById("city").innerText = geoinfo.city;
        document.getElementById("region").innerText = geoinfo.region;
        document.getElementById("organization").innerText = geoinfo.org;
        document.getElementById("hostname").innerText = geoinfo.ip;
        document.getElementById("Zone").innerText = geoinfo.timezone;
        document.getElementById("date").innerText = geoinfo.timezone;
        document.getElementById("pincode").innerText = geoinfo.postal;

        // Call the function to show the map using the latitude and longitude
        showMap(geoinfo.loc);

        // Fetch post offices based on the retrieved pincode
        const postalResponse = await fetch(`https://api.postalpincode.in/pincode/${geoinfo.postal}`);
        const postOfc = await postalResponse.json();
        const postOffice = postOfc[0].PostOffice;

        // Display the list of post offices
        const postOfficesListContainer = document.getElementById("post-offices-list");
        postOfficesListContainer.innerHTML = '';
        postOffice.forEach(element => {
            postOfficesListContainer.innerHTML += `
                <li>
                    <div>Name: ${element.Name}</div>
                    <div>Branch Type: ${element.BranchType}</div>
                    <div>Delivery Status: ${element.DeliveryStatus}</div>
                    <div>District: ${element.District}</div>
                    <div>Division: ${element.Division}</div>
                </li>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function showMap(location) {
    // Extracting latitude and longitude from the location string
    var latLong = location.split(",");
    var latitude = latLong[0];
    var longitude = latLong[1];

    var mapContainer = document.querySelector(".map-container");
    var iframe = document.createElement("iframe");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "300");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("style", "border:0");
    iframe.setAttribute("src", `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=14&output=embed`);

    // Clear any previous content in the mapContainer and append the iframe
    mapContainer.innerHTML = "";
    mapContainer.appendChild(iframe);
}

getData();
