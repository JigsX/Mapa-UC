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
g.setNodeCategory(487,'Gymnasium');


//science ground Floor
g.addEdge(393, 466, 1);
g.addEdge(420, 347, 1);
g.addEdge(420, 421, 1);
g.addEdge(422, 421, 1);
g.addEdge(422, 425, 1);
g.addEdge(424, 425, 1);
g.addEdge(426, 425, 1);
g.addEdge(426, 427, 1);
g.addEdge(426, 428, 1);
g.addEdge(429, 428, 1);
g.addEdge(430, 428, 1);
g.addEdge(430, 431, 1);
g.addEdge(430, 432, 1);
g.addEdge(430, 433, 1);
g.addEdge(434, 433, 1);
g.addEdge(435, 433, 1);
g.addEdge(436, 433, 1);
g.addEdge(436, 437, 1);
g.addEdge(436, 438, 1);
g.addEdge(439, 438, 1);
g.addEdge(440, 438, 1);
g.addEdge(440, 441, 1);
g.addEdge(440, 442, 1);
g.addEdge(443, 442, 1);
g.addEdge(442, 444, 1);
g.addEdge(445, 444, 1);
g.addEdge(446, 444, 1);
g.addEdge(446, 447, 1);
g.addEdge(446, 448, 1);
g.addEdge(446, 449, 1);
g.addEdge(450, 449, 1);
g.addEdge(451, 449, 1);
g.addEdge(452, 449, 1);
g.addEdge(452, 453, 1);
g.addEdge(452, 454, 1);
g.addEdge(452, 455, 1);
g.addEdge(456, 455, 1);
g.addEdge(456, 457, 1);
g.addEdge(458, 457, 1);
g.addEdge(459, 457, 1);
g.addEdge(459, 460, 1);
g.addEdge(459, 461, 1);
g.addEdge(462, 461, 1);
g.addEdge(463, 461, 1);
g.addEdge(463, 464, 1);
g.addEdge(465, 464, 1);
g.addEdge(466, 464, 1);


//science 1st Floor
g.addEdge(340, 14, 1);
g.addEdge(340, 341, 1);
g.addEdge(342, 341, 1);
g.addEdge(342, 343, 1);
g.addEdge(344, 343, 1);
g.addEdge(344, 345, 1);
g.addEdge(344, 346, 1);
g.addEdge(347, 346, 1);
g.addEdge(348, 346, 1);
g.addEdge(348, 349, 1);
g.addEdge(348, 350, 1);
g.addEdge(351, 350, 1);
g.addEdge(352, 350, 1);
g.addEdge(353, 350, 1);
g.addEdge(353, 354, 1);
g.addEdge(353, 355, 1);
g.addEdge(356, 355, 1);
g.addEdge(357, 355, 1);
g.addEdge(357, 358, 1);
g.addEdge(357, 359, 1);
g.addEdge(360, 359, 1);
g.addEdge(361, 359, 1);
g.addEdge(361, 362, 1);
g.addEdge(363, 362, 1);
g.addEdge(364, 362, 1);
g.addEdge(364, 365, 1);
g.addEdge(364, 366, 1);
g.addEdge(367, 366, 1);
g.addEdge(368, 366, 1);
g.addEdge(368, 369, 1);
g.addEdge(368, 370, 1);
g.addEdge(371, 370, 1);
g.addEdge(372, 370, 1);
g.addEdge(372, 373, 1);
g.addEdge(372, 374, 1);
g.addEdge(375, 374, 1);
g.addEdge(376, 374, 1);
g.addEdge(376, 377, 1);
g.addEdge(378, 377, 1);
g.addEdge(379, 377, 1);
g.addEdge(376, 405, 1);
g.addEdge(406, 405, 1);
g.addEdge(380, 405, 1);
g.addEdge(380, 407, 1);
g.addEdge(381, 407, 1);
g.addEdge(382, 407, 1);
g.addEdge(382, 383, 1);
g.addEdge(382, 384, 1);
g.addEdge(380, 385, 1);
g.addEdge(386, 385, 1);
g.addEdge(386, 387, 1);

