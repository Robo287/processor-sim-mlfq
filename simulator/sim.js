const P = require('./Process.js');

var p1bursts = [7, 22, 6, 19, 12, 44, 8, 21, 10, 37, 5, 24, 6, 44, 7, 43, 8];
var P1 = new P.Process("P1", p1bursts, 0, 1);

P.FCFS(P1);