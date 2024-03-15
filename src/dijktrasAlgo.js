class Graph {
    constructor(V) {
        this.V = V;
        this.adj = new Array(V).fill().map(() => []);
        this.parent = new Array(V).fill(-1);
        this.nodeCategories = new Array(V).fill("default");
        this.nodeBuilding = new Array(V).fill("");
        this.arrayPath = [];
    }

    addEdge(node, connectedNode, weightConnection) {
        this.adj[node].push([connectedNode, weightConnection]);
        this.adj[connectedNode].push([node, weightConnection]);
    }

    setNodeCategory(node, category) {
        this.nodeCategories[node] = category;
    }

    setNodeBuilding(node, building) {
        this.nodeBuilding[node] = building;
    }

    findClosestCategory(src, targetCategory, useElevator, useEmerExit) {
        const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
        const setDistance = new Set();
        setDistance.add([0, src]);
        distances[src] = 0;

        while (setDistance.size > 0) {
            const tmp = [...setDistance].reduce((a, b) => (a[0] < b[0] ? a : b));
            setDistance.delete(tmp);
            const u = tmp[1];

            for (const [node, weight] of this.adj[u]) {
                if (!useElevator && this.nodeCategories[node] === "elevator") {
                    continue;
                }
                if (!useEmerExit && this.nodeCategories[V] === "emergencyExit") {
                continue;
                }

                if (distances[node] > distances[u] + weight) {
                    if (distances[node] !== Number.POSITIVE_INFINITY) {
                        setDistance.delete([distances[node], node]);
                    }
                    distances[node] = distances[u] + weight;
                    setDistance.add([distances[node], node]);
                    this.parent[node] = u;
                }
            }
        }

        let closestNode = -1;
        let minDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < this.V; i++) {
            if (distances[i] < minDist && this.nodeCategories[i] === targetCategory) {
                minDist = distances[i];
                closestNode = i;
            }
        }

        if (minDist !== Number.POSITIVE_INFINITY) {
            console.log(`Closest Node of Category ${targetCategory} from Room ${src} is Room ${closestNode} at a distance of ${minDist}.`);
            console.log("Path: ");
            this.printPath(closestNode);
            console.log("Array Path:", this.arrayPath);
        } else {
            console.log(`No node of Category ${targetCategory} found from Room ${src}`);
        }

        return [minDist, closestNode];
    }

    printPath(v) {
        this.arrayPath = []; // Reset arrayPath before storing the new path
        console.log(`Current Node: ${v}`);
        
        if (v === -1) {
            console.log("Terminating recursion");
            return;
        }
        
        this.printPath(this.parent[v]);
        console.log(`${v} -> `);
        this.arrayPath.push(Number(v));
    }

    shortestPath(src, targetNode, useElevator, useEmerExit) {
        const distances = new Array(this.V).fill(Number.POSITIVE_INFINITY);
        const setds = new Set();
        setds.add([0, src]);
        distances[src] = 0;
    
        while (setds.size > 0) {
          const tmp = [...setds].reduce((a, b) => (a[0] < b[0] ? a : b));
          setds.delete(tmp);
          const u = tmp[1];
    
          for (const [v, weight] of this.adj[u]) {
            if (!useEmerExit && this.nodeCategories[v] === "emergencyExit") {
              continue;
            }
            if (!useElevator && this.nodeCategories[v] === "elevator") {
              continue;
            }
            
    
            if (distances[v] > distances[u] + weight) {
              if (distances[v] !== Number.POSITIVE_INFINITY) {
                setds.delete([distances[v], v]);
              }
              distances[v] = distances[u] + weight;
              setds.add([distances[v], v]);
              this.parent[v] = u;
            }
          }
        }
    
        if (distances[targetNode] === Number.POSITIVE_INFINITY) {
          console.log(`No node found at Room ${targetNode} from Room ${src}`);
        } else {
          console.log(`Room ${targetNode} from Room ${src} is ${distances[targetNode]} units away.`);
          console.log("Path: ");
          this.printPath(targetNode);
        }
    }



    
}

