let deleted =  require('./../images/cardImages/deleted.png');
let devices =  require('./../images/cardImages/devices.png');
let email =  require('./../images/cardImages/email.png');
let encryption =  require('./../images/cardImages/encryption.png');
let humanInterface =  require('./../images/cardImages/humanInterface.png');
let mouseAction =  require('./../images/cardImages/mouseAction.png');
let network =  require('./../images/cardImages/network.png');
let orga =  require('./../images/cardImages/orga.png');
let technical =  require('./../images/cardImages/technical.png');


const ci = {};

ci.getCardImage = (imageName) => {
    if(imageName === 'deleted') return deleted;
    else if (imageName === 'devices') return devices;
    else if (imageName === 'email') return email;
    else if (imageName === 'encryption') return encryption;
    else if (imageName === 'humanInterface') return humanInterface;
    else if (imageName === 'mouseAction') return mouseAction;
    else if (imageName === 'network') return network;
    else if (imageName === 'orga') return orga;
    else if (imageName === 'technical') return technical;
};

module.exports = ci;