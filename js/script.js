// jshint esversion: 10

var map = L.map('map');

const placeMarker = (lat, lng, msg) => {
    map.setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(msg)
        .openPopup();
};

const currentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const curPos = async () => {
    const pos = await currentLocation();
    let {latitude: lat, longitude: lng} = pos.coords;
    placeMarker(lat, lng, "Your current location");
    //
    // getIpData("1.7.255.255");
};

curPos();

const paraIP = document.querySelector(".ip");
const paraLoc = document.querySelector(".loc");
const paraTime = document.querySelector(".time");
const paraISP = document.querySelector(".isp");

const setContent = (ip, region, country, timezone, isp) => {
    paraIP.textContent = ip;
    paraLoc.textContent = region +" "+ country;
    paraTime.textContent = "UTC" + timezone;
    paraISP.textContent = isp;
};


const getIpData = async (inputIP) => {
    const ipPromise = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_HCYiswDiIEbTFj68N5hgWBSjFJw0N&ipAddress=${inputIP}`);
    const ipData = await ipPromise.json();
    console.log(ipData);
    let {
        ip,
        isp,
        location: {
            city,
            region,
            country,
            lat,
            lng,
            timezone
        }
    } = ipData;
    console.log(ip, region, country, timezone, isp);
    setContent(ip, region, country, timezone, isp);
    let msg = `${city}, ${region}, ${country}`;
    placeMarker(lat, lng, msg);
};
search = document.querySelector(".form__search");
btn = document.querySelector(".form__btn");
btn.addEventListener('click', event => {
    event.preventDefault();
    let val = search.value;
    getIpData(val);

});
