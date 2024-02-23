if(node.title === 'classRoom'){
    nodeInfo(node.building,node.floor,'roomID',node.node)
    .then(roomID => {
        L.marker(coords, {
            icon: L.divIcon({
                
                html: `<strong> Room: </strong> ${roomID}`,
                className: 'text-below-marker',
                
            })
        }).addTo(map);
        
    })
    .catch(error => {
        console.error("Error:", error);
    }); 
}
else if(node.title === 'facility'){
    nodeInfo(node.building,node.floor,'roomID',node.node)
    .then(roomID => {
        L.marker(coords, {
            icon: L.divIcon({
                
                html: `<strong> Facility: </strong> ${roomID}`,
                className: 'text-below-marker',
                
            })
        }).addTo(map);
        
    })
    .catch(error => {
        console.error("Error:", error);
    }); 
}
else if(node.title === ''){
    nodeInfo(node.building,node.floor,'roomID',node.node)
    .then(roomID => {
        L.marker(coords, {
            icon: L.divIcon({
                
                html: `<strong> ${roomID} </strong> `,
                className: 'text-below-marker',
                
            })
        }).addTo(map);
        
    })
    .catch(error => {
        console.error("Error:", error);
    }); 
}
else if(node.title === 'office'){
    nodeInfo(node.building,node.floor,'roomID',node.node)
    .then(roomID => {
        L.marker(coords, {
            icon: L.divIcon({
                
                html: `<strong> Office: </strong> ${roomID}`,
                className: 'text-below-marker',
                
            })
        }).addTo(map);
        
    })
    .catch(error => {
        console.error("Error:", error);
    }); 
}
else if(node.title === 'lab'){
    nodeInfo(node.building,node.floor,'roomID',node.node)
    .then(roomID => {
        L.marker(coords, {
            icon: L.divIcon({
                
                html: `<strong> Laboratory: </strong> ${roomID}`,
                className: 'text-below-marker',
                
            })
        }).addTo(map);
        
    })
    .catch(error => {
        console.error("Error:", error);
    }); 
}