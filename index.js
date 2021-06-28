let userscore = 0;
let computerscore = 0;
let userRef = document.getElementById('user-score');
let computerRef = document.getElementById('computer-score');
userRef.innerHTML += userscore;
computerRef.innerHTML += computerscore;
let turn = 0;
let choice = turn == 0 ? 'X' : 'O';

userRef.classList.add("isTurn");

let choices = [
    ["","",""],
    ["","",""],
    ["","",""],
]

const playTurn = (clickedID) =>{
    if(document.getElementById(clickedID).innerHTML != "") return;
    placeXO(clickedID);
    const ifFull = checkIfOver();
    const isWinner = checkForWinner()
    if(ifFull && !isWinner){
        alert("Game over - draw");
        restartGame();
    }
    else if(isWinner){
        if(turn == 0) alert("User won");
        else alert("Computer won");
        updateScore();
        restartGame();
    }
    else updateTurn(turn);

}

const checkIfOver = () =>{
    for(let i = 0 ; i < choices.length ; i++){
        for(let j = 0 ; j < choices.length ; j++){
            if(choices[i][j] == "") return false 
        }
    }
    return true;
}

const placeXO = (id) =>{
    choice = turn == 0 ? 'X' : 'O';
    let element = document.getElementById(id);
    const row = element.getAttribute("data-row"); 
    const col = element.getAttribute("data-col"); 
    choices[row][col] = choice;
    element.innerHTML = choice;
}

const updateTurn = () =>{
    turn = (turn + 1) % 2;
    choice = turn == 0 ? 'X' : 'O';
    if(turn == 0){
        userRef.classList.add("isTurn");
        computerRef.classList.remove("isTurn");
    }
    else{
        userRef.classList.remove("isTurn");
        computerRef.classList.add("isTurn");
        playComputer();
    }
    
}

const playComputer = () =>{
    console.log('playing for pc');
    let choose = "";
    for(let i = 0 ; i < choices.length ; i++){
        for(let j = 0 ; j < choices.length ; j++){
            if(choices[i][j] == ""){
                choose = `${i}${j}`;
                break;
            }
        }
    }

    playTurn(choose);
}

const checkForWinner = () =>{
    let rowCounter = 0 , colCounter = 0;

    // checking diagonals
    console.log('checking diagonals');
    if(choices[0][0] == choices[1][1] && choices[1][1] == choices[2][2] && choices[1][1] == choice) return true; 
    else if(choices[0][2] == choices[1][1] && choices[1][1] == choices[2][0] && choices[1][1] == choice) return true; 
    for(let i = 0 ; i < choices.length ; i++){
        for(let j = 0 ; j < choices.length ; j++){
            // checking rows
            if(choices[i][j] == choice) rowCounter++;
            // checking columns
            if(choices[j][i] == choice) colCounter++;
        }
        console.log('checking row : ' + rowCounter);
        console.log('checking col : ' + colCounter);
        if(rowCounter == 3 || colCounter == 3 ) return true;
        // resetting counters
        rowCounter = 0;
        colCounter = 0;
    }
    return false;
}

const updateScore = () =>{
    console.log('updating score');
    if(choice == 'X'){
        userscore +=1;
        userRef .innerHTML = `User score : ${userscore}`;  
    } 
    else{ 
        computerscore +=1;
        computerRef.innerHTML = `Computer score : ${computerscore}`;
    }
}

const restartGame = () =>{
    alert("Restarting game");
    choices = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];
    turn = 0;
    choice = turn == 0 ? 'X' : 'O';
    userRef.classList.add("isTurn");
    for(let i = 0 ; i < choices.length ; i++){
        for(let j = 0 ; j < choices.length ; j++){
            document.getElementById(`${i}${j}`).innerHTML = "";
        }
    }
}