function computeDestPath(choice, currentPosition, Destination, useElevator, useEmerExit) {
    console.log("Wlaa: ", currentPosition,Destination)
    g.parent = new Array(V).fill(-1);
    g.arrayPath = [];


    if(choice==='enterDestination'){
        g.shortestPath(currentPosition, Destination, useElevator, useEmerExit);
        
        return g.arrayPath
        
    }
    else if(choice === 'enterFindFacility'){
        g.findClosestCategory(currentPosition, Destination, useElevator, useEmerExit);
        return g.arrayPath
    }
    
}

function findFloorInfo(choice, currentPosition, Destination, useElevator, useEmerExit) {

    g.parent = new Array(V).fill(-1);
    g.arrayPath = [];


    if(choice==='enterDestination'){
        g.shortestPath(currentPosition, Destination, useElevator, useEmerExit);
        return g.nodeBuilding[g.arrayPath[0]]
        
        
    }
    else if(choice === 'enterFindFacility'){
        g.findClosestCategory(currentPosition, Destination, useElevator, useEmerExit);
        return g.nodeBuilding[g.arrayPath[0]]
        
    }
    
}

export {computeDestPath,findFloorInfo};

const V = 10000;
const g = new Graph(V);


g.setNodeCategory(46,'CR(MEN)');
g.setNodeCategory(241,'CR(MEN)');
g.setNodeCategory(111,'CR(MEN)');
g.setNodeCategory(191,'CR(MEN)');
g.setNodeCategory(56,'CR(WOMEN)');
g.setNodeCategory(141,'CR(WOMEN)');
g.setNodeCategory(164,'CR(WOMEN)');
g.setNodeCategory(226,'CR(WOMEN)');
g.setNodeCategory(47,'CR(WOMEN)');
g.setNodeCategory(1,'CEA: Faculty Office');
g.addEdge(0, 85, 1);
g.addEdge(0, 87, 1);
g.addEdge(88, 87, 1);
g.addEdge(1, 85, 1);
g.addEdge(86, 85, 1);
g.addEdge(0, 3, 1);
g.addEdge(3, 2, 1);
g.addEdge(3, 6, 1);
g.addEdge(4, 6, 1);
g.addEdge(5, 6, 1);
g.addEdge(7, 6, 1);
g.addEdge(7, 11, 1);
g.addEdge(12, 11, 1);
g.addEdge(12, 13, 1);
g.addEdge(7, 8, 1);
g.addEdge(9, 8, 1);
g.addEdge(10, 8, 1);
g.addEdge(10, 14, 1);
g.addEdge(10, 16, 1);
g.addEdge(15, 16, 1);
g.addEdge(19, 16, 1);
g.addEdge(19, 18, 1);
g.addEdge(19, 20, 1);
g.addEdge(19, 22, 1);
g.addEdge(21, 22, 1);
g.addEdge(23, 22, 1);
g.addEdge(24, 22, 1);
g.addEdge(24, 25, 1);
g.addEdge(26, 25, 1);
g.addEdge(27, 25, 1);
g.addEdge(24, 28, 1);
g.addEdge(29, 28, 1);
g.addEdge(30, 28, 1);
g.addEdge(31, 28, 1);
g.addEdge(31, 33, 1);
g.addEdge(32, 33, 1);
g.addEdge(34, 33, 1);
g.addEdge(34, 35, 1);
g.addEdge(34, 37, 1);
g.addEdge(36, 37, 1);
g.addEdge(38, 37, 1);
g.addEdge(38, 46, 1);
g.addEdge(38, 47, 1);
g.addEdge(38, 48, 1);
g.addEdge(38, 39, 1);
g.addEdge(40, 39, 1);
g.addEdge(41, 39, 1);
g.addEdge(41, 45, 1);
g.addEdge(41, 42, 1);
g.addEdge(43, 42, 1);
g.addEdge(44, 43, 1);
g.addEdge(31, 49, 1);
g.addEdge(50, 49, 1);
g.addEdge(51, 49, 1);
g.addEdge(51, 52, 1);
g.addEdge(51, 53, 1);
g.addEdge(54, 53, 1);
g.addEdge(55, 53, 1);
g.addEdge(55, 56, 1);
g.addEdge(55, 57, 1);
g.addEdge(58, 57, 1);
g.addEdge(58, 59, 1);
g.addEdge(60, 53, 1);
g.addEdge(60, 61, 1);
g.addEdge(60, 82, 1);
g.addEdge(63, 82, 1);
g.addEdge(62, 82, 1);
g.addEdge(63, 65, 0.5);
g.addEdge(66, 65, 1);
g.addEdge(64, 63, 1);
g.addEdge(67, 65, 0.5);
g.addEdge(67, 68, 1);
g.addEdge(67, 69, 0.5);
g.addEdge(70, 69, 1);
g.addEdge(71, 69, 1);
g.addEdge(72, 69, 0.5);
g.addEdge(72, 73, 1);
g.addEdge(72, 74, 0.5);
g.addEdge(75, 74, 1);
g.addEdge(76, 74, 0.5);
g.addEdge(77, 76, 1);
g.addEdge(78, 76, 1);
g.addEdge(78, 79, 1);
g.addEdge(78, 80, 1);
g.addEdge(81, 80, 1);
g.addEdge(16, 80, 2);

