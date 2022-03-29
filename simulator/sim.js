// Anthony Robustelli
// Instructions: This simulation was developed with node.js and javascript
// Please open a command line prompt, cd directory to .\processor-sim-mlfq\simulator
// and type the command "node sim.js" and the application should run and print
// output to the terminal window.

//Process prototype
class Process {
    constructor(name, bursts, arrival, qType, count, currburst, rt, ct, wt, tat, IO, complete) {
        this.name = name;
        this.bursts = bursts;
        this.arrival = arrival;
        this.qType = qType;
        this.count = count;
        this.currburst = currburst;
        this.rt = rt;
        this.ct = ct;
        this.wt = wt;
        this.tat = tat;
        this.IO = IO;
        this.complete = complete;
    }
}

var p1bursts = [7, 22, 6, 19, 12, 44, 8, 21, 10, 37, 5, 24, 6, 44, 7, 43, 8];
var p2bursts = [14, 48, 15, 44, 17, 42, 22, 37, 19, 76, 14, 41, 16, 31, 17, 43, 18];
var p3bursts = [8, 43, 7, 41, 6, 45, 8, 21, 9, 35, 14, 18, 5, 26, 3, 31, 6 ];
var p4bursts = [13, 37, 4, 41, 5, 35, 12, 41, 8, 55, 15, 34, 6, 73, 5, 77, 3];
var p5bursts = [6, 34, 7, 21, 5, 44, 6, 32, 7, 28, 3, 48, 11, 44, 6, 33, 3, 28, 4];
var p6bursts = [9, 32, 4, 28, 5, 10, 6, 12, 7, 14, 9, 18, 12, 24, 15, 30, 8];
var p7bursts = [14, 46, 17, 41, 11, 42, 15, 21, 4, 32, 7, 19, 16, 33, 10];
var p8bursts = [4, 64, 5, 53, 6, 44, 4, 73, 6, 87, 5, 66, 8, 25, 6, 33, 9, 41, 7];
var p9bursts = [13, 37, 8, 41, 7, 27, 12, 29, 5, 27, 6, 18, 3, 33, 4, 62, 6];
var P1 = new Process("P1", p1bursts, 0, 1, 1, p1burst[0], 0, 0, 0, 0, false, false);
var P2 = new Process("P2", p2bursts, 0, 1, 1, p2burst[0], 0, 0, 0, 0, false, false);
var P3 = new Process("P3", p3bursts, 0, 1, 1, p3burst[0], 0, 0, 0, 0, false, false);
var P4 = new Process("P4", p4bursts, 0, 1, 1, p4burst[0], 0, 0, 0, 0, false, false);
var P5 = new Process("P5", p5bursts, 0, 1, 1, p5burst[0], 0, 0, 0, 0, false, false);
var P6 = new Process("P6", p6bursts, 0, 1, 1, p6burst[0], 0, 0, 0, 0, false, false);
var P7 = new Process("P7", p7bursts, 0, 1, 1, p7burst[0], 0, 0, 0, 0, false, false);
var P8 = new Process("P8", p8bursts, 0, 1, 1, p8burst[0], 0, 0, 0, 0, false, false);
var P9 = new Process("P9", p9bursts, 0, 1, 1, p9burst[0], 0, 0, 0, 0, false, false);

var total_time = 0
var idle_time = 0
var cpu_util = 0;

var qRR8 = [];
var RR8str = [];
var qRR12 = [];
var RR12str = [];
var qFCFS = [];
var FCFSstr = [];
var qIO = [];
var IOstr = [];
var qComplete = [];
var Completestr = [];
qRR8.push(P1);
qRR8.push(P2);
qRR8.push(P3);
qRR8.push(P4);
qRR8.push(P5);
qRR8.push(P6);
qRR8.push(P7);
qRR8.push(P8);
qRR8.push(P9);

