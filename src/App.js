import { useEffect, useState } from 'react';
import { useCallback } from 'react'
import './index.css';
import blueCandy from './images/bluecandy.png'
import greenCandy from './images/greencandy.png'
import orangeCandy from './images/orangecandy.png'
import purpleCandy from './images/purplecandy.png'
import redCandy from './images/redcandy.png'
import yellowCandy from './images/yellowcandy.png'
import blank from './images/blank.png'
import { Fragment } from 'react/cjs/react.production.min';


const width =8
const candyColors =[
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
]

const App = () => {
   
  const [currentColorArrangement, setCurrentColorArrangement]=useState([])
  const [squareBeingDragged, setSquareBeingDragged]=useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced]=useState(null)
  const [scoreDisplay, setScoreDisplay] = useState (0)

  const checkForColumnOfFour =useCallback (() => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i+width, i + width*2, i+width*3]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay( (score) => score +4)
        columnOfFour.forEach(square=> currentColorArrangement[square]=blank)

        return true
      }
    }
  },[currentColorArrangement])

 

  const checkForColumnOfThree =useCallback (() => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i+width, i + width*2]
      const decidedColor = currentColorArrangement[i]
      const isBlank = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay( (score) => score +3)
        columnOfThree.forEach(square=> currentColorArrangement[square]=blank)
        return true
      }
    }
  },[currentColorArrangement])

  const checkForRowOfFour =useCallback (() => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i+1, i + 2, i + 3]
      const decidedColor = currentColorArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      if (notValid.includes(i)) continue
      const isBlank = currentColorArrangement[i] === blank

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay( (score) => score +4)
        rowOfFour.forEach(square=> currentColorArrangement[square]=blank)
        return true
      }
    }
  },[currentColorArrangement])

  const checkForRowOfThree =useCallback (() => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i+1, i + 2]
      const decidedColor = currentColorArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if (notValid.includes(i)) continue
      const isBlank = currentColorArrangement[i] === blank

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay( (score) => score +3)
        rowOfThree.forEach(square=> currentColorArrangement[square]=blank)
        return true
      }
    }
  },[currentColorArrangement])

  const moveIntoSquadBelow = useCallback (() => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && currentColorArrangement[i] === blank){
        let randomNumber = Math.floor(Math.random()*candyColors.length)
        currentColorArrangement[i]=candyColors[randomNumber]
      }
       if ((currentColorArrangement[i + width]) === blank) {
          currentColorArrangement[i + width]=currentColorArrangement[i]
          currentColorArrangement[i]=blank
        }  
      
    } 

  },[currentColorArrangement])

  const dragStart = (e) =>{
      setSquareBeingDragged(e.target)
  } 

  const dragDrop = (e) =>{
    setSquareBeingReplaced(e.target)

  }
  const dragEnd = (e) =>{
    const squareBeingDraggedId =parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId =parseInt(squareBeingReplaced.getAttribute('data-id'))
    //currentColorArrangement[squareBeingReplacedId] =squareBeingDragged.getAttribute('src')
    //currentColorArrangement[squareBeingDraggedId] =squareBeingReplaced.getAttribute('src')
    
     const validMoves = [
      squareBeingDraggedId -1,
      squareBeingDraggedId - width,
      squareBeingDraggedId +1,
      squareBeingDraggedId +width
    ]
    
    const validMove = validMoves.includes(squareBeingReplacedId)
    
    const isColumnOfFour =checkForColumnOfFour()
    const isRowOfFour= checkForRowOfFour()
    const isColumnOfThree=checkForColumnOfThree()
    const isRowOfThree=checkForRowOfThree()

    let d = squareBeingReplacedId && validMove
    let k= isRowOfThree||isRowOfFour||isColumnOfThree||isColumnOfFour
    
    if (d) {
        currentColorArrangement[squareBeingReplacedId] =squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] =squareBeingReplaced.getAttribute('src')
        if (k) {
          setSquareBeingReplaced(null)
          setSquareBeingDragged(null)
        }
    
      
    } else {
      //currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      //currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      //setCurrentColorArrangement([...currentColorArrangement])
    } 
    
  }

  const createBoard = () => {
    const randomColorArrangement =[]
    for (let i = 0; i < width*width; i++) {
      
      const randomColor = candyColors[Math.floor(Math.random()*candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement (randomColorArrangement)
   
  }
   
  useEffect ( () =>{
    createBoard()
  }, [])

  useEffect ( () =>{
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()   
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquadBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100);
    return () => clearInterval(timer)

  },[checkForColumnOfFour, checkForColumnOfThree, checkForRowOfFour, checkForRowOfThree, moveIntoSquadBelow, currentColorArrangement])
  
  const nullScore = () => {
    setScoreDisplay( (score) => 0)
    createBoard()
  }
  return (
    <div className="app">
      { 
      scoreDisplay>=100 ? (
       <Fragment>
         <div>
          <h1 className="complete">You Win!!!</h1> 
          <h1 className="bcomplete" onClick={nullScore}>Play again</h1>
         </div> 
        </Fragment>  
       ): 
      (
      <Fragment>
         <div className="game">
         {currentColorArrangement.map((candyColor, index) => (
           <img
             key={index}
             src={candyColor}
             alt={candyColor}
             data-id = {index}
             draggable = {true}
             onDragStart ={dragStart}
             onDragOver ={(e)=> e.preventDefault()} 
             onDragEnter ={(e)=> e.preventDefault()} 
             onDragLeave ={(e)=> e.preventDefault()} 
             onDrop={dragDrop}
             onDragEnd={dragEnd}
           />
         ))}
    </div>
      <div className="score-grid">
         <div className="score-gridtip">
              <strong>
              You will win once your score reaches to 100.</strong>
        </div> 
        <div className="score-board">
        <h3>{scoreDisplay}</h3>
        </div>
      </div>
      </Fragment>
      )
     }
    </div>
  );
 }

export default App;
