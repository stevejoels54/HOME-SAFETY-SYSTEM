<div class="main-container">
    <div class="card_container">
        <div class="card">
            <div class="card-icon">
                <object id="svg1" data="/public/icons/thermometer.svg" type="image/svg+xml"></object>
            </div>
            <div class="card-content">
                <h1>Temp</h1>
                <h2><span id="tempValue">0</span> °C</h2>
                <p id="tempMessage">Temperature condition</p>
            </div>
        </div>
        <div class="card">
            <div class="card-icon">
                <img class="card-image" src="/public/images/lpg.png" alt="">
            </div>
            <div class="card-content">
                <h1>LPG</h1>
                <h2><span id="lpgValue">0</span> PPM</h2>
                <p id="lpgMessage">LPG condition</p>
            </div>
        </div>
        <div class="card">
            <div class="card-icon">
                <object id="svg1" data="/public/icons/smoke.svg" type="image/svg+xml"></object>
            </div>
            <div class="card-content">
                <h1>Smoke</h1>
                <h2><span id="smokeValue">0</span> PPM</h2>
                <p id="smokeMessage">Smoke Condition</p>
            </div>
        </div>
        <div class="card">
            <div class="card-icon">
                <object data="/public/icons/co.svg" type=""></object>
            </div>
            <div class="card-content">
                <h1>Carbon monoxide</h1>
                <h2><span id="coValue">0</span> PPM</h2>
                <p id="coMessage">Carbon monoxide condition</p>
            </div>
        </div>
    </div>
    <div class="temp-graph-container">
        <div class="graph">
            <h2>Graph representation </h2>
            <p id="date"></p>
            <canvas id="charts" width="170" height="100"></canvas>
        </div>
    </div>
</div>