if(isChoiceEnterFac){
    if(selectedFacility === 'CR(MEN)' || selectedFacility === 'CR(WOMEN)' || selectedFacility === 'Gymnasium'){
        getNodeValue(getBuilding(currentInputValue),currentInputValue)
        .then(currentRoomNode =>{
            path = computeDestPath(
                "enterFindFacility",
                currentRoomNode,
                selectedFacility,
                isUseElevatorChecked,
                isEmergencyExitClicked
            );
            floor = findFloorInfo(
                "enterFindFacility",
                currentRoomNode,
                selectedFacility,
                isUseElevatorChecked,
                isEmergencyExitClicked
            );                   
            connectBuildingNodes(floor);
            getData();

        })
     }   
    }
    else{
        getNodeValue(getBuilding(currentInputValue),currentInputValue)
        .then(currentRoomNode =>{
            getFacNodeValue(selectedFacility)
            .then(facilitySelected =>{
                path = computeDestPath(
                    "enterFindFacility",
                    currentRoomNode,
                    facilitySelected,
                    isUseElevatorChecked,
                    isEmergencyExitClicked
                );
                floor = findFloorInfo(
                    "enterFindFacility",
                    currentRoomNode,
                    facilitySelected,
                    isUseElevatorChecked,
                    isEmergencyExitClicked
                );                   
                connectBuildingNodes(floor);
                getData();
            })
            

        })
     } 
