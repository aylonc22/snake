import React,{useState,useEffect,useRef} from 'react'
import './App.css';
import snakeIco from './snake_game.png'
function App() {
 
  const initRow = []
  for(let i =0;i<35;i++)
  {
    initRow.push([]);
    for(let j=0;j<35;j++)
      initRow[i].push(0);
  }
  const [interval,setinterval] = useState(250);
  const [gameOver,setGameOver] = useState(false);
  const [board,setBoard] = useState(initRow);
  const [snake,setSnake] = useState([{x:Math.floor(board.length/2),y:Math.floor(board[0].length/2)}]);
  const [direction,setDirection] = useState("ArrowLeft");
  const [oldDirection,setOldDirection] = useState("ArrowLeft");
  const [apple,setApple] = useState({x: Math.floor(Math.random()*board.length), y: Math.floor(Math.random()*board.length)});
  const [appleCount,setAppleCount] = useState(0);
  const [snakeColor] = useState(`blue`);
  const [appleColor] = useState(`red`);    
  const displaySnake = ()=>{
    let newBoard = [...initRow];
    newBoard[apple.y][apple.x] = 1;   
    snake.forEach((cell,i)=>{
      if(i===0)      
        {
          if(board[cell.y][cell.x]===3)
            {setinterval(null);
              setGameOver(true);
            }
          else
            newBoard[cell.y][cell.x]=2
        }                           
      else
        newBoard[cell.y][cell.x]=3
    });    
    setBoard(newBoard);
  }
  const moveSnake = (key)=>{
    let newSnake =[];    
   let flag = true
   if(key!==undefined)
   {
        if(key==="ArrowLeft" && direction!== "ArrowRight" )
             { newSnake.push({x:snake[0].x -1 === -1 ? board[0].length-1:snake[0].x -1 , y:snake[0].y}); flag=false;}
        if(key==="ArrowRight"  && direction!== "ArrowLeft")
              {newSnake.push({x:snake[0].x +1 === board[0].length?0:snake[0].x +1, y:snake[0].y}); flag=false;}
        if(key==="ArrowUp" && direction!== "ArrowDown")
              {newSnake.push({x:snake[0].x, y:snake[0].y - 1 === -1 ? board.length-1:snake[0].y - 1}); flag=false;}
        if(key==="ArrowDown" && direction!== "ArrowUp")
            {newSnake.push({x:snake[0].x, y:snake[0].y + 1 === board.length?0:snake[0].y + 1}); flag=false;}
   } 
   else
        {
            if(direction==="ArrowLeft" && oldDirection!== "ArrowRight" )
                { newSnake.push({x:snake[0].x -1 === -1 ? board[0].length-1:snake[0].x -1 , y:snake[0].y}); flag=false;}
            if(direction==="ArrowRight"  && oldDirection!== "ArrowLeft")
                {newSnake.push({x:snake[0].x +1 === board[0].length?0:snake[0].x +1, y:snake[0].y}); flag=false;}
            if(direction==="ArrowUp" && oldDirection!== "ArrowDown")
                {newSnake.push({x:snake[0].x, y:snake[0].y - 1 === -1 ? board.length-1:snake[0].y - 1}); flag=false;}
            if(direction==="ArrowDown" && oldDirection!== "ArrowUp")
                {newSnake.push({x:snake[0].x, y:snake[0].y + 1 === board.length?0:snake[0].y + 1}); flag=false;}
        }
        if(flag)
            {
                  if(oldDirection==="ArrowLeft" )
                      newSnake.push({x:snake[0].x -1 === -1 ? board[0].length-1:snake[0].x -1 , y:snake[0].y});
                  if(oldDirection==="ArrowRight" )
                      newSnake.push({x:snake[0].x +1 === board[0].length?0:snake[0].x +1, y:snake[0].y});
                  if(oldDirection==="ArrowUp" )
                      newSnake.push({x:snake[0].x, y:snake[0].y - 1 === -1 ? board.length-1:snake[0].y - 1});
                  if(oldDirection==="ArrowDown" )
                      newSnake.push({x:snake[0].x, y:snake[0].y + 1 === board.length?0:snake[0].y + 1});
            }
    
    if(board[newSnake[0].y][newSnake[0].x] === 3)
      {
        setinterval(null);
        setGameOver(true);        
      }
  else
  {
    for(let i=1;i<snake.length;i++)
    newSnake.push(snake[i-1]);
  
  if(newSnake[0].x === apple.x && newSnake[0].y === apple.y)
  {
    setApple({x: Math.floor(Math.random()*board.length), y: Math.floor(Math.random()*board.length)});
    setAppleCount(count=>count+1);
    newSnake.push(snake[snake.length-1]);  
  }

  setSnake(newSnake);
  displaySnake();
  }
  }
  const handleKey = (e)=>{
    const {key} =e;           
    if((key==="ArrowLeft" || key==="ArrowRight" || key==="ArrowUp" || key==="ArrowDown") &&  direction!==key)
            {             
              setOldDirection(direction);
              setDirection(key);
              moveSnake(key)
            }
    else
    if(key===" " && gameOver)
            {
              setGameOver(false)
              setinterval(250);
             setBoard(initRow);
              setSnake([{x:Math.floor(board.length/2),y:Math.floor(board[0].length/2)}]);
              setDirection("ArrowLeft");
             setOldDirection("ArrowLeft");
             setApple({x: Math.floor(Math.random()*board.length), y: Math.floor(Math.random()*board.length)});
             setAppleCount(0);            
            }
  }  

  const handleStyle = (cell)=>{
    if(cell===0)
    return {};
    if(cell===1)
      return {backgroundColor:appleColor};
    if(cell===2)
      return {backgroundColor:snakeColor};
    if(cell===3)
      return {backgroundColor:snakeColor};;
  }

  function useInterval(callback, delay) {

    const savedCallback = useRef();
    
    // Remember the latest callback.
    
    useEffect(() => {
    
    savedCallback.current = callback;
    
    }, [callback]);
    
    // Set up the interval.
    
    useEffect(() => {
    
    function tick() {
    
    savedCallback.current();
    
    }
    
    if (delay !== null) {
    
    let id = setInterval(tick, delay);
    
    return () => clearInterval(id);
    
    }
    
    }, [delay]);
    
    }
  useInterval(moveSnake,interval);
  return (
    <div tabIndex ="1" className="App" onKeyUp  ={(e)=>handleKey(e)}>
     <div className ="top"><div>Simple React Snake</div><div className = "apples">{`Apples Eaten ${appleCount}`}</div>  </div>
     <div className ="board">
     {gameOver?<div className ="gameOver">
       <div className="label">ggg</div>
       <div className="label">{`you ate ${appleCount} apples good job`}</div>
       <div className="label">press space to start again</div>
       </div>:board.map((row,i)=><div key ={i} className = "row">
       {row.map((cell,index)=><div key ={index} style ={handleStyle(cell)} className = "cell"></div>)}
     </div>)}    
     </div>
     <img className ="snake" src ={snakeIco} alt=""/>
    </div>
  );
}

export default App;
