export const checkIsAlive = (arr, i, currentArr, fieldSize, nextStep, policy) => {
    arr.forEach((el, j) => {
      let aliveNeighbours = [];
      if (i-1 > -1 && currentArr[i-1][j] === 1) aliveNeighbours.push(1)
      if (i+1 < fieldSize && currentArr[i+1][j] === 1) aliveNeighbours.push(1)
      if (j+1 < fieldSize && currentArr[i][j+1] === 1) aliveNeighbours.push(1)
      if (j-1 > -1 && currentArr[i][j-1] === 1) aliveNeighbours.push(1)
      if (i+1 < fieldSize && j+1 <= fieldSize && currentArr[i+1][j+1] === 1) aliveNeighbours.push(1)
      if (i-1 > -1 && j-1 >= 0 && currentArr[i-1][j-1] === 1) aliveNeighbours.push(1)
      if (i+1 < fieldSize && j-1 > -1 && currentArr[i+1][j-1] === 1) aliveNeighbours.push(1)
      if (i-1 > -1 && j+1 < fieldSize && currentArr[i-1][j+1] === 1) aliveNeighbours.push(1)

      const neighLength = aliveNeighbours.length;
      if (policy === 'conway') {
        // Any dead cell with exactly three live neighbours becomes a live cell
        if (el === 0 && neighLength === 3) nextStep[i][j] = 1
        // Any live cell with two or three live neighbours lives
        else if (el === 1 && (neighLength === 2 || neighLength === 3)) nextStep[i][j] = 1
        // Any live cell with fewer than two live neighbours dies, Any live cell with more than three live neighbours dies
        else if (el === 1 && (neighLength > 3 || neighLength < 2)) nextStep[i][j] = 0
        // Any dead cell with non three live neighbours stays dead
        else nextStep[i][j] = 0
      } else if (policy === 'hyperActive') {    
        // Any dead cell with exactly three live neighbors becomes a live cell 
        if (el === 0 && neighLength === 3) nextStep[i][j] = 1   
        // Any live cell with two or three live neighbors lives       
        else if (el === 1 && (neighLength === 2 || neighLength === 3)) nextStep[i][j] = 1
        // Any live cell with fewer than two live neighbors dies, Any live cell with more than five live neighbors dies 
        else if (el === 1 && (neighLength > 5 || neighLength < 2)) nextStep[i][j] = 0
        // Any dead cell with non three live neighbors stays dead
        else nextStep[i][j] = 0
      } else if (policy === 'highLife') {
        // Any dead cell with exactly three or six live neighbours becomes a live cell
        if (el === 0 && (neighLength === 3 || neighLength === 6)) nextStep[i][j] = 1
        // Any live cell with two or three live neighbours lives
        else if (el === 1 && (neighLength === 2 || neighLength === 3)) nextStep[i][j] = 1
        // Any live cell with fewer than two live neighbours dies, Any live cell with more than three live neighbours dies
        else if (el === 1 && (neighLength > 3 || neighLength < 2)) nextStep[i][j] = 0
        // Any dead cell with non three live neighbours stays dead
        else nextStep[i][j] = 0 
      } else if (policy === 'spontaneous') {
        // original rules
        if (el === 0 && neighLength === 3) nextStep[i][j] = 1
        else if (el === 1 && (neighLength === 2 || neighLength === 3)) nextStep[i][j] = 1
        else if (el === 1 && (neighLength > 3 || neighLength < 2)) nextStep[i][j] = 0
        // A dead cell has a chance of 0.5 percent to be spontaneously reborn
        else if (el === 0 && Math.random() < 0.005) nextStep[i][j] = 1
        else nextStep[i][j] = 0
      }
    })
};