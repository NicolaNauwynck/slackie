
module.exports = {

    addToSession: function(key, object) {
        return sessionStorage.setItem(key, JSON.stringify(object));
    },

    getFromSession: function(key) {
        return JSON.parse(sessionStorage.getItem(key)) || null;
    },

    removeFromSession: function(key) {
        sessionStorage.removeItem(key);
    },
};
