using System;
using System.Collections;

namespace simulator
{
    public class Process {
        public string name { get; set; }
        public int[] burstArr { get; set; }
        public int[] ioArr { get; set; }
        public int arrival { get; set; }
        public int qType { get; set; }
        public Process(string Name, int[] BurstArr, int[] IoArr, int Arrival, int QType) {
            name = Name;
            burstArr = BurstArr;
            ioArr = IoArr;
            arrival = Arrival;
            qType = QType;
    }
}
    class Program {
        static void Main(string[] args) {
            int[] p1burst = { 7, 6, 12, 8, 10, 5, 6, 7, 8 };
            int[] p1io = { 22, 19, 44, 21, 37, 24, 44, 43 };
            int[] p2burst = { 14, 15, 17, 22, 19, 14, 16, 17, 18 };
            int[] p2io = { 48, 44, 42, 37, 76, 41, 31, 43 };
            int[] p3burst = { 8, 7, 6, 8, 9, 14, 5, 3, 6 };
            int[] p3io = { 43, 41, 45, 21, 35, 18, 26, 31 };
            int[] p4burst = { 13, 4, 5, 12, 8, 15, 6, 5, 3 };
            int[] p4io = { 37, 41, 35, 41, 55, 34, 73, 77 };
            int[] p5burst = { 6, 7, 5, 6, 7, 3, 11, 6, 3, 4 };
            int[] p5io = { 34, 21, 44, 32, 28, 48, 44, 33, 28 };
            int[] p6burst = { 9, 4, 5, 6, 7, 9, 12, 15, 8 };
            int[] p6io = { 32, 28, 10, 12, 14, 18, 24, 30 };
            int[] p7burst = { 14, 17, 11, 15, 4, 7, 16, 10 };
            int[] p7io = { 46, 41, 42, 21, 32, 19, 33 };
            int[] p8burst = { 4, 5, 6, 4, 6, 5, 8, 6, 9, 7 };
            int[] p8io = { 64, 53, 44, 73, 87, 66, 25, 33, 41 };
            int[] p9burst = { 13, 8, 7, 12, 5, 6, 3, 4, 6 };
            int[] p9io = { 37, 41, 27, 29, 27, 18, 33, 62 };

            Process P1 = new Process("P1", p1burst, p1io, 0, 1);
            Process P2 = new Process("P2", p2burst, p2io, 0, 1);
            Process P3 = new Process("P3", p3burst, p3io, 0, 1);
            Process P4 = new Process("P4", p4burst, p4io, 0, 1);
            Process P5 = new Process("P5", p5burst, p5io, 0, 1);
            Process P6 = new Process("P6", p6burst, p6io, 0, 1);
            Process P7 = new Process("P7", p7burst, p7io, 0, 1);
            Process P8 = new Process("P8", p8burst, p8io, 0, 1);
            Process P9 = new Process("P9", p9burst, p9io, 0, 1);

            Queue Q1 = new Queue();
            Queue Q2 = new Queue();
            Queue Q3 = new Queue();

            Q1.Enqueue(P1);
            Q1.Enqueue(P2);
            Q1.Enqueue(P3);
            Q1.Enqueue(P4);
            Q1.Enqueue(P5);
            Q1.Enqueue(P6);
            Q1.Enqueue(P7);
            Q1.Enqueue(P8);
            Q1.Enqueue(P9);

            Console.WriteLine(Q1.Dequeue());
        }
    }
}
