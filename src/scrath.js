const findNodeById = (nodeId) => test.find((node) => node.id === nodeId);
const test = [{ id: 1, desti: 2},{ id: 2, desti: 3, }]
let a  = test[0].desti;

let kat = findNodeById(a);


console.log(kat.desti);

