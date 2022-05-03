const lib = {};

/**
 * set username in localStorage
 * @param name
 */
lib.setNickname = (name) => {
    localStorage.setItem('username', name);
};

/**
 * get username from localStorage
 * @returns {string}
 */
lib.getNickname = () => {
    return localStorage.getItem('username');
};

module.exports = lib;