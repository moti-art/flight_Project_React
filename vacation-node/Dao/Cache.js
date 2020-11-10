let tokenToUserDataMap = new Map();

function addItem(token, userLoginDetails) {
  tokenToUserDataMap.set(token, userLoginDetails);
}

function getItem(token) {
 tokenToUserDataMap.get(token);
}

module.exports = {
  addItem,
  getItem,
};
