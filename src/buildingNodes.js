
function buildingNodes(buildingName) {
    let nodes = [];
    if (buildingName == "science2ndFloor") {
        
        
        nodes = [
            { id: 0, lat: 6.53, lon: 0.55,  }, 
            { id: 1, lat: 6.15, lon: 0.55,  }, {lat: 5.2, lon: .8, title: 'office',building:'Science', floor:'2nd Floor',node: 1,label: 'classroomLogo' }, 
            { id: 2, lat: 6.8, lon: 1.08, }, {lat: 7.4, lon: 0.9, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 2,label: 'classroomLogo' }, 
            { id: 3, lat: 6.53, lon: 1.08,},
            { id: 6, lat: 6.53, lon: 1.9,},
            { id: 5, lat: 6.3, lon: 1.9,  }, {lat: 5.2 , lon: 1.8, title: 'office',building:'Science', floor:'2nd Floor',node: 5,label: 'classroomLogo' }, 
            { id: 4, lat: 6.8, lon: 1.9,  }, {lat: 7.4, lon: 1.8, title: 'office',building:'Science', floor:'2nd Floor',node: 4,label: 'classroomLogo' }, 
            { id: 7, lat: 6.53, lon: 2.35,},
            { id: 8, lat: 6.53, lon: 2.48,},
            { id: 9, lat: 6.3, lon: 2.48,  }, {lat: 5.2 , lon: 2.35, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 9,label: 'classroomLogo' },
            { id: 10, lat: 6.53, lon: 2.63,},
            { id: 14, lat: 7.15, lon: 2.63,  },
            { id: 11, lat: 7.65, lon: 2.35,  }, {lat: 8.1, lon: 2.39, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 11,label: 'classroomLogo' },
            { id: 12, lat: 7.65, lon: 2.63,},
            { id: 13, lat: 7.49, lon: 2.63,  },
            { id: 15, lat: 6.8, lon: 2.88,  }, {lat: 8.1, lon: 2.89, title: 'office',building:'Science', floor:'2nd Floor',node: 15,label: 'classroomLogo' },
            { id: 16, lat: 6.53, lon: 2.88,},
            { id: 19, lat: 6.53, lon: 3.4,},
            { id: 18, lat: 6.8, lon: 3.4,  }, {lat: 7.25, lon: 3.3, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 18,label: 'classroomLogo' },
            { id: 20, lat: 6.3, lon: 3.4,  }, {lat: 5.9, lon: 3.3, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 20,label: 'classroomLogo' },
            { id: 22, lat: 6.53, lon: 4.2,},
            { id: 23, lat: 6.3, lon: 4.2,  }, {lat: 5.9, lon: 4.25, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 23,label: 'classroomLogo' },
            { id: 21, lat: 6.8, lon: 4.2,  }, {lat: 7.25, lon: 4.1, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 21,label: 'classroomLogo' },
            { id: 24, lat: 6.53, lon: 4.73,},
            { id: 25, lat: 7.82, lon: 4.73,},
            { id: 26, lat: 7.82, lon: 4.825,  }, {lat: 8.1, lon: 5.35, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 26,label: 'classroomLogo' },
            { id: 27, lat: 7.82, lon: 4.6,  }, {lat: 8.1, lon: 4, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 27,label: 'classroomLogo' },
            { id: 28, lat: 6.53, lon: 5.4,},
            { id: 29, lat: 6.8, lon: 5.4,  }, {lat: 7.25, lon: 5.35, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 29,label: 'classroomLogo' },
            { id: 30, lat: 6.3, lon: 5.4,  }, {lat: 5.9, lon: 5.35, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 30,label: 'classroomLogo' },
            { id: 31, lat: 6.53, lon: 6.02,},
            { id: 33, lat: 6.53, lon: 6.4,},
            { id: 34, lat: 6.53, lon: 6.57,},
            { id: 32, lat: 6.8, lon: 6.4,  }, {lat: 7.5, lon: 6.3, title: '',building:'Science', floor:'2nd Floor',node: 32,label: 'classroomLogo' },
            { id: 35, lat: 6.3, lon: 6.57,  }, {lat: 5.9, lon: 6.5, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 35,label: 'classroomLogo' },
            { id: 37, lat: 6.53, lon: 6.9,},
            { id: 36, lat: 6.8, lon: 6.9,  }, {lat: 7.7, lon: 6.85, title: '',building:'Science', floor:'2nd Floor',node: 36,label: 'classroomLogo' },
            { id: 38, lat: 6.53, lon: 7.22,},
            { id: 39, lat: 6.53, lon: 7.5,},
            { id: 48, lat: 5.1, lon: 7.22,  },
            { id: 47, lat: 5.6, lon: 7.31,  }, {lat: 5.5, lon: 7.6,  title: 'facility',building:'Science', floor:'2nd Floor',node: 47,label: 'classroomLogo' },
            { id: 46, lat: 6.05, lon: 7.4,  }, {lat: 6.05, lon: 7.7,  title: 'facility',building:'Science', floor:'2nd Floor',node: 46,label: 'classroomLogo' },
            { id: 40, lat: 6.8, lon: 7.5,  }, {lat: 7.7, lon: 7.4, title: '',building:'Science', floor:'2nd Floor',node: 40,label: 'classroomLogo' },
            { id: 41, lat: 6.53, lon: 7.75, },
            { id: 42, lat: 6.67, lon: 7.75,  },
            { id: 45, lat: 6.4, lon: 7.795,label: 'leaveButton'  },
            { id: 43, lat: 6.67, lon: 8.04,  },
            { id: 44, lat: 6.8, lon: 8.04,  },  {lat: 7.7, lon: 8.35, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 44,label: 'classroomLogo' },
            { id: 49, lat: 4.95, lon: 6.02,},
            { id: 50, lat: 4.95, lon: 6.09,  }, {lat: 4.95, lon: 6.5, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 50,label: 'classroomLogo' },
            { id: 51, lat: 4.2, lon: 6.02,},
            { id: 52, lat: 4.2, lon: 6.09,  }, {lat: 4.25, lon: 6.5, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 52,label: 'classroomLogo' },
            { id: 53, lat: 3.6, lon: 6.02,},
            { id: 54, lat: 3.35, lon: 6.02,  }, { lat: 3, lon: 5.9, title: '',building:'Science', floor:'2nd Floor',node: 54,label: 'classroomLogo' },
            { id: 55, lat: 3.6, lon: 6.4,},
            { id: 56, lat: 3.13, lon: 6.4,  },
            { id: 57, lat: 3.73, lon: 6.4,},
            { id: 58, lat: 3.73, lon: 7.2,},
            { id: 59, lat: 3.42, lon: 7.2,  },
            { id: 60, lat: 3.6, lon: 5.65, },
            { id: 61, lat: 3.84, lon: 5.65,  }, { lat: 4.4, lon: 5.53, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 61,label: 'classroomLogo' },
            { id: 62, lat: 3.35, lon:  5.35,  },
            { id: 63, lat: 3.6, lon: 5.15,},
            { id: 17, lat: 3.6, lon: 5.15,},
            { id: 64, lat: 3.84, lon: 5.15,  }, { lat: 4.4, lon: 5., title: 'classRoom',building:'Science', floor:'2nd Floor',node: 64,label: 'classroomLogo' },
            { id: 66, lat: 3.35, lon: 4.75,  },
            { id: 82, lat: 3.6, lon: 5.35,},
            { id: 68, lat: 3.84, lon: 4.6,  }, { lat: 4.4, lon: 4.45, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 68,label: 'classroomLogo' },
            { id: 67, lat: 3.6, lon: 4.6,}, 
            { id: 65, lat: 3.6, lon: 4.75,},
            { id: 71, lat: 3.35, lon: 4,  },
            { id: 69, lat: 3.6, lon: 4,},
            { id: 70, lat: 3.84, lon: 4,  }, { lat: 4.4, lon: 3.92, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 70,label: 'classroomLogo' },
            { id: 73, lat: 3.27, lon: 3.43,  },
            { id: 75, lat: 3.27, lon: 3.145,  },
            { id: 74, lat: 3.6, lon: 3.145,},
            { id: 72, lat: 3.6, lon: 3.43,},
            { id: 76, lat: 3.6, lon: 2.88,},
            { id: 77, lat: 3.15, lon: 2.6, label: 'leaveButton', destination: 'BRS2ndFloor' },
            { id: 78, lat: 4.2, lon: 2.88,},
            { id: 79, lat: 4.2, lon: 2.94,  }, { lat: 4.3, lon: 3.3, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 79,label: 'classroomLogo' },
            { id: 80, lat: 4.95, lon: 2.88,},
            { id: 81, lat: 4.95, lon: 2.94,  }, { lat: 5, lon: 3.3, title: 'classRoom',building:'Science', floor:'2nd Floor',node: 81,label: 'classroomLogo' },
        ];
    } 
    else if (buildingName == "BRS1stFloor") {
        nodes = [
            { id: 130, lat: 8.3, lon:9.65, label: 'leaveButton',destination: 'BRS2ndFloor' },
            { id: 131, lat: 5, lon: 9.65 ,},
            { id: 132, lat: 5, lon: 8.1,},
            { id: 133, lat: 5.38, lon: 8.1 }, { lat: 6.8, lon: 7.9, title: 'classRoom',building:'BRS', floor:'1st Floor',node: 133,label: 'classroomLogo' },
            { id: 134, lat: 5, lon: 7.1,},
            { id: 135, lat: 4.66, lon: 7.1,}, { lat: 3.4, lon: 7, title: 'classRoom',building:'BRS', floor:'1st Floor',node: 135,label: 'classroomLogo' },
            { id: 136, lat: 5, lon: 5.7,},
            { id: 137, lat: 5.38, lon: 5.7 }, { lat: 6.8, lon: 5.5, title: 'classRoom',building:'BRS', floor:'1st Floor',node: 137,label: 'classroomLogo' },
            { id: 138, lat: 5, lon: 4.3,},
            { id: 139, lat: 4.66, lon: 4.3}, { lat: 3.5, lon: 4.1, title: 'classRoom',building:'BRS', floor:'1st Floor',node: 139,label: 'classroomLogo' },
            { id: 140, lat: 5, lon: 4.17,},
            { id: 141, lat: 5.4, lon: 4.17},  { lat: 6.7, lon: 3.5, title: 'facility',building:'BRS', floor:'1st Floor',node: 141,label: 'classroomLogo' },
            { id: 142, lat: 5, lon: 3.1,},
            { id: 143, lat: 5.38, lon: 3.1, label: 'elevator',elevatorBuilding:'BRS' }, { lat: 5.8, lon: 2.9, title: '',building:'BRS', floor:'1st Floor',node: 143},
            { id: 144, lat: 5, lon: 1.5,},
            { id: 145, lat: 4.66, lon: 1.5}, { lat: 3.5, lon: 1.2, title: 'classRoom',building:'BRS', floor:'1st Floor',node: 145,label: 'classroomLogo' },
            { id: 146, lat: 5, lon: 0.7,},
            { id: 147, lat: 6.6, lon: 0.7,},
            { id: 148, lat: 6.6, lon: 1.9,},
            { id: 149, lat: 6.2, lon: 1.9, label: 'leaveButton',destination: 'BRS2ndFloor' },
        ];
    }
    else if (buildingName == "BRS2ndFloor") {
        nodes = [
            { id: 100, lat: 8.55, lon: 9.65, label: 'leaveButton',destination: 'science2ndFloor' },
            { id: 101, lat: 5.25, lon: 9.65 },
            { id: 102, lat: 5.25, lon: 8.1},
            { id: 103, lat: 5.6, lon: 8.1 }, { lat: 6.8, lon: 7.9, title: 'classRoom',building:'BRS', floor:'2nd Floor',node: 103,label: 'classroomLogo' },
            { id: 104, lat: 5.25, lon: 7.7},
            { id: 105, lat: 4.95, lon: 7.7}, { lat: 3.5, lon: 7.6, title: 'classRoom',building:'BRS', floor:'2nd Floor',node: 105,label: 'classroomLogo' },
            { id: 106, lat: 5.25, lon: 5.7},
            { id: 107, lat: 5.6, lon: 5.7 }, { lat: 6.8, lon: 5.5, title: 'classRoom',building:'BRS', floor:'2nd Floor',node: 107,label: 'classroomLogo' },
            { id: 108, lat: 5.25, lon: 4.7},
            { id: 109, lat: 4.95, lon: 4.7}, { lat: 3.5, lon: 4.5, title: 'classRoom',building:'BRS', floor:'2nd Floor',node: 109,label: 'classroomLogo' },
            { id: 110, lat: 5.25, lon: 4.17},
            { id: 111, lat: 5.8, lon: 4.17},  { lat: 6.9, lon: 3.6, title: 'facility',building:'BRS', floor:'2nd Floor',node: 111,label: 'classroomLogo' },
            { id: 112, lat: 5.25, lon: 3.1},
            { id: 113, lat: 5.6, lon: 3.1, label: 'elevator',elevatorBuilding:'BRS' }, { lat: 6.1, lon: 2.9, title: '',building:'BRS', floor:'2nd Floor',node: 113},
            { id: 114, lat: 5.25, lon: 1.9},
            { id: 115, lat: 5.6, lon: 1.9, label: 'leaveButton', destination: 'BRS1stFloor' },
            { id: 116, lat: 5.25, lon: 1.6},
            { id: 117, lat: 4.95, lon: 1.6}, { lat: 3.5, lon: 1.4, title: 'classRoom',building:'BRS', floor:'2nd Floor',node: 117,label: 'classroomLogo' },
            { id: 118, lat: 5.25, lon: 0.7},
            { id: 119, lat: 6.9, lon: 0.7},
            { id: 120, lat: 6.9, lon: 1.9},
            { id: 121, lat: 6.5, lon: 1.9, label: 'leaveButton',destination: 'BRS3rdFloor' },
        ];
    }
    
    else if (buildingName == "BRS3rdFloor") {
        nodes = [
            { id: 155, lat: 8.3, lon:9.65, label: 'leaveButton',destination: 'BRS2ndFloor' },
            { id: 156, lat: 5, lon: 9.65 },
            { id: 157, lat: 5, lon: 7.8,},
            { id: 158, lat: 4.66, lon: 7.8,},{ lat: 3.4, lon: 7.5, title: 'classRoom',building:'BRS', floor:'3rd Floor',node: 158,label: 'classroomLogo' },
            { id: 159, lat: 5, lon: 7}, 
            { id: 160, lat: 5.38, lon: 7}, { lat: 7, lon: 6.5, title: 'classRoom',building:'BRS', floor:'3rd Floor',node: 160,label: 'classroomLogo' },
            
            
            { id: 161, lat: 5, lon: 4.3},
            { id: 162, lat: 4.66, lon: 4.3,}, { lat: 3.5, lon: 4.1, title: 'classRoom',building:'BRS', floor:'3rd Floor',node: 162,label: 'classroomLogo' },
            { id: 163, lat: 5, lon: 4.17,},
            { id: 164, lat: 5.5, lon: 4.17,},  { lat: 6.7, lon: 3.5, title: 'facility',building:'BRS', floor:'3rd Floor',node: 164,label: 'classroomLogo' },
            { id: 165, lat: 5, lon: 3.1,},
            { id: 166, lat: 5.38, lon: 3.1, label: 'elevator',elevatorBuilding:'BRS' }, { lat: 5.8, lon: 2.9, title: '',building:'BRS', floor:'3rd Floor',node: 166},
            { id: 167, lat: 5, lon: 1.9,},
            { id: 168, lat: 5.38, lon: 1.9,label: 'leaveButton',destination: 'BRS2ndFloor'},
            { id: 169, lat: 5, lon: 1.5,},
            { id: 170, lat: 4.66, lon: 1.5,}, { lat: 3.5, lon: 1.2, title: 'classRoom',building:'BRS', floor:'3rd Floor',node: 170,label: 'classroomLogo' },
            { id: 171, lat: 5, lon: 0.7,},
            { id: 172, lat: 6.6, lon: 0.7,},
            { id: 173, lat: 6.6, lon: 1.9,},
            { id: 174, lat: 6.26, lon: 1.9, label: 'leaveButton',destination: 'BRS4thFloor' },
        ];
    }
    else if (buildingName == "BRS4thFloor") {
        nodes = [
            { id: 202, lat: 6.28, lon: 2.95,label: 'leaveButton',destination: 'BRS5thFloor'},
            { id: 201, lat: 6.6, lon: 2.95,},
            { id: 200, lat: 6.6, lon: 1.9,},
            { id: 199, lat: 5.22, lon: 1.9,}, 
            { id: 198, lat: 5.22, lon: 2.45,},
            { id: 203, lat: 4.9, lon: 2.45,},
            { id: 204, lat: 4.9, lon: 1.9,},
            { id: 205, lat: 4.9, lon: 0.85,},
            { id: 206, lat: 5.6, lon: 0.85,label: 'leaveButton'},
            { id: 207, lat: 4.9, lon: 0.1,},
            { id: 196, lat: 5.22, lon: 2.95,},
            { id: 197, lat: 5.55, lon: 2.95,label: 'leaveButton',destination: 'BRS3rdFloor'},
            { id: 194, lat: 5.22, lon: 4,},
            { id: 195, lat: 5.55, lon: 4,label: 'elevator',elevatorBuilding:'BRS'},{lat: 6, lon: 3.9, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 195},
            { id: 192, lat: 5.22, lon: 4.5,},
            { id: 193, lat: 4.93, lon: 4.5,}, {lat: 4, lon: 4.3, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 193,label: 'classroomLogo' },
            { id: 190, lat: 5.22, lon: 4.98,},
            { id: 191, lat: 5.7, lon: 4.98,}, {lat: 6.8, lon: 4.5, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 191},
            { id: 188, lat: 5.22, lon: 6.3,},
            { id: 189, lat: 5.55, lon: 6.3,}, {lat: 6.8, lon: 6, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 189,label: 'classroomLogo' },
            { id: 186, lat: 5.22, lon: 6.55,},
            { id: 187, lat: 4.93, lon: 6.55,}, {lat: 4, lon: 6.4, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 187,label: 'classroomLogo' },
            { id: 184, lat: 5.22, lon: 8.3,},
            { id: 185, lat: 5.55, lon: 8.3,},  {lat: 6.8, lon: 8, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 185,label: 'classroomLogo' },
            { id: 182, lat: 5.22, lon: 8.5,},
            { id: 183, lat: 4.93, lon: 8.5,}, {lat: 4, lon: 8.3, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 183,label: 'classroomLogo' },
            { id: 181, lat: 5.22, lon: 9.67,},
            { id: 180, lat: 8.05, lon: 9.67,},
            { id: 208, lat: 1.9, lon: 2.45,}, {lat: 2, lon: 2.45, title: 'classRoom',building:'BRS', floor:'4th Floor',node: 208 },
            
        ];
    }
    else if (buildingName == "BRS5thFloor") {
        nodes = [
            { id: 215, lat: 6.24, lon: 1.88,label: 'leaveButton',destination: 'BRS6thFloor'},
            { id: 216, lat: 6.65, lon: 1.88,},
            { id: 217, lat: 6.65, lon: 0.65,},
            { id: 218, lat: 4.95, lon: 0.65,},
            { id: 219, lat:  4.95, lon: 1.4,},
            { id: 220, lat:  4.66, lon: 1.4,},{lat:  3.3, lon: 3.4, title: 'classRoom',building:'BRS', floor:'5th Floor',node: 220 },
            { id: 221, lat:  4.95, lon: 1.88,},
            { id: 222, lat:  5.4, lon: 1.88,label: 'leaveButton',destination: 'BRS4thFloor'},
            { id: 223, lat:  4.95, lon: 3.1,},
            { id: 224, lat:  5.4, lon: 3.1,label: 'elevator',elevatorBuilding:'BRS'}, { lat:  5.8, lon: 2.9, title: 'classRoom',building:'BRS', floor:'5th Floor',node: 224},
            { id: 225, lat:  4.95, lon: 4.15,},
            { id: 226, lat:  5.6, lon: 4.15,}, { lat:  6.6, lon: 3.6, title: 'classRoom',building:'BRS', floor:'5th Floor',node: 226},
            { lat:  7.5, lon: 6.5, title: 'classRoom',building:'BRS', floor:'5th Floor',node: 227 },
        ];
    }
    else if (buildingName == "BRS6thFloor") {
        nodes = [
            { id: 230, lat: 6.24, lon: 1.88,label: 'leaveButton',destination: 'BRS7thFloor'},
            { id: 231, lat: 6.65, lon: 1.88,},
            { id: 232, lat: 6.65, lon: 0.65,},
            { id: 233, lat: 4.95, lon: 0.65,},
            { id: 234, lat:  4.95, lon: 1.2,},
            { id: 235, lat:  4.66, lon: 1.2},{lat:  3.3, lon: 1.1, title: 'classRoom',building:'BRS', floor:'6th Floor',node: 235 },
            { id: 236, lat:  4.95, lon: 1.88,},
            { id: 237, lat:  5.4, lon: 1.88,label: 'leaveButton',destination: 'BRS5thFloor'},
            { id: 238, lat:  4.95, lon: 3.1,},
            { id: 239, lat:  5.4, lon: 3.1,label: 'elevator',elevatorBuilding:'BRS'}, { lat:  5.8, lon: 2.9, title: 'classRoom',building:'BRS', floor:'6th Floor',node: 239},
            { id: 240, lat:  4.95, lon: 4.15,},
            { id: 241, lat:  5.6, lon: 4.15,}, { lat:  6.6, lon: 3.6, title: 'classRoom',building:'BRS', floor:'6th Floor',node: 241},
            { id: 242, lat:  4.66, lon: 4.15,},
            { id: 243, lat:  4.95, lon: 7,},
            { id: 244, lat:  4.66, lon: 7,},
            { id: 245, lat:  5.4, lon: 7,}, { lat:  7.5, lon: 6.8, title: 'classRoom',building:'BRS', floor:'6th Floor',node: 245},
            { id: 246, lat:  4.95, lon: 9.65,},
            { id: 247, lat:  5.4, lon: 9.65,},
            { lat:  3.3, lon: 5, title: 'classRoom',building:'BRS', floor:'6th Floor',node: 248},
        ];
    }
    else if (buildingName == "BRS7thFloor") {
        nodes = [
            { id: 255, lat: 6.24, lon: 1.88,label: 'leaveButton',destination: 'BRS8thFloor'},
            { id: 256, lat: 6.65, lon: 1.88,},
            { id: 257, lat: 6.65, lon: 0.65,},
            { id: 258, lat: 4.95, lon: 0.65,},
            { id: 259, lat:  4.95, lon: 1.2,},
            { id: 260, lat:  4.66, lon: 1.2,},{lat:  3.3, lon: 1.1, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 260},
            { id: 261, lat:  4.95, lon: 1.88,},
            { id: 262, lat:  5.4, lon: 1.88,label: 'leaveButton',destination: 'BRS6thFloor'},
            { id: 263, lat:  4.95, lon: 3.1,},
            { id: 264, lat:  5.4, lon: 3.1,label: 'elevator',elevatorBuilding:'BRS'}, { lat:  5.8, lon: 2.9, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 264},
            { id: 265, lat:  4.95, lon: 3.5,},
            { id: 266, lat:  4.66, lon: 3.5,}, {lat:  3.3, lon: 3.3, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 266},
            { id: 267, lat:  4.95, lon: 4.15,},
            { id: 268, lat:  5.6, lon: 4.15,}, { lat:  6.6, lon: 3.6, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 268},       
            { id: 269, lat:  4.95, lon: 5.8,},
            { id: 270, lat:  5.4, lon: 5.8,}, { lat:  7.5, lon: 5.5, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 270},
            { id: 271, lat:  4.66, lon: 5.8,}, {lat:  3.3, lon: 5.5, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 271},
            { id: 272, lat:  4.95, lon: 8.1,},
            { id: 273, lat:   4.66, lon: 8.1,}, {lat:  3.3, lon: 7.8, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 273},
            { id: 274, lat:  4.95, lon: 8.6,},
            { id: 275, lat:  5.4, lon: 8.6,}, {lat:  7.5, lon: 7.9, title: 'classRoom',building:'BRS', floor:'7th Floor',node: 275}, 
            
        ];
    }
    else if (buildingName == "BRS8thFloor") {
        nodes = [
            { id: 280, lat: 6.24, lon: 1.88,label: 'leaveButton',destination: 'BRS9thFloor'},
            { id: 281, lat: 6.65, lon: 1.88,},
            { id: 282, lat: 6.65, lon: 0.65,},
            { id: 283, lat: 4.95, lon: 0.65,},
            { id: 284, lat:  4.95, lon: 1.2,},
            { id: 285, lat:  4.66, lon: 1.2,},{lat:  3.3, lon: 1.1, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 285},
            { id: 286, lat:  4.95, lon: 1.88,},
            { id: 287, lat:  5.4, lon: 1.88,label: 'leaveButton',destination: 'BRS7thFloor'},
            { id: 288, lat:  4.95, lon: 3.1,},
            { id: 289, lat:  5.4, lon: 3.1,label: 'elevator',elevatorBuilding:'BRS'}, { lat:  5.8, lon: 2.9, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 289},
            { id: 290, lat:  4.95, lon: 3.5,},
            { id: 291, lat:  4.66, lon: 3.5,}, {lat:  3.3, lon: 3.3, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 291},
            { id: 292, lat:  4.95, lon: 4.15,},
            { id: 293, lat:  5.6, lon: 4.15,}, { lat:  6.6, lon: 3.6, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 293},       
            { id: 294, lat:  4.95, lon: 5.8,},
            { id: 295, lat:  5.4, lon: 5.8,}, { lat:  7.5, lon: 5.5, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 295},
            { id: 296, lat:  4.66, lon: 5.8,}, {lat:  3.3, lon: 5.5, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 296},
            { id: 297, lat:  4.95, lon: 8.1,},
            { id: 298, lat:   4.66, lon: 8.1,}, {lat:  3.3, lon: 7.8, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 298},
            { id: 299, lat:  4.95, lon: 8.6,},
            { id: 300, lat:  5.4, lon: 8.6,}, {lat:  7.5, lon: 7.9, title: 'classRoom',building:'BRS', floor:'8th Floor',node: 300}, 
            
        ];
    }else if (buildingName == "BRS9thFloor") {
        nodes = [
            { id: 305, lat: 6.24, lon: 1.88,label: 'leaveButton',destination: 'BRS10thFloor'},
            { id: 306, lat: 6.65, lon: 1.88,},
            { id: 307, lat: 6.65, lon: 0.65,},
            { id: 308, lat: 4.95, lon: 0.65,},
            { id: 309, lat:  4.95, lon: 1.2,},
            { id: 310, lat:  4.43, lon: 1.2,},{lat:  3.3, lon: 1.1, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 310},
            { id: 311, lat:  4.95, lon: 1.88,},
            { id: 312, lat:  5.6, lon: 1.88,label: 'leaveButton',destination: 'BRS8thFloor'},
            { id: 313, lat:  4.95, lon: 3.1,},
            { id: 314, lat:  5.6, lon: 3.1,label: 'elevator',elevatorBuilding:'BRS'}, { lat:  6, lon: 2.9, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 314},
            { id: 315, lat:  4.95, lon: 3.5,},
            { id: 316, lat:  4.43, lon: 3.5,}, {lat:  3.3, lon: 3.3, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 316},
            { id: 317, lat:  4.95, lon: 4.15,},
            { id: 318, lat:  5.7, lon: 4.15,}, { lat:  6.8, lon: 3.6, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 318},       
            { id: 319, lat:  4.95, lon: 5.3,},
            { id: 320, lat:  5.6, lon: 5.3,}, { lat:  7.5, lon: 5, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 320},
            { id: 321, lat: 4.95, lon: 5.8,},
            { id: 322, lat:  4.43, lon: 5.8,}, {lat:  3.3, lon: 5.5, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 322},
            { id: 323, lat:  4.95, lon: 7.2,},
            { id: 324, lat:  5.6, lon: 7.2,}, { lat:  7.5, lon: 7, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 324},
            { id: 325, lat:  4.95, lon: 8.1,},
            { id: 326, lat:   4.43, lon: 8.1,}, {lat:  3.3, lon: 7.8, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 326},
            { id: 327, lat:  4.95, lon: 9.15,},
            { id: 328, lat:  5.6, lon: 9.15,}, {lat:  7.5, lon: 8.8, title: 'classRoom',building:'BRS', floor:'9th Floor',node: 328}, 
            
        ];
    }

    return nodes;
}

export default buildingNodes;