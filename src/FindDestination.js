import  computeDestPath from "./dijktrasAlgo";
function getEnterDestinationData (destOrFac, curretPosition, roomDestination, useElevator, useEmExit){
   

    computeDestPath(destOrFac,curretPosition, roomDestination, useElevator, useEmExit);
    
}

export default getEnterDestinationData;