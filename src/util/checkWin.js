const checkWin = (cells) => {
  const winPatterns = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ]
  let winner = null
  if(winPatterns.some((pattern) =>
      pattern.every(([i, j]) => {
        let mark = cells[i][j]
        if(mark) {
          if(winner) 
            return winner === mark
          else 
            return winner = mark
        }
      })
  )){
    return winner
  }
}

export { checkWin as default }