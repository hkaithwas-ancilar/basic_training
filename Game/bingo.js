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
        for (let i = 1; i <= 25; i++) {
            arr.push(i);
        }

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

    // Add click event for each cell
    const cells = table.querySelectorAll(".main-table-cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            cell.classList.add("strickout");

            if (checkWin(cells, winningPositions)) {
                alert(`${tableId === "tblBingo1" ? "Player 1" : "Player 2"} says BINGO!`);
                location.reload();
            }
        });
    });
}

// Shuffle array randomly
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Check for winning combination
function checkWin(cells, positions) {
    return positions.some(combo =>
        combo.every(index => cells[index].classList.contains("strickout"))
    );
}

// Create 2 Bingo boards
createBingoBoard("tblBingo1");
createBingoBoard("tblBingo2");