g.addEdge(43, 83, 1);
g.addEdge(90, 83, 1);
g.addEdge(90, 98, 1);
g.addEdge(91, 98, 1);
g.addEdge(89, 98, 1);
g.addEdge(91, 92, 1);
g.addEdge(59, 94, 1);
g.addEdge(59, 93, 1);

g.addEdge(45, 95, 1);
g.addEdge(46, 95, 1);
g.addEdge(46, 97, 1);
g.addEdge(75, 17, 1);
g.addEdge(17, 99, 1);
g.addEdge(84, 99, 1);

//BRS ELEVATOR
g.addEdge(143, 113, 1);
g.addEdge(166, 113, 1);
g.addEdge(166, 195, 1);
g.addEdge(224, 195, 1);
g.addEdge(224, 239, 1);
g.addEdge(264, 239, 1);
g.addEdge(289, 264, 1);
g.addEdge(289, 314, 1);

//BRS 1st Floor
g.setNodeCategory(143, "elevator");
g.addEdge(115, 149, 1);
g.addEdge(130, 131, 1);
g.addEdge(132, 131, 1);
g.addEdge(132, 133, 1);
g.addEdge(132, 134, 1);
g.addEdge(135, 134, 1);
g.addEdge(136, 134, 1);
g.addEdge(136, 137, 1);
g.addEdge(136, 138, 1);
g.addEdge(139, 138, 1);
g.addEdge(140, 138, 1);
g.addEdge(140, 141, 1);
g.addEdge(140, 142, 1);
g.addEdge(143, 142, 1);
g.addEdge(144, 142, 1);
g.addEdge(144, 145, 1);
g.addEdge(144, 146, 1);
g.addEdge(147, 146, 1);
g.addEdge(147, 148, 1);
g.addEdge(149, 148, 1);
g.addEdge(143, 113, 1);

//BRS 2nd Floor
g.setNodeCategory(113, "elevator");
g.addEdge(77, 100, 1);
g.addEdge(101, 100, 1);
g.addEdge(101, 102, 1);
g.addEdge(103, 102, 1);
g.addEdge(104, 102, 1);
g.addEdge(104, 105, 1);
g.addEdge(104, 106, 1);
g.addEdge(107, 106, 1);
g.addEdge(108, 106, 1);
g.addEdge(108, 109, 1);
g.addEdge(108, 110, 1);
g.addEdge(111, 110, 1);
g.addEdge(112, 110, 1);
g.addEdge(112, 113, 1);
g.addEdge(112, 114, 1);
g.addEdge(115, 114, 1);
g.addEdge(116, 114, 1);
g.addEdge(116, 117, 1);
g.addEdge(116, 118, 1);
g.addEdge(119, 118, 1);
g.addEdge(119, 120, 1);
g.addEdge(121, 120, 1);





