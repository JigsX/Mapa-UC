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

g.addEdge(0, 1, 1);
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
g.addEdge(62, 82, 1);
g.addEdge(17, 82, 1);
g.addEdge(63, 17, 1);
g.addEdge(17, 65, 1);
g.addEdge(66, 65, 1);
g.addEdge(67, 65, 1);
g.addEdge(67, 68, 1);
g.addEdge(67, 69, 1);
g.addEdge(70, 69, 1);
g.addEdge(71, 69, 1);
g.addEdge(72, 69, 1);
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

for(let i = 0; i<=100; i++){
    g.setNodeBuilding(i,"science2ndFloor");
}

for(let i =100; i<=130; i++){
    g.setNodeBuilding(i,"BRS2ndFloor");
}




