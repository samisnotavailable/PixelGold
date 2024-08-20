var attemptsLeft = 20;
var goldCap = 250;
var log = [];

// Event listeners
document.getElementById("cave").addEventListener("click", caveBtnClick);
document.getElementById("house").addEventListener("click", houseBtnClick);
document.getElementById("goldmine").addEventListener("click", goldmineBtnClick);
document.getElementById("casino").addEventListener("click", casinoBtnClick);

document.getElementById("reset").addEventListener("click", resetGame);


function updateTotalGold(goldChange) {
    var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
    var newGold = currentGold + goldChange;
    if (newGold <= goldCap) {
        document.getElementById("totalGold").value = newGold;
    } else {
        document.getElementById("totalGold").value = goldCap;   
    }
}

function updateAttemptsLeft() {
    attemptsLeft--;
    document.getElementById("attempt").value = attemptsLeft;
}

function updateLog(eventType, goldChange) {
    var logUpdate = {
        eventType: eventType,
        attemptsLeft: attemptsLeft,
        goldChange: goldChange,
        totalGold: parseInt(document.getElementById("totalGold").value)
    };

    log.push(logUpdate);
}

function resetGame() {
    attemptsLeft = 20;
    document.getElementById("attempt").value = attemptsLeft;
    document.getElementById("totalGold").value = 0;
    log = [];
    displayLog();
}

// Increase the user's gold by 5
function caveBtnClick() {
    if (attemptsLeft > 0) {
        updateTotalGold(5);
        updateLog("Cave", 5);
        updateAttemptsLeft();
        displayLog();
    } else {
        alert("You've run out of attempts!");
    }
}

// Increase the user's gold by 10 on an 80% chance
function houseBtnClick() {
    if (attemptsLeft > 0) {
        var chance = Math.floor(Math.random() * 100) + 1;
        var goldChange = 0;

        if (chance <= 80) {
            updateTotalGold(10);
            updateLog("House", goldChange);
            updateAttemptsLeft();
            displayLog();
        } else {
            updateLog("House", goldChange);
            displayLog();
        }
    } else {
        alert("You've run out of attempts!");
    }
}

// Increase the user's gold by 1-25 on an 80% chance
function goldmineBtnClick() {
    if (attemptsLeft > 0) {
        var chance = Math.floor(Math.random() * 100) + 1;
        var goldChange = 0;

        if (chance <= 80) {
            var goldRange = Math.floor(Math.random() * 25) + 1;
            updateTotalGold(goldRange);
            updateLog("Goldmine", goldRange);
            updateAttemptsLeft();
            displayLog();
        } else {
            updateLog("Goldmine", goldChange);
            displayLog();
        }
    } else {
        alert("You've run out of attempts!");
    }
}

// Increase or decrease the user's gold by 40-50 on a 50% chance
function casinoBtnClick() {
    if (attemptsLeft > 0) {
        var chance = Math.floor(Math.random() * 100) + 1;
        var goldChange = 0;

    if (chance <= 50) {
        // For losing 
        goldChange = Math.floor(Math.random() * (50 - 40 + 1)) - 50;
        updateTotalGold(goldChange);
        updateLog("Casino", goldChange);
        updateAttemptsLeft();
        displayLog();
    } else {
        // For winning
        goldChange = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
        updateTotalGold(goldChange);
        updateLog("Casino", goldChange);
        updateAttemptsLeft();
        displayLog();
    }
    } else {
        alert("You've run out of attempts!");
    }
}