//BRS 3rd Floor
g.setNodeCategory(166, "elevator");
g.addEdge(168, 121, 1);
g.addEdge(155, 156, 1);
g.addEdge(157, 156, 1);
g.addEdge(157, 158, 1);
g.addEdge(157, 159, 1);
g.addEdge(160, 159, 1);
g.addEdge(161, 159, 1);
g.addEdge(161, 162, 1);
g.addEdge(161, 163, 1);
g.addEdge(164, 163, 1);
g.addEdge(165, 163, 1);
g.addEdge(165, 166, 1);
g.addEdge(165, 167, 1);
g.addEdge(168, 167, 1);
g.addEdge(167, 169, 1);
g.addEdge(170, 169, 1);
g.addEdge(171, 169, 1);
g.addEdge(171, 172, 1);
g.addEdge(173, 172, 1);
g.addEdge(173, 174, 1);

//BRS 4th Floor
g.setNodeCategory(195, "elevator");
g.addEdge(197, 174, 1);
g.addEdge(202, 201, 1);
g.addEdge(200, 201, 1);
g.addEdge(200, 199, 1);
g.addEdge(200, 199, 1);
g.addEdge(198, 199, 1);
g.addEdge(198, 203, 1);
g.addEdge(204, 203, 1);
g.addEdge(208, 203, 1);
g.addEdge(204, 199, 1);
g.addEdge(204, 205, 1);
g.addEdge(206, 205, 1);
g.addEdge(207, 205, 1);
g.addEdge(198, 196, 1);
g.addEdge(197, 196, 1);
g.addEdge(194, 196, 1);
g.addEdge(194, 195, 1);
g.addEdge(194, 192, 1);
g.addEdge(193, 192, 1);
g.addEdge(190, 192, 1);
g.addEdge(190, 191, 1);
g.addEdge(190, 188, 1);
g.addEdge(189, 188, 1);
g.addEdge(186, 188, 1);
g.addEdge(186, 187, 1);
g.addEdge(186, 184, 1);
g.addEdge(185, 184, 1);
g.addEdge(182, 184, 1);
g.addEdge(182, 183, 1);
g.addEdge(182, 181, 1);
g.addEdge(181, 180, 1);


//BRS 5th Floor
g.setNodeCategory(224, "elevator");
g.addEdge(202, 222, 1);
g.addEdge(215, 216, 1);
g.addEdge(217, 216, 1);
g.addEdge(217, 218, 1);
g.addEdge(219, 218, 1);
g.addEdge(219, 220, 1);
g.addEdge(219, 221, 1);
g.addEdge(222, 221, 1);
g.addEdge(223, 221, 1);
g.addEdge(223, 224, 1);
g.addEdge(223, 225, 1);
g.addEdge(226, 225, 1);

//brs 6th Floor
g.setNodeCategory(239, "elevator");

g.addEdge(215, 237, 1);
g.addEdge(230, 231, 1);
g.addEdge(232, 231, 1);
g.addEdge(232, 233, 1);
g.addEdge(234, 233, 1);
g.addEdge(234, 235, 1);
g.addEdge(234, 236, 1);
g.addEdge(237, 236, 1);
g.addEdge(238, 236, 1);
g.addEdge(238, 239, 1);
g.addEdge(238, 240, 1);
g.addEdge(241, 240, 1);
g.addEdge(242, 240, 1);
g.addEdge(243, 240, 1);
g.addEdge(243, 244, 1);
g.addEdge(243, 245, 1);
g.addEdge(243, 246, 1);
g.addEdge(247, 246, 1);


