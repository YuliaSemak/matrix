// Helper: create and populate matrix with random numbers
function createMatrix(nRows, nCols, min, max) {
    let res = [];
    for (let r = 0; r < nRows; r++) {
        let currentRow = [];
        for (let c = 0; c < nCols; c++) {
            // get random int
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            currentRow.push(num);
        }
        res.push(currentRow);
    }
    return res;
}

// Helper: display matrix in required format
function displayMatrix(mat) {
    if (!mat || mat.length === 0 || mat[0].length === 0) {
        console.log("Матриця порожня");
        return;
    }

    let totalCols = mat[0].length;
    let colHeaders = ["\t"];
    for (let c = 0; c < totalCols; c++) {
        colHeaders.push("стовпець " + (c + 1));
    }
    console.log(colHeaders.join("\t"));

    for (let r = 0; r < mat.length; r++) {
        let rowCells = ["рядок " + (r + 1)];
        for (let c = 0; c < totalCols; c++) {
            let val = mat[r][c];
            let out = typeof val === "number" && !Number.isInteger(val) ? val.toFixed(2) : val;
            rowCells.push(out);
        }
        console.log(rowCells.join("\t\t"));
    }
    console.log();
}

// Завдання 1: відняти від елементів кожного рядка середнє арифметичне цього рядка
function minusRowAverages(mat) {
    let result = [];
    for (let i = 0; i < mat.length; i++) {
        let row = mat[i];
        // calculate average of current row
        let sum = row.reduce((acc, curr) => acc + curr, 0);
        let mean = sum / row.length;

        let updatedRow = row.map(val => val - mean);
        result.push(updatedRow);
    }
    return result;
}

// Завдання 2: циклічний зсув матриці на k вправо та на k догори
function shiftMatrix(mat, k) {
    let rows = mat.length;
    let cols = mat[0].length;

    let rOffset = ((k % rows) + rows) % rows;
    let cOffset = ((k % cols) + cols) % cols;

    let output = [];
    for (let r = 0; r < rows; r++) {
        output.push(new Array(cols));
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // move up and move right
            let targetRow = (r - rOffset + rows) % rows;
            let targetCol = (c + cOffset) % cols;
            output[targetRow][targetCol] = mat[r][c];
        }
    }
    return output;
}

// Завдання 3: знайти максимальні елементи і видалити всі рядки та стовпці з ними
function dropMaxRowsAndCols(mat) {
    let rows = mat.length;
    let cols = mat[0].length;

    // search global maximum
    let max = -Infinity;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] > max) {
                max = mat[r][c];
            }
        }
    }

    // store indexes to delete
    let skipRows = new Set();
    let skipCols = new Set();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (mat[r][c] === max) {
                skipRows.add(r);
                skipCols.add(c);
            }
        }
    }

    // build clean matrix
    let filtered = [];
    for (let r = 0; r < rows; r++) {
        if (skipRows.has(r)) continue;

        let cleanRow = [];
        for (let c = 0; c < cols; c++) {
            if (!skipCols.has(c)) {
                cleanRow.push(mat[r][c]);
            }
        }
        filtered.push(cleanRow);
    }
    return filtered;
}

// Завдання 4: поворот квадратної матриці на 90 градусів за годинниковою стрілкою in-place
function rotateClockwise90(mat) {
    let size = mat.length;

    // step 1: transpose along main diagonal
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            let buffer = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = buffer;
        }
    }

    // step 2: reverse row items
    for (let i = 0; i < size; i++) {
        mat[i].reverse();
    }
}

// Виклик та перевірка
console.log("Початкова матриця:");
let originalMatrix = createMatrix(4, 4, 1, 9);
displayMatrix(originalMatrix);

console.log("Завдання 1: віднімання середнього значення від кожного рядка");
let task1Result = minusRowAverages(originalMatrix);
displayMatrix(task1Result);

console.log("Завдання 2: циклічний зсув (k = 1)");
let task2Result = shiftMatrix(originalMatrix, 1);
displayMatrix(task2Result);

console.log("Завдання 3: видалення рядків та стовпців з найбільшим числом");
let task3Result = dropMaxRowsAndCols(originalMatrix);
displayMatrix(task3Result);

console.log("Завдання 4: поворот на 90 градусів in-place");
let copyToRotate = originalMatrix.map(r => [...r]);
rotateClockwise90(copyToRotate);
displayMatrix(copyToRotate);
