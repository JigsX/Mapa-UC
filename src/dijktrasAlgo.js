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

const V = 1000;
const g = new Graph(V);

g.addEdge(3, 2, 1);
g.addEdge(3, 72, 0.5);
g.addEdge(1, 72, 1);
g.addEdge(4, 72, 0.5);
g.addEdge(3, 4, 1);
g.addEdge(2, 4, 0.5);
g.addEdge(2, 1, 1);
g.addEdge(4, 1, 1);
g.addEdge(5, 4, 0.5);
g.addEdge(5, 1, 1);
g.addEdge(5, 6, 1);
g.addEdge(6, 7, 1);
g.addEdge(6, 8, 0.5);
g.addEdge(11, 8, 0.5);
g.addEdge(6, 9, 1);
g.addEdge(8, 7, 1);
g.addEdge(8, 9, 1);
g.addEdge(8, 10, 1);
g.addEdge(10, 7, 1);
g.addEdge(13, 10, 1);
g.addEdge(13, 15, 1);
g.addEdge(16, 15, 1);
g.addEdge(10, 12, 1);
g.addEdge(12, 0, 1);
g.addEdge(12, 17, 1);
g.addEdge(12, 11, 1);
g.addEdge(12, 69, 1);
g.addEdge(12, 9, 1);
g.addEdge(12, 18, 1);
g.addEdge(11, 20, 1);
g.addEdge(17, 18, 1);
g.addEdge(17, 19, 1);
g.addEdge(17, 20, 1);
g.addEdge(17, 21, 1);
g.addEdge(18, 19, 1);
g.addEdge(18, 20, 1);
g.addEdge(18, 21, 1);
g.addEdge(20, 23, 1);
g.addEdge(20, 21, 1);
g.addEdge(19, 20, 1);
g.addEdge(19, 22, 1);
g.addEdge(19, 23, 1);
g.addEdge(19, 24, 1);
g.addEdge(21, 22, 1);
g.addEdge(21, 23, 1);
g.addEdge(21, 24, 1);
g.addEdge(22, 23, 1);
g.addEdge(23, 24, 1);
g.addEdge(23, 29, 1);
g.addEdge(22, 25, 1);
g.addEdge(22, 29, 1);
g.addEdge(24, 29, 1);
g.addEdge(24, 25, 1);
g.addEdge(24, 31, 1);
g.addEdge(31, 29, 1);
g.addEdge(30, 29, 1);
g.addEdge(31, 30, 1);
g.addEdge(29, 32, 1);
g.addEdge(30, 32, 1);
g.addEdge(30, 33, 1);
g.addEdge(32, 45, 1);
g.addEdge(31, 45, 1);
g.addEdge(34, 45, 1);
g.addEdge(32, 33, 1);
g.addEdge(33, 34, 1);
g.addEdge(33, 70, 1);
g.addEdge(34, 70, 1);
g.addEdge(32, 36, 1);
g.addEdge(70, 36, 1);
g.addEdge(70, 71, 1);
g.addEdge(71, 36, 1);
g.addEdge(36, 42, 1);
g.addEdge(36, 41, 1);
g.addEdge(36, 38, 1);
g.addEdge(36, 39, 1);
g.addEdge(36, 40, 1);
g.addEdge(42, 71, 1);
g.addEdge(42, 43, 1);
g.addEdge(42, 44, 1);
g.addEdge(42, 41, 1);
g.addEdge(45, 46, 1);
g.addEdge(46, 47, 1);
g.addEdge(48, 47, 1);
g.addEdge(48, 49, 1);
g.addEdge(49, 50, 1);
g.addEdge(48, 51, 1);
g.addEdge(48, 53, 1);
g.addEdge(48, 52, 1);
g.addEdge(48, 55, 1);
g.addEdge(53, 56, 1);
g.addEdge(52, 56, 1);
g.addEdge(55, 56, 1);
g.addEdge(54, 55, 1);
g.addEdge(54, 58, 1);
g.addEdge(58, 57, 1);
g.addEdge(55, 57, 1);
g.addEdge(55, 59, 1);
g.addEdge(58, 60, 1);
g.addEdge(61, 60, 1);
g.addEdge(61, 57, 1);
g.addEdge(59, 60, 1);
g.addEdge(59, 58, 1);
g.addEdge(59, 57, 1);
g.addEdge(59, 61, 1);
g.addEdge(59, 62, 1);
g.addEdge(60, 62, 1);
g.addEdge(61, 62, 1);
g.addEdge(63, 61, 1);
g.addEdge(63, 62, 1);
g.addEdge(62, 64, 1);
g.addEdge(63, 64, 1);
g.addEdge(64, 65, 1);
g.addEdge(64, 66, 1);
g.addEdge(67, 66, 1);
g.addEdge(67, 68, 1);
g.addEdge(18, 68, 1);



g.setNodeCategory(13, "cr");
g.setNodeCategory(8, "cr");
g.setNodeCategory(0, "exit");
g.setNodeCategory(5, "exit");

g.setNodeCategory(14, "elevator");
g.setNodeCategory(15, "elevator");
g.setNodeCategory(16, "elevator");

g.setNodeBuilding(1,"science");
g.setNodeBuilding(2,"science");
g.setNodeBuilding(3,"science");
g.setNodeBuilding(4,"science");
g.setNodeBuilding(5,"science");


g.setNodeBuilding(6,"science2");
g.setNodeBuilding(7,"science2");
g.setNodeBuilding(8,"science2");
g.setNodeBuilding(9,"science2");
g.setNodeBuilding(10,"science2");
g.setNodeBuilding(11,"science2");
g.setNodeBuilding(12,"science2");
g.setNodeBuilding(13,"science2");
g.setNodeBuilding(14,"science2");
g.setNodeBuilding(15,"science2");

g.setNodeBuilding(11,"science2");