//brs 7th Floor
g.setNodeCategory(264, "elevator");
g.addEdge(262, 230, 1);
g.addEdge(255, 256, 1);
g.addEdge(257, 256, 1);
g.addEdge(257, 258, 1);
g.addEdge(259, 258, 1);
g.addEdge(259, 260, 1);
g.addEdge(259, 261, 1);
g.addEdge(262, 261, 1);
g.addEdge(263, 261, 1);
g.addEdge(263, 264, 1);
g.addEdge(263, 265, 1);
g.addEdge(266, 265, 1);
g.addEdge(267, 265, 1);
g.addEdge(267, 268, 1);
g.addEdge(267, 269, 1);
g.addEdge(270, 269, 1);
g.addEdge(271, 269, 1);
g.addEdge(272, 269, 1);
g.addEdge(272, 273, 1);
g.addEdge(272, 274, 1);
g.addEdge(275, 274, 1);

//BRS 8th Floor
g.setNodeCategory(289, "elevator");
g.addEdge(287, 255, 1);
g.addEdge(280, 281, 1);
g.addEdge(282, 281, 1);
g.addEdge(282, 283, 1);
g.addEdge(284, 283, 1);
g.addEdge(284, 285, 1);
g.addEdge(284, 286, 1);
g.addEdge(287, 286, 1);
g.addEdge(288, 286, 1);
g.addEdge(288, 289, 1);
g.addEdge(288, 290, 1);
g.addEdge(290, 291, 1);
g.addEdge(290, 292, 1);
g.addEdge(293, 292, 1);
g.addEdge(294, 292, 1);
g.addEdge(294, 295, 1);
g.addEdge(294, 296, 1);
g.addEdge(294, 297, 1);
g.addEdge(298, 297, 1);
g.addEdge(299, 297, 1);
g.addEdge(299, 300, 1);


//BRS 9th Floor
g.setNodeCategory(314, "elevator");
g.addEdge(312, 280, 1);
g.addEdge(306, 305, 1);
g.addEdge(306, 307, 1);
g.addEdge(308, 307, 1);
g.addEdge(308, 309, 1);
g.addEdge(310, 309, 1);
g.addEdge(311, 309, 1);
g.addEdge(311, 312, 1);
g.addEdge(311, 313, 1);
g.addEdge(314, 313, 1);
g.addEdge(315, 313, 1);
g.addEdge(315, 316, 1);
g.addEdge(315, 317, 1);
g.addEdge(318, 317, 1);
g.addEdge(319, 317, 1);
g.addEdge(319, 320, 1);
g.addEdge(319, 321, 1);
g.addEdge(322, 321, 1);
g.addEdge(323, 321, 1);
g.addEdge(323, 324, 1);
g.addEdge(323, 325, 1);
g.addEdge(326, 325, 1);
g.addEdge(327, 325, 1);
g.addEdge(327, 328, 1);


for(let i = 0; i<=99; i++){
    g.setNodeBuilding(i,"science2ndFloor");
}
for(let i =340; i<=410; i++){
    g.setNodeBuilding(i,"science1stFloor");
}
for(let i =126; i<=150; i++){
    g.setNodeBuilding(i,"BRS1stFloor");
}
for(let i =100; i<=125; i++){
    g.setNodeBuilding(i,"BRS2ndFloor");
}
for(let i =155; i<=175; i++){
    g.setNodeBuilding(i,"BRS3rdFloor");
}
for(let i =175; i<=210; i++){
    g.setNodeBuilding(i,"BRS4thFloor");
}
for(let i =215; i<=229; i++){
    g.setNodeBuilding(i,"BRS5thFloor");
}
for(let i =230; i<=250; i++){
    g.setNodeBuilding(i,"BRS6thFloor");
}
for(let i =255; i<=279; i++){
    g.setNodeBuilding(i,"BRS7thFloor");
}
for(let i =280; i<=300; i++){
    g.setNodeBuilding(i,"BRS8thFloor");
}
for(let i =305; i<=330; i++){
    g.setNodeBuilding(i,"BRS9thFloor");
}







