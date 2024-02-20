const getBuilding = (roomName) =>{
    if(roomName[0].toLowerCase() === 's'){
        return 'Science';
    }
};
if(isChoiceEnterDest){
        getNodeValue(getBuilding(currentInputValue),currentInputValue)
        .then(currentRoomNode =>{
            getNodeValue(getBuilding(destinationInputValue),destinationInputValue)
            .then(DestiRoomNode =>{ 
                console.log(DestiRoomNode);
                path = computeDestPath(
                    "enterDestination",
                    String(currentRoomNode),
                    String(DestiRoomNode),
                    isUseElevatorChecked,
                    isEmergencyExitClicked
                );
                floor = findFloorInfo(
                    "enterDestination",
                    String(currentRoomNode),
                    String(DestiRoomNode),
                    isUseElevatorChecked,
                    isEmergencyExitClicked
                );                   
                connectBuildingNodes(floor);
                getData();
            })
            
        })

}