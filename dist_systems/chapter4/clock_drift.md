# Clock Drift

Clock drift refers to the phenomenon where different system clocks gradually become desynchronized over time, leading to discrepancies in timestamp recording. This is particularly important in time-series databases and distributed systems where precise temporal ordering and data correlation are essential.

Clock drift happens since no two physical clock oscillators can run at the exact same rate. The minimal differences in oscillation frequency can accumulate and cause significant timing discrepancies over time. In distributed systems, clock drift can manifest between different servers in a cluster, multiple sensors in an IoT sensor, or even different trading system components. This can cause issues with ordering data, measurement inaccuracies, etc.

## Mitigation Strategies

You can use time synchronization protocols to maintain clock synchronization:
- Network Time Protocol (NTP) is for general purpose synchronization.
- Precision Time Protocol for high precision requirements and situations.

Or you could try regular monitoring and correction. Every so often run a job to detect clock drift and if it's past a certain tolerable level, we'll trigger some kind of resynchronization process.

## Credits
- [What Is NTP Drift? - Twingate](https://www.twingate.com/blog/glossary/ntp%20drift)
- [Clock Drift - QuestDB](https://questdb.com/glossary/clock-drift/)