function displayLog(tab = 'AllResults') {
    var logUpdate;
    if(tab === 'AllResults') {
        logUpdate = document.getElementById("allLog");
    } else if (tab === "GoldWins") {
        logUpdate = document.getElementById("winLog");
    } else if (tab === "GoldLosses") {
        logUpdate = document.getElementById("lossLog");
    }

    logUpdate.innerHTML = "";

    log.forEach(function(entry) {
        var logEntry = document.createElement("div");
        logEntry.innerHTML = "EVENT: " + entry.eventType + "<br>" + 
                              "ATTEMPTS LEFT: " + entry.attemptsLeft + "<br>" + 
                              "GOLD CHANGE: " + entry.goldChange + "<br>" + 
                              "TOTAL GOLD: " + entry.totalGold + "<br>" + 
                              "‎ ";
        if (entry.goldChange < 0) {
            logEntry.style.color = "red";
            logEntry.style.fontWeight = "500";
        } else if (entry.goldChange > 0) {
            logEntry.style.color = "green";
            logEntry.style.fontWeight = "500";
        } else {
            logEntry.style.color = "white";
            logEntry.style.fontWeight = "500";
        }

        if ((tab === 'AllResults') || 
            (tab === 'GoldWins' && entry.goldChange > 0) ||
            (tab === 'GoldLosses' && entry.goldChange < 0)) {
                logUpdate.appendChild(logEntry);
            } 
    });
}

function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Hide tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Deactivate tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the selected tab
    document.getElementById(tabName).style.display = "block";

    // Activate the clicked tab link
    event.currentTarget.className += " active";

    // Display log based on selected tab
    displayLog(tabName);
}

/* old code
document.getElementById("cave").addEventListener("click", function() {
    if (attemptsLeft > 0) {
        var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
        var newGold = currentGold + 5;
        if (newGold <= goldCap) {
            document.getElementById("totalGold").value = newGold;
        } else {
            document.getElementById("totalGold").value = goldCap;
        }

        attemptsLeft--;
        document.getElementById("attempt").value = attemptsLeft;
        } else {
        alert("You've run out of attempts!");
    }
});

document.getElementById("house").addEventListener("click", function() {
    if (attemptsLeft > 0) {
        var chance = Math.floor(Math.random() * 100) + 1;

        if (chance <= 80) {
            var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
            var newGold = currentGold + 10;
            if (newGold <= goldCap) {
                document.getElementById("totalGold").value = newGold;
            } else {
                document.getElementById("totalGold").value = goldCap;   
            }

            attemptsLeft--;
            document.getElementById("attempt").value = attemptsLeft;
        }
    } else {
        alert("You've run out of attempts!");
    }
});

document.getElementById("goldmine").addEventListener("click", function() {
    if (attemptsLeft > 0) {

        var chance = Math.floor(Math.random() * 100) + 1;

        if (chance <= 80) {
            var goldRange = Math.floor(Math.random() * 25) + 1;
            var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
            var newGold = currentGold + goldRange;
            if (newGold <= goldCap) {
                document.getElementById("totalGold").value = newGold;
            } else {
                document.getElementById("totalGold").value = goldCap;   
            }
            
            attemptsLeft--;
            document.getElementById("attempt").value = attemptsLeft;
        }
    } else {
        alert("You've run out of attempts!");
    }
});

document.getElementById("casino").addEventListener("click", function() {
    if (attemptsLeft > 0) {
        var chance = Math.floor(Math.random() * 100) + 1;

    if (chance <= 50) {
        // For losing 
        var goldFlipLoss = Math.floor(Math.random() * (50 - 40 + 1)) - 50;
        var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
        var newGold = currentGold + goldFlipLoss;
        if (newGold <= goldCap) {
            document.getElementById("totalGold").value = newGold;
        } else {
            document.getElementById("totalGold").value = goldCap;   
        }

        attemptsLeft--;
            document.getElementById("attempt").value = attemptsLeft;
        
    } else {
        // For winning
        var goldFlipWin = Math.floor(Math.random() * (50 - 40 + 1)) + 40;
        var currentGold = parseInt(document.getElementById("totalGold").value) || 0;
        var newGold = currentGold + goldFlipWin;
        if (newGold <= goldCap) {
            document.getElementById("totalGold").value = newGold;
        } else {
            document.getElementById("totalGold").value = goldCap;   
        }

        attemptsLeft--;
            document.getElementById("attempt").value = attemptsLeft;
    }
    } else {
        alert("You've run out of attempts!");
    }
});

*/
