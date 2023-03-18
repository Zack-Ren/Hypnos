using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CapstoneBackend.Models
{
    public class Analysis : Diagnostics
    {
        [BsonElement("windowLength")]
        public int WindowLength { get; }

        [BsonElement("sleepPositions")]
        public List<string> SleepPositions { get; }

        [BsonElement("breathingRates")]
        public List<double> BreathingRates { get; }

        // Create new Analysis object from Diagnostic object
        public Analysis(Diagnostics diagnostics)
        {
            this.Id = diagnostics.Id;
            this.PatientId = diagnostics.PatientId;
            this.DataAcquisitionStartTime = diagnostics.DataAcquisitionStartTime;
            this.DataAcquisitionEndTime = diagnostics.DataAcquisitionEndTime;
            this.AccelerationX = diagnostics.AccelerationX;
            this.AccelerationY = diagnostics.AccelerationY;
            this.AccelerationZ = diagnostics.AccelerationY;
            this.AngularAccelerationX = diagnostics.AngularAccelerationX;
            this.AngularAccelerationY = diagnostics.AngularAccelerationY;
            this.AngularAccelerationZ = diagnostics.AngularAccelerationZ;
            this.WindowLength = 60;
            this.SleepPositions = new List<string>();
            this.BreathingRates = new List<double>();
        }

        public void findSleepPositions(List<double> AccelerationX, List<double> AccelerationZ, List<string> SleepPositions)
        {
            // Position types
            string[] posTypes = new string[5] { "back", "stomach", "right-side", "left-side", "up-right" };
            // Sleep position list (classifies sleep position for each data point)
            for (int i = 0; i < AccelerationX.Count; i++)
            {
                // Sign of x and z components
                int sign_x = Math.Sign(AccelerationX[i]);
                int sign_z = Math.Sign(AccelerationZ[i]);
                // max_zx: indicates the larger component between z, x (larger z: true, larger x: false)
                bool max_zx = true;
                if (Math.Abs(AccelerationX[i]) > Math.Abs(AccelerationZ[i]))
                {
                    max_zx = false;
                }
                // Determine sleep position based on magnitude and sign of x and z components
                // Larger z due to gravity
                if (max_zx && sign_z == 1)
                {
                    SleepPositions.Add(posTypes[0]);
                }
                else if (max_zx && sign_z == -1)
                {
                    SleepPositions.Add(posTypes[1]);
                }
                // Larger x due to gravity
                else if (!max_zx && sign_x == 1)
                {
                    SleepPositions.Add(posTypes[2]);
                }
                else if (!max_zx && sign_z == -1)
                {
                    SleepPositions.Add(posTypes[3]);
                }
                // Exception when x and z are both zero (this corresponds to the phone being upright)
                else
                {
                    SleepPositions.Add(posTypes[4]);
                }
            }
            return;
        }

        private List<int> localMaxes(List<double> acceleration, int lo, int hi)
        {
            List<int> maxes = new List<int>();
            for (int j = lo; j < hi; j++)
            {
                if (acceleration[j] > acceleration[j - 1] && acceleration[j] > acceleration[j + 1])
                {
                    maxes.Add(j);
                }
            }
            return maxes;
        }

        private List<int> localMins(List<double> acceleration, int lo, int hi)
        {
            List<int> mins = new List<int>();
            for (int j = lo; j < hi; j++)
            {
                if (acceleration[j] < acceleration[j - 1] && acceleration[j] < acceleration[j + 1])
                {
                    mins.Add(j);
                }
            }
            return mins;
        }

        private double meanDifferences(int size, List<int> arr1, List<int> arr2)
        {
            double sum = 0;
            for (int i = 0; i < size; i++)
            {
                sum = sum + arr1[i] - arr2[i];
            }
            return sum / size;
        }

        public void findBreathingRates(List<double> AccelerationY, List<double> BreathingRates, int WindowLength)
        {
            int i = 0;
            //int ind = 0;
            while (i + WindowLength < AccelerationY.Count)
            {
                int hi = i + WindowLength;
                List<int> locMax = localMaxes(AccelerationY, i, hi);
                List<int> locMin = localMins(AccelerationY, i, hi);
                int minLen = Math.Min(locMin.Count, locMax.Count);
                // placeholder for mean difference between local extrema (@ 1 Hz: 2 --> 15 breaths/min)
                double meanDiffs = 2;
                if (locMax.Count >= locMin.Count)
                {
                    meanDiffs = meanDifferences(minLen, locMin, locMax);
                }
                else
                {
                    meanDiffs = meanDifferences(minLen, locMax, locMin);
                }
                // Conversion from time in seconds (meandiffs) to breaths per min: 30 * 1/meandiffs
                BreathingRates.Add(30 / meanDiffs);
                //ind = ind + 1;
                i = (int)(i + WindowLength / 2);
            }
            return;
        }
    }
}