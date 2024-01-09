var sensor;

document.addEventListener("DOMContentLoaded", function () {
    var sensors = document.querySelectorAll(".sensor");
    var highSensor = document.querySelectorAll('.sensor-high');
    const themeCheckbox = document.getElementById("themeCheckbox");

    highSensor.forEach(function (sensor) {
        sensor.addEventListener("click", function () {
            openWarningModal(sensor.id);
        });
    });

    sensors.forEach(function (sensorElement) {
        sensorElement.addEventListener("click", function () {
            sensor = sensorElement;
            toggleExplanation();
        });
    });

    themeCheckbox.addEventListener("change", function () {
        changeTheme();
    });
});

function displayError(message) {
    var errorMessages = document.getElementById("errorMessages");
    var errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = message;
    errorMessages.appendChild(errorMessageElement);
}

function checkTemperature() {
    var temperatureSpan = document.getElementById('DATA-NODE-1');
    var sensor1 = document.getElementById('sensor1');

    var temperature = parseFloat(temperatureSpan.innerText);

    if (temperature > 25.0) {
        sensor1.classList.add('sensor-high');
    } else {
        sensor1.classList.remove('sensor-high');
    }
}

function checkLuminosity() {
    var luminositySpan = document.querySelector('.lum');
    var sensor2 = document.getElementById('sensor2');

    var luminosity = parseFloat(luminositySpan.innerText);

    if (luminosity < 41) {
        sensor2.classList.add('sensor-high');
    } else {
        sensor2.classList.remove('sensor-high');
    }
}

function checkCo2() {
    var CO2Span = document.querySelector('.co2');
    var sensor3 = document.getElementById('sensor3');

    var CO2 = parseFloat(CO2Span.innerText);

    if (CO2 > 700) {
        sensor3.classList.add('sensor-high');
    } else {
        sensor3.classList.remove('sensor-high');
    }
}

function checkNoise() {
    var noiseSpan = document.querySelector('.dB');
    var sensor4 = document.getElementById('sensor4');

    var noise = parseFloat(noiseSpan.innerText);

    if (noise > 30) {
        sensor4.classList.add('sensor-high');
    } else {
        sensor4.classList.remove('sensor-high');
    }
}

function checkSpace() {
    var spaceSpan = document.querySelector('.pers');
    var sensor5 = document.getElementById('sensor5');

    var space = parseFloat(spaceSpan.innerText);

    if (space > 8) {
        sensor5.classList.add('sensor-high');
    } else {
        sensor5.classList.remove('sensor-high');
    }
}

function checkCommunication(){
    var temperatureSpan = document.querySelector('.temp');
    var temperature = parseFloat(temperatureSpan.innerText);
    var luminositySpan = document.querySelector('.lum');
    var luminosity = parseFloat(luminositySpan.innerText);
    var CO2Span = document.querySelector('.co2');
    var CO2 = parseFloat(CO2Span.innerText);
    var noiseSpan = document.querySelector('.dB');
    var noise = parseFloat(noiseSpan.innerText);
    var spaceSpan = document.querySelector('.pers');
    var space = parseFloat(spaceSpan.innerText);

    if (temperature==0 && luminosity==0 && CO2==0 && noise==0 && space==0){
        var warningModal = document.getElementById("warningModal");
        var warningMessage = "Mauvaises communication avec les capteurs, veuillez les redémarrer.";
        document.getElementById("warningMessage").innerText = warningMessage;
        warningModal.style.display = "block";
    }
}

function checkSensor(){
    checkTemperature();
    checkLuminosity();
    checkCo2();
    checkNoise();
    checkSpace();
    checkCommunication();
}

checkSensor();
setInterval(checkSensor, 5000);

function closeWarningModal() {
    var warningModal = document.getElementById("warningModal");
    warningModal.style.display = "none";
}

function openWarningModal(sensorId) {
    var warningModal = document.getElementById("warningModal");
    var warningMessage = "";

    switch (sensorId) {
        case "sensor1":
            warningMessage = "La température extérieure dépasse 25°C, veuillez prendre des mesures appropriées.";
            break;
        case "sensor2":
            warningMessage = "La luminosité extérieure est faible, veuillez prendre des mesures appropriées.";
            break;
        case "sensor3":
            warningMessage = "Le taux de CO2 du gymnase est élevé, veuillez prendre des mesures appropriées.";
            break;
        case "sensor4":
            warningMessage = "Le niveau sonore du gymnase est élevé, veuillez prendre des mesures appropriées.";
            break;
        case "sensor5":
            warningMessage = "Le nombre de personnes à l'intérieur est trop important, veuillez prendre des mesures appropriées.";
            break;

        default:
            warningMessage = "Le capteur relève une valeur anormale, veuillez prendre des mesures appropriées.";
            break;
    }

    document.getElementById("warningMessage").innerText = warningMessage;
    warningModal.style.display = "block";
}

function toggleExplanation() {
    var warningModal = document.getElementById("warningModal");
    if (warningModal.style.display === "block") {
        return;
    }

    var explanation = sensor.querySelector(".explanation");
    if (explanation) {
        explanation.style.display = (explanation.style.display === "none" || explanation.style.display === "") ? "block" : "none";
    }
}

function changeTheme() {
    var themeCheckbox = document.getElementById("themeCheckbox");
    var styleLink = document.getElementById("themeStylesheet");

    if (themeCheckbox && styleLink) {
        if (themeCheckbox.checked) {
            styleLink.href = "dark-theme.css";
        } else {
            styleLink.href = "light-theme.css";
        }
    }
}