// While there are still queues not completed
while (qComplete.length != 9) {
    // Before processing, check all the stored processes if they need to swap queues
    queueSwap(qRR8, qRR12, qFCFS, qIO, qComplete);
    queueSwap(qRR12, qRR12, qFCFS, qIO, qComplete);
    queueSwap(qRRFCFS, qRR12, qFCFS, qIO, qComplete);
    queueSwap(qIO, qRR12, qFCFS, qIO, qComplete);
    // each proccess round will change the time global variable
    // TODO: figure out how to compare global time to arrival times
    // TODO: preempting based on arrival times
    total_time = RR(qRR8, time, 8);
    total_time = RR(qRR12, time, 12);
    total_time = FCFS(qFCFS, time);

    for (var process in qRR8) {
        RR8str.push(process.name + ", ");
    }
    for (var process in qRR12) {
        RR12str.push(process.name + ", ");
    }
    for (var process in qFCFS) {
        FCFSstr.push(process.name + ", ");
    }
    for (var process in qIO) {
        IOstr.push(process.name + ", ");
    }
    for (var process in qComplete) {
        Completestr.push(process.name + ", ");
    }

    console.log("Current time: " + total_time);
    console.log("Processes in Queue 1 (RR - 8): " + RR8str);
    console.log("Processes in Queue 1 (RR - 12): " + RR12str);
    console.log("Processes in Queue 3 (FCFS): " + FCFSstr);
    console.log("Processes out to I/O: " + IOstr);
    console.log("==============================================");
    console.log("Completed Processes: " + Completestr);
    // TODO: function to increment idle_time
}
calcAverages(qComplete);
cpu_util = 100 - ((idle_time/total_time) * 100)
console.log("CPU Utilization: " + cpu_util + "%");

function FCFS(Queue, time) {
    for (var i = 0; i < Queue.length; i++ ) {
        // Calculate wait time
        Queue[i].wt = Queue[i-1].currburst + Queue[i-1].wt;
        // Calculate turnaround time
        Queue[i].tat = Queue[i].currburst + Queue[i].wt;
        // If the process completes
        if (Queue[i].count == Queue[i].bursts.length) {
            // Completion time is equal to the current time plus the final burst
            Queue[i].ct = time + Queue[i].currburst;
        }
        Queue[i].count++;
        // If the count tracker is even, send to IO queue
        if (Queue[i].count % 2 != 0) {
            //IO = true is sent to I/O queue
            Queue[i].IO = true;
        }
        // If count is incremented, set the current burst to the next one
        time += Queue[i].currburst;
        Queue[i].currburst = Queue[i].currburst[count];
    }
    return time;
}

function RR(Queue, time, quantum) {
    for (var i = o; i < Queue.length; i++) {
        // If the current burst is too large for the time quantum
        if (Queue[i].currburst > quantum) {
            // Set the new burst time
            Queue[i].currburst = Queue[i].currburst - quantum;
            Queue[i].arrival = time + quantum;
            time += quantum;
            // Demote the qType
            Queue[i].qType--;
        } else {
            time += Queue[i].currburst;
            Queue[i].wt = time - Queue[i].currburst;
            Queue[i].count++;
        }
    }
    return time;
}

function runIO(Queue) {
    for (process in Queue) {
        process.arrival += process.currburst;
        process.count++;
        process.IO = false
        process.currburst = process.bursts[count];
    }
}

function queueSwap(checkQ, Q2, Q3, Q4, Q5) {
    for (var process of checkQ) {
        if (process.qType == 2) {
            var temp = checkQ.pop();
            Q2.push(temp);
        } else if (process.qType == 3) {
            var temp = checkQ.pop();
            Q3.push(temp);
        }
        if (process.IO == true) {
            var temp = checkQ.pop();
            Q4.push(temp);
        } else if (process.complete == true) {
            var temp = checkQ.pop();
            Q5.push(temp);
        }
    }
}

function calcAverages (Queue) {
    var total_rt = 0;
    var total_wt = 0;
    var total_tat = 0;
    for (process in Queue) {
        // Iterate through all the processes in the completed queue and add the totals
        total_rt += process.rt;
        total_wt += process.wt;
        total_tat += process.tat;
    }
    console.log("Average RT: " + (total_rt/9));
    console.log("Average WT: " + (total_wt/9));
    console.log("Average TAT: " + (total_tat/9));
}