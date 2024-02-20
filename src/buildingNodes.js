
function buildingNodes(buildingName) {
    let nodes = [];
    if (buildingName == "science2ndFloor") {
        
        
        nodes = [
            { id: 0, lat: 6.53, lon: 0.55, label: 'classroom' }, 
            { id: 1, lat: 6.15, lon: 0.55, label: 'classroom' },
            { id: 2, lat: 6.8, lon: 1.08, label: 'classroom', roomID: 'S213' }, {lat: 7.4, lon: 0.9, title: '',building:'Science', floor:'2nd Floor',node: 2 }, 
            { id: 3, lat: 6.53, lon: 1.08,},
            { id: 6, lat: 6.53, lon: 1.9,},
            { id: 5, lat: 6.3, lon: 1.9, label: 'classroom' },
            { id: 4, lat: 6.8, lon: 1.9, label: 'classroom' },
            { id: 7, lat: 6.53, lon: 2.35,},
            { id: 8, lat: 6.53, lon: 2.48,},
            { id: 9, lat: 6.3, lon: 2.48, label: 'classroom' },
            { id: 10, lat: 6.53, lon: 2.63,},
            { id: 14, lat: 7.15, lon: 2.63, label: 'classroom' },
            { id: 11, lat: 7.65, lon: 2.35, label: 'classroom' },
            { id: 12, lat: 7.65, lon: 2.63,},
            { id: 13, lat: 7.49, lon: 2.63, label: 'classroom' },
            { id: 15, lat: 6.8, lon: 2.88, label: 'classroom' },
            { id: 16, lat: 6.53, lon: 2.88,},
            { id: 19, lat: 6.53, lon: 3.4,},
            { id: 18, lat: 6.8, lon: 3.4, label: 'classroom' },
            { id: 20, lat: 6.3, lon: 3.4, label: 'classroom' },
            { id: 22, lat: 6.53, lon: 4.2,},
            { id: 23, lat: 6.3, lon: 4.2, label: 'classroom' },
            { id: 21, lat: 6.8, lon: 4.2, label: 'classroom' },
            { id: 24, lat: 6.53, lon: 4.73,},
            { id: 25, lat: 7.82, lon: 4.73,},
            { id: 26, lat: 7.82, lon: 4.825, label: 'classroom' },
            { id: 27, lat: 7.82, lon: 4.6, label: 'classroom' },
            { id: 28, lat: 6.53, lon: 5.4,},
            { id: 29, lat: 6.8, lon: 5.4, label: 'classroom' },
            { id: 30, lat: 6.3, lon: 5.4, label: 'classroom' },
            { id: 31, lat: 6.53, lon: 6.02,},
            { id: 33, lat: 6.53, lon: 6.4,},
            { id: 34, lat: 6.53, lon: 6.57,},
            { id: 32, lat: 6.8, lon: 6.4, label: 'classroom' },
            { id: 35, lat: 6.3, lon: 6.57, label: 'classroom' },
            { id: 37, lat: 6.53, lon: 6.9,},
            { id: 36, lat: 6.8, lon: 6.9, label: 'classroom' },
            { id: 38, lat: 6.53, lon: 7.22,},
            { id: 39, lat: 6.53, lon: 7.5,},
            { id: 48, lat: 5.1, lon: 7.22, label: 'classroom' },
            { id: 47, lat: 5.6, lon: 7.31, label: 'classroom' },
            { id: 46, lat: 6.05, lon: 7.4, label: 'classroom' },
            { id: 40, lat: 6.8, lon: 7.5, label: 'classroom' },
            { id: 41, lat: 6.53, lon: 7.75,},
            { id: 42, lat: 6.67, lon: 7.75, label: 'classroom' },
            { id: 45, lat: 6.4, lon: 7.795, label: 'classroom' },
            { id: 43, lat: 6.67, lon: 8.04, label: 'classroom' },
            { id: 44, lat: 6.8, lon: 8.04, label: 'classroom' },
            { id: 49, lat: 4.95, lon: 6.02,},
            { id: 50, lat: 4.95, lon: 6.09, label: 'classroom' },
            { id: 51, lat: 4.2, lon: 6.02,},
            { id: 52, lat: 4.2, lon: 6.09, label: 'classroom' },
            { id: 53, lat: 3.6, lon: 6.02,},
            { id: 54, lat: 3.35, lon: 6.02, label: 'classroom' },
            { id: 55, lat: 3.6, lon: 6.4,},
            { id: 56, lat: 3.13, lon: 6.4, label: 'classroom' },
            { id: 57, lat: 3.73, lon: 6.4,},
            { id: 58, lat: 3.73, lon: 7.2,},
            { id: 59, lat: 3.42, lon: 7.2, label: 'classroom' },
            { id: 60, lat: 3.6, lon: 5.65, label: 'classroom' },
            { id: 61, lat: 3.84, lon: 5.65, label: 'classroom' },
            { id: 62, lat: 3.35, lon:  5.35, label: 'classroom' },
            { id: 63, lat: 3.6, lon: 5.65,},
            { id: 17, lat: 3.6, lon: 5.15,},
            { id: 64, lat: 3.84, lon: 5.15, label: 'classroom' },
            { id: 66, lat: 3.35, lon: 4.75, label: 'classroom' },
            { id: 82, lat: 3.6, lon: 5.35,},
            { id: 68, lat: 3.84, lon: 4.6, label: 'classroom' },
            { id: 67, lat: 3.6, lon: 4.6,},
            { id: 65, lat: 3.6, lon: 4.75,},
            { id: 71, lat: 3.35, lon: 4, label: 'classroom' },
            { id: 69, lat: 3.6, lon: 4,},
            { id: 70, lat: 3.84, lon: 4, label: 'classroom' },
            { id: 73, lat: 3.27, lon: 3.43, label: 'classroom' },
            { id: 75, lat: 3.27, lon: 3.145, label: 'classroom' },
            { id: 74, lat: 3.6, lon: 3.145,},
            { id: 72, lat: 3.6, lon: 3.43,},
            { id: 76, lat: 3.6, lon: 2.88,},
            { id: 77, lat: 3.15, lon: 2.6, label: 'leaveButton', destination: 'BRS2ndFloor' },
            { id: 78, lat: 4.2, lon: 2.88,},
            { id: 79, lat: 4.2, lon: 2.94, label: 'classroom' },
            { id: 80, lat: 4.95, lon: 2.88,},
            { id: 81, lat: 4.95, lon: 2.94, label: 'classroom' },
        ];
    } else if (buildingName == "BRS2ndFloor") {
        nodes = [
            { id: 100, lat: 8.55, lon: 9.65, label: 'leaveButton',destination: 'science2ndFloor' },
            { id: 101, lat: 5.25, lon: 9.65 },
            { id: 102, lat: 5.25, lon: 8.1},
            { id: 103, lat: 5.6, lon: 8.1, label: 'classroom' },
            { id: 104, lat: 5.25, lon: 7.7},
            { id: 105, lat: 4.95, lon: 7.7, label: 'classroom' },
            { id: 106, lat: 5.25, lon: 5.7},
            { id: 107, lat: 5.6, lon: 5.7, label: 'classroom' },
            { id: 108, lat: 5.25, lon: 4.7},
            { id: 109, lat: 4.95, lon: 4.7, label: 'classroom' },
            { id: 110, lat: 5.25, lon: 4.17},
            { id: 111, lat: 5.8, lon: 4.17, label: 'classroom' },
            { id: 112, lat: 5.25, lon: 3.1},
            { id: 113, lat: 5.6, lon: 3.1, label: 'classroom' },
            { id: 114, lat: 5.25, lon: 1.9},
            { id: 115, lat: 5.6, lon: 1.9, label: 'classroom' },
            { id: 116, lat: 5.25, lon: 1.6},
            { id: 117, lat: 4.95, lon: 1.6, label: 'classroom' },
            { id: 118, lat: 5.25, lon: 0.7},
            { id: 119, lat: 6.9, lon: 0.7},
            { id: 120, lat: 6.9, lon: 1.9},
            { id: 121, lat: 6.5, lon: 1.9, label: 'classroom' },
        ];
    }

    return nodes;
}

export default buildingNodes;