g.addEdge(383, 402, 1);
g.addEdge(390, 402, 1);
g.addEdge(390, 391, 1);
g.addEdge(392, 391, 1);
g.addEdge(392, 393, 1);
g.addEdge(394, 361, 1);
g.addEdge(394, 395, 1);
g.addEdge(394, 396, 1);
g.addEdge(397, 396, 1);
g.addEdge(398, 396, 1);
g.addEdge(398, 399, 1);
g.addEdge(398, 400, 1);
g.addEdge(401, 400, 1);
g.addEdge(403, 400, 1); 
g.addEdge(403, 404, 1);
g.addEdge(130, 404, 1);


//science 2nd Floor
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
g.addEdge(95, 45, 1);
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
g.addEdge(75, 17, 1);
g.addEdge(99, 17, 1);
g.addEdge(99, 84, 1);
g.addEdge(76, 74, 0.5);
g.addEdge(77, 76, 1);
g.addEdge(78, 76, 1);
g.addEdge(78, 79, 1);
g.addEdge(78, 80, 1);
g.addEdge(81, 80, 1);
g.addEdge(16, 80, 1);

g.addEdge(59, 94, 1);
g.addEdge(59, 93, 1);
g.addEdge(401, 94, 1);

g.addEdge(98, 89, 1);
g.addEdge(387, 89, 1);
g.addEdge(98, 90, 1);
g.addEdge(98, 91, 1);
g.addEdge(92, 91, 1);
g.addEdge(83, 90, 1);
g.addEdge(83, 43, 1); 


//science 3rd Floor
g.addEdge(486, 13, 1);
g.addEdge(480, 481, 1);
g.addEdge(482, 481, 1);
g.addEdge(482, 483, 1);
g.addEdge(482, 484, 1);
g.addEdge(505, 484, 1);
g.addEdge(485, 484, 1);
g.addEdge(485, 486, 1);
g.addEdge(485, 487, 1);
g.addEdge(488, 487, 1);
g.addEdge(488, 489, 1);
g.addEdge(488, 490, 1);
g.addEdge(491, 490, 1);
g.addEdge(491, 492, 1);
g.addEdge(491, 493, 1);
g.addEdge(494, 493, 1);
g.addEdge(495, 493, 1);
g.addEdge(495, 496, 1);
g.addEdge(495, 497, 1);
g.addEdge(498, 497, 1);
g.addEdge(499, 497, 1);
g.addEdge(499, 500, 1);
g.addEdge(499, 501, 1);
g.addEdge(502, 501, 1);
g.addEdge(503, 501, 1);
g.addEdge(503, 504, 1);
g.addEdge(506, 484, 1);
g.addEdge(506, 507, 1);
g.addEdge(506, 508, 1);
g.addEdge(506, 509, 1);
g.addEdge(510, 509, 1);
g.addEdge(511, 509, 1);
g.addEdge(511, 512, 1);
g.addEdge(513, 512, 1);
g.addEdge(514, 512, 1);
g.addEdge(514, 515, 1);
g.addEdge(514, 516, 1);
g.addEdge(514, 517, 1);
g.addEdge(518, 517, 1);
g.addEdge(518, 519, 1);
g.addEdge(520, 519, 1);
g.addEdge(521, 519, 1);
g.addEdge(521, 522, 1);
g.addEdge(521, 523, 1);
g.addEdge(524, 523, 1);
g.addEdge(525, 523, 1);
g.addEdge(525, 526, 1);
g.addEdge(524, 527, 1);
g.addEdge(528, 527, 1);
g.addEdge(528, 529, 1);
g.addEdge(528, 485, 1);
g.addEdge(530, 529, 1);
g.addEdge(531, 529, 1);
g.addEdge(532, 527, 1);
g.addEdge(533, 527, 1);
g.addEdge(533, 534, 1);
g.addEdge(534, 535, 1);
g.addEdge(533, 536, 1);
g.addEdge(537, 536, 1);
g.addEdge(537, 538, 1);
g.addEdge(539, 538, 1);
g.addEdge(540, 536, 1);
g.addEdge(540, 541, 1);
g.addEdge(540, 542, 1);
g.addEdge(543, 542, 1);
g.addEdge(544, 542, 1);
g.addEdge(544, 545, 1);
g.addEdge(544, 546, 1);
g.addEdge(547, 546, 1);
g.addEdge(548, 546, 1);
g.addEdge(548, 549, 1);
g.addEdge(548, 550, 1);
g.addEdge(551, 550, 1);
g.addEdge(552, 550, 1);
g.addEdge(552, 553, 1);
g.addEdge(552, 554, 1);
g.addEdge(555, 554, 1);
g.addEdge(556, 554, 1);
g.addEdge(556, 557, 1);
g.addEdge(556, 558, 1);
g.addEdge(559, 558, 1);
g.addEdge(560, 558, 1);
g.addEdge(560, 561, 1);
g.addEdge(562, 561, 1);
g.addEdge(562, 563, 1);
g.addEdge(560, 564, 1);
g.addEdge(565, 564, 1);
g.addEdge(567, 564, 1);
g.addEdge(567, 568, 1);
g.addEdge(567, 569, 1);
g.addEdge(570, 569, 1);
g.addEdge(570, 571, 1);
g.addEdge(570, 572, 1);
g.addEdge(572, 574, 1);
g.addEdge(575, 574, 1);
g.addEdge(575, 576, 1);
g.addEdge(572, 577, 1);
g.addEdge(573, 577, 1);
g.addEdge(578, 577, 1);
g.addEdge(579, 577, 1);
g.addEdge(579, 580, 1);
g.addEdge(581, 580, 1);
g.addEdge(582, 580, 1);
g.addEdge(579, 583, 1);
g.addEdge(584, 583, 1);
g.addEdge(585, 583, 1);
g.addEdge(585, 586, 1);
g.addEdge(578, 95, 1);
g.addEdge(541, 84, 1);
g.addEdge(565, 93, 1);
g.addEdge(532, 155, 1);


//Science 4th Floor
g.addEdge(615, 480, 1);

g.addEdge(610, 611, 1);
g.addEdge(612, 611, 1);
g.addEdge(612, 682, 1);
g.addEdge(612, 613, 1);
g.addEdge(614, 613, 1);
g.addEdge(614, 615, 1);
g.addEdge(614, 620, 1);
g.addEdge(616, 613, 1);
g.addEdge(616, 617, 1);
g.addEdge(616, 618, 1);
g.addEdge(619, 618, 1);
g.addEdge(621, 620, 1);
g.addEdge(621, 622, 1);
g.addEdge(621, 623, 1);
g.addEdge(624, 623, 1);
g.addEdge(625, 623, 1);
g.addEdge(625, 626, 1);
g.addEdge(625, 627, 1);
g.addEdge(628, 627, 1);
g.addEdge(629, 627, 1);
g.addEdge(629, 737, 1);
g.addEdge(629, 631, 1);
g.addEdge(632, 631, 1);
g.addEdge(633, 620, 1);
g.addEdge(633, 634, 1);
g.addEdge(633, 635, 1);
g.addEdge(636, 635, 1);
g.addEdge(636, 637, 1);
g.addEdge(638, 637, 1);
g.addEdge(639, 635, 1);
g.addEdge(639, 640, 1);
g.addEdge(639, 641, 1);
g.addEdge(642, 641, 1);
g.addEdge(643, 641, 1);
g.addEdge(643, 644, 1);
g.addEdge(643, 645, 1);
g.addEdge(646, 645, 1);
g.addEdge(647, 645, 1);
g.addEdge(647, 648, 1);
g.addEdge(647, 649, 1);
g.addEdge(650, 649, 1);
g.addEdge(650, 651, 1);
g.addEdge(652, 651, 1);
g.addEdge(653, 649, 1);
g.addEdge(653, 654, 1);
g.addEdge(655, 656, 1);
g.addEdge(657, 656, 1);
g.addEdge(658, 656, 1);
g.addEdge(658, 659, 1);
g.addEdge(663, 659, 1);
g.addEdge(663, 664, 1);
g.addEdge(663, 665, 1);
g.addEdge(658, 660, 1);
g.addEdge(661, 660, 1);
g.addEdge(661, 662, 1);
g.addEdge(656, 666, 1);
g.addEdge(667, 666, 1);
g.addEdge(668, 666, 1);
g.addEdge(668, 669, 1);
g.addEdge(668, 670, 1);
g.addEdge(671, 670, 1);
g.addEdge(655, 576, 1);
g.addEdge(654, 563, 1);
g.addEdge(640, 539, 1);
g.addEdge(634, 180, 1);
g.addEdge(624, 206, 1);

