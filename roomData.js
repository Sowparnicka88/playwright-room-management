const roomData = {
    validRoom: {
        roomNumber: '111',
        type: 'Single',
        accessible:true,
        roomPrice: '100',
        Roomdetails: ['WiFi', 'TV'],
        description: 'A cozy single room.'
    },
    validRoom2: {
        roomNumber: '000',
        type: 'Double',
        accessible:false,
        roomPrice: '250',
        Roomdetails: ['WiFi', 'TV', 'Safe', 'Refreshments'],
        description: 'I will be deleted'
    },
    invalidRoom: {
        roomNumber:'',
        type: 'Single',
        accessible:true,
        roomPrice: '100',
        Roomdetails: ['WiFi', 'TV'],
        description: 'A cozy single room.'
    }
};

module.exports = { roomData };