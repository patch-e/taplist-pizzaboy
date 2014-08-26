/*
utils.js

Copyright (c) 2014

Patrick Crager

*/

module.exports = {
  // type safe trim function
  trim: function(s) {
    // only invoke trim() if a string was passed in
    if (typeof s === "string") { 
      s = s.trim(); 
    }
    return s;
  }
};