//science 5th Floor 
g.addEdge(638, 906, 1);
g.addEdge(929, 654, 1);
g.addEdge(662, 890, 1);
g.addEdge(891, 890, 1);
g.addEdge(891, 892, 1);
g.addEdge(893, 892, 1);
g.addEdge(894, 892, 1);
g.addEdge(894, 895, 1);
g.addEdge(894, 896, 1);
g.addEdge(897, 896, 1);
g.addEdge(891, 898, 1);
g.addEdge(899, 898, 1);
g.addEdge(900, 898, 1);
g.addEdge(903, 904, 1);
g.addEdge(905, 904, 1);
g.addEdge(905, 906, 1);
g.addEdge(905, 907, 1);
g.addEdge(907, 908, 1);
g.addEdge(905, 910, 1);
g.addEdge(911, 910, 1);
g.addEdge(912, 910, 1);
g.addEdge(912, 913, 1);
g.addEdge(912, 914, 1);
g.addEdge(915, 914, 1);
g.addEdge(915, 916, 1);
g.addEdge(917, 916, 1);
g.addEdge(918, 916, 1);
g.addEdge(918, 919, 1);
g.addEdge(918, 920, 1);
g.addEdge(921, 920, 1);
g.addEdge(922, 920, 1);
g.addEdge(922, 923, 1);
g.addEdge(922, 924, 1);
g.addEdge(925, 924, 1);
g.addEdge(925, 926, 1);
g.addEdge(927, 926, 1);
g.addEdge(928, 924, 1);
g.addEdge(928, 929, 1);

//Science 6th Floor
g.addEdge(950, 900, 1);
g.addEdge(950, 951, 1);
g.addEdge(952, 951, 1);
g.addEdge(952, 953, 1);
g.addEdge(952, 954, 1);
g.addEdge(955, 954, 1);
g.addEdge(956, 955, 1);
g.addEdge(957, 955, 1);
g.addEdge(957, 958, 1);
g.addEdge(959, 954, 1);
g.addEdge(959, 960, 1);
g.addEdge(959, 961, 1);
g.addEdge(962, 961, 1);
g.addEdge(963, 961, 1);
g.addEdge(965, 966, 1);
g.addEdge(967, 966, 1);
g.addEdge(964, 927, 1);
g.addEdge(965, 908, 1);

//Main 4th Floor
g.addEdge(700, 207, 1);
g.addEdge(700, 701, 1);
g.addEdge(702, 701, 1);
g.addEdge(703, 701, 1);
g.addEdge(703, 704, 1);
g.addEdge(705, 704, 1);
g.addEdge(706, 704, 1);
g.addEdge(703, 707, 1);
g.addEdge(708, 707, 1);
g.addEdge(708, 709, 1);
g.addEdge(710, 709, 1);
g.addEdge(707, 711, 1);
g.addEdge(712, 711, 1);
g.addEdge(713, 711, 1);
g.addEdge(713, 714, 1);
g.addEdge(713, 715, 1);
g.addEdge(716, 715, 1);
g.addEdge(719, 715, 1);
g.addEdge(719, 720, 1);
g.addEdge(719, 721, 1);
g.addEdge(722, 721, 1);
g.addEdge(723, 721, 1);
g.addEdge(723, 724, 1);
g.addEdge(723, 725, 1);
g.addEdge(723, 726, 1);
g.addEdge(727, 726, 1);
g.addEdge(727, 728, 1);
g.addEdge(727, 729, 1);
g.addEdge(730, 726, 1);
g.addEdge(730, 735, 1);
g.addEdge(731, 735, 1);
g.addEdge(736, 735, 1);
g.addEdge(736, 737, 1);
g.addEdge(730, 732, 1);
g.addEdge(733, 732, 1);
g.addEdge(733, 734, 1);

