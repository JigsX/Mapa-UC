let elevatorNodes = [{id: 4, node: 1142}, {id:5, node:1198}, {id:6, node: 1290}, {id:7, node: 1370}, {id:8, node:1446},
    {id:9,node:1521},{id:10,node: 1604}];

let arr = [1370,2,1198,4,5,6,7];

let ElevatorTargetFloor;
let ElevatorCurrentFloor;
for(let i = 0; i<arr.length; i++){
    for(let j = 0; j<elevatorNodes.length; j++){
        if(arr[i]===elevatorNodes[j].node){
            ElevatorTargetFloor = elevatorNodes[j].id;
        }
    }
}
for(let i = 0; i<arr.length; i++){
    for(let j = 0; j<elevatorNodes.length; j++){
        console.log("path: ", arr[i], " ElePath: ",elevatorNodes[j].node );
        ElevatorCurrentFloor = elevatorNodes[j].id;
        if(arr[i]===elevatorNodes[j].node){
            
            break;
        }
        
    }
    break;
}

console.log("First: ", ElevatorCurrentFloor, " Last: ", ElevatorTargetFloor);