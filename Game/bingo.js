let randomNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
shuffle(randomNumbers);
let currentIndex = 0;

let p1Strikes = 0;
let p2Strikes = 0;

// Function to generate one Bingo board
function createBingoBoard(tableId) {
    const table = document.querySelector(`#${tableId}`);

    const winningPositions = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];

    let arr = [];
    for (let i = 1; i <= 25; i++) arr.push(i);

    shuffle(arr);

    let iterator = 0;
    for (let i = 0; i < 5; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");
            td.textContent = arr[iterator];
            td.classList.add("main-table-cell");
            tr.appendChild(td);
            iterator++;
        }
    }

    const cells = table.querySelectorAll(".main-table-cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            
            // Already clicked protection
            if (cell.classList.contains("strickout")) return;

            cell.classList.add("strickout");

            // Count strikes
            if (tableId === "tblBingo1") p1Strikes++;
            else p2Strikes++;

            // Show next random number ONLY when both have clicked once per turn
            if (p1Strikes === p2Strikes) showNextNumber();

            if (checkWin(cells, winningPositions)) {
                alert(`${tableId === "tblBingo1" ? "Player 1" : "Player 2"} says BINGO!`);
                location.reload();
            }
        });
    });
}

// Shuffle array
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Check if someone won
function checkWin(cells, positions) {
    return positions.some(combo =>
        combo.every(index => cells[index].classList.contains("strickout"))
    );
}

// Show next random number
function showNextNumber() {
    if (currentIndex < randomNumbers.length) {
        document.getElementById("currentNumber").textContent = randomNumbers[currentIndex];
        currentIndex++;
    } else {
        document.getElementById("currentNumber").textContent = "Game Over";
    }
}

// Create boards
createBingoBoard("tblBingo1");
createBingoBoard("tblBingo2");

// Show first number when game starts
showNextNumber();