//Main 3rd Floor
g.addEdge(750, 712, 1);
g.addEdge(750, 751, 1);
g.addEdge(752, 751, 1);
g.addEdge(752, 753, 1);
g.addEdge(754, 753, 1);
g.addEdge(755, 753, 1);
g.addEdge(755, 756, 1);
g.addEdge(757, 753, 1);
g.addEdge(757, 758, 1);
g.addEdge(757, 759, 1);
g.addEdge(755, 759, 1);
g.addEdge(760, 759, 1);
g.addEdge(761, 759, 1);
g.addEdge(761, 762, 1);
g.addEdge(761, 763, 1);
g.addEdge(764, 763, 1);
g.addEdge(765, 763, 1);
g.addEdge(765, 766, 1);
g.addEdge(765, 767, 1);
g.addEdge(768, 767, 1);
g.addEdge(768, 769, 1);
g.addEdge(768, 770, 1);
g.addEdge(771, 770, 1);
g.addEdge(772, 770, 1);
g.addEdge(773, 767, 1);
g.addEdge(774, 767, 1);
g.addEdge(773, 775, 1);
g.addEdge(776, 775, 1);
g.addEdge(777, 775, 1);
g.addEdge(777, 778, 1);
g.addEdge(779, 778, 1);
g.addEdge(772, 513, 1);

//Main 2nd Floor
g.addEdge(827, 88, 1);
g.addEdge(756, 800, 1);
g.addEdge(801, 800, 1);
g.addEdge(801, 802, 1);
g.addEdge(803, 802, 1);
g.addEdge(803, 804, 1);
g.addEdge(803, 805, 1);
g.addEdge(806, 805, 1);
g.addEdge(807, 805, 1);
g.addEdge(807, 808, 1);
g.addEdge(807, 809, 1);
g.addEdge(810, 809, 1);
g.addEdge(811, 809, 1);
g.addEdge(811, 812, 1);
g.addEdge(811, 813, 1);
g.addEdge(814, 813, 1);
g.addEdge(815, 813, 1);
g.addEdge(815, 816, 1);
g.addEdge(815, 817, 1);
g.addEdge(818, 817, 1);
g.addEdge(819, 817, 1);
g.addEdge(819, 820, 1);
g.addEdge(821, 820, 1);
g.addEdge(822, 820, 1);
g.addEdge(819, 823, 1);
g.addEdge(824, 823, 1);
g.addEdge(825, 823, 1);
g.addEdge(826, 823, 1);
g.addEdge(826, 827, 1);
g.addEdge(826, 828, 1);
g.addEdge(829, 828, 1);
g.addEdge(829, 830, 1);
g.addEdge(831, 828, 1);
g.addEdge(831, 832, 1);
g.addEdge(833, 832, 1);
g.addEdge(805, 865, 1);
g.addEdge(866, 865, 1);
g.addEdge(834, 865, 1);
g.addEdge(834, 835, 1);
g.addEdge(834, 836, 1);
g.addEdge(834, 837, 1);
g.addEdge(838, 837, 1);
g.addEdge(839, 837, 1);
g.addEdge(839, 840, 1);
g.addEdge(839, 841, 1);
g.addEdge(864, 841, 1);
g.addEdge(842, 841, 1);
g.addEdge(842, 843, 1);
g.addEdge(842, 844, 1);
g.addEdge(845, 844, 1);
g.addEdge(845, 846, 1);
g.addEdge(847, 844, 1);
g.addEdge(847, 848, 1);
g.addEdge(847, 849, 1);
g.addEdge(850, 849, 1);
g.addEdge(851, 849, 1);
g.addEdge(851, 852, 1);
g.addEdge(853, 852, 1);
g.addEdge(853, 854, 1);
g.addEdge(856, 855, 1);
g.addEdge(857, 855, 1);
g.addEdge(857, 846, 1);
g.addEdge(858, 855, 1);
g.addEdge(858, 859, 1);
g.addEdge(858, 861, 1);
g.addEdge(862, 861, 1);


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
for(let i =340; i<=419; i++){
    g.setNodeBuilding(i,"science1stFloor");
}
for(let i =480; i<=600; i++){
    g.setNodeBuilding(i,"science3rdFloor");
}
for(let i =610; i<=690; i++){
    g.setNodeBuilding(i,"science4thFloor");
}
for(let i =700; i<=740; i++){
    g.setNodeBuilding(i,"main4thFloor");
}
for(let i =750; i<=790; i++){
    g.setNodeBuilding(i,"main3rdFloor");
}
for(let i =800; i<=880; i++){
    g.setNodeBuilding(i,"main2ndFloor");
}
for(let i =890; i<=940; i++){
    g.setNodeBuilding(i,"science5thFloor");
}
for(let i =950; i<=980; i++){
    g.setNodeBuilding(i,"science6thFloor");
}
for(let i =420; i<=480; i++){
    g.setNodeBuilding(i,"scienceGroundFloor");
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







