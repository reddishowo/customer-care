// File: /src/app/queue/page.tsx
"use client";

import { useState, useEffect } from "react";

interface QueueItem {
  number: number;
  status: 'waiting' | 'serving' | 'completed';
  timestamp: Date;
  estimatedTime?: number;
}

export default function Queue() {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [currentlyServing, setCurrentlyServing] = useState<number | null>(null);
  const [averageWaitTime, setAverageWaitTime] = useState(5); // minutes
  const [isPaused, setIsPaused] = useState(false);

  // Format number to 4 digits
  const formatNumber = (num: number) => num.toString().padStart(4, '0');

  // Calculate estimated wait time
  const calculateEstimatedTime = (position: number): number => {
    return Math.max(0, position * averageWaitTime);
  };

  // Get time in readable format
  const getReadableTime = (minutes: number): string => {
    if (minutes < 1) return 'Less than a minute';
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${Math.round(mins)}m`;
  };

  // Get new queue number
  const getQueueNumber = () => {
    if (userNumber) {
      alert('You already have a queue number!');
      return;
    }

    const newNumber = currentNumber + 1;
    const position = queueItems.length;
    
    const newQueueItem: QueueItem = {
      number: newNumber,
      status: 'waiting',
      timestamp: new Date(),
      estimatedTime: calculateEstimatedTime(position)
    };

    setCurrentNumber(newNumber);
    setQueueItems(prevItems => [...prevItems, newQueueItem]);
    setUserNumber(newNumber);

    // Store in localStorage
    localStorage.setItem('userQueueNumber', newNumber.toString());
  };

  // Call next number
  const callNextNumber = () => {
    if (isPaused) {
      alert('Queue is currently paused');
      return;
    }

    if (queueItems.length === 0) {
      alert('No one in queue');
      return;
    }

    setQueueItems(prevItems => 
      prevItems.map((item, index) => {
        if (index === 0) {
          return { ...item, status: 'serving' as const };
        }
        // Update estimated times for remaining items
        return {
          ...item,
          estimatedTime: calculateEstimatedTime(index)
        };
      })
    );

    const firstItem = queueItems[0];
    if (firstItem) {
      setCurrentlyServing(firstItem.number);
    }
  };

  // Complete current number
  const completeCurrentNumber = () => {
    if (!currentlyServing) return;

    setQueueItems(prevItems => 
      prevItems.map(item => {
        if (item.number === currentlyServing) {
          return { ...item, status: 'completed' as const };
        }
        return item;
      }).filter(item => item.status !== 'completed')
    );
    
    setCurrentlyServing(null);

    // Update average wait time based on actual time taken
    setAverageWaitTime(prevTime => prevTime * 0.8 + 5 * 0.2);
  };

  // Toggle queue pause
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Get user's position in queue
  const getUserPosition = (): number | null => {
    if (!userNumber) return null;
    const position = queueItems.findIndex(item => item.number === userNumber) + 1;
    return position === 0 ? null : position;
  };

  // Effect to restore user's queue number from localStorage
  useEffect(() => {
    const savedNumber = localStorage.getItem('userQueueNumber');
    if (savedNumber) {
      const parsed = parseInt(savedNumber, 10);
      if (!isNaN(parsed)) {
        setUserNumber(parsed);
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-12 bg-black p-8 rounded-lg shadow-2xl">
        <h1 className="text-5xl font-bold text-primary mb-4">Antrian</h1>
        <p className="text-gray-400 text-xl">
          Status: {isPaused ? 'PAUSED' : 'ACTIVE'}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Now Serving Section */}
        <div className="card bg-black shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-primary">Now Serving</h2>
            <div className="stats bg-base-300 text-primary-content">
              <div className="stat">
                <div className="stat-title text-gray-400">Current Number</div>
                <div className="stat-value text-5xl text-primary">
                  {currentlyServing ? formatNumber(currentlyServing) : '----'}
                </div>
              </div>
            </div>
            
            {/* Admin Controls */}
            <div className="flex flex-col gap-4 mt-6">
              <button 
                onClick={callNextNumber}
                className="btn btn-primary"
                disabled={isPaused}
              >
                Call Next
              </button>
              <button 
                onClick={completeCurrentNumber}
                className="btn btn-secondary"
                disabled={!currentlyServing}
              >
                Complete Current
              </button>
              <button 
                onClick={togglePause}
                className={`btn ${isPaused ? 'btn-error' : 'btn-warning'}`}
              >
                {isPaused ? 'Resume Queue' : 'Pause Queue'}
              </button>
            </div>
          </div>
        </div>

        {/* Get Number Section */}
        <div className="card bg-black shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-primary">Your Queue Status</h2>
            
            {userNumber ? (
              <div className="space-y-6">
                <div className="stats bg-base-300 text-primary-content">
                  <div className="stat">
                    <div className="stat-title text-gray-400">Your Number</div>
                    <div className="stat-value text-5xl text-secondary">
                      {formatNumber(userNumber)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-base-300 p-4 rounded-lg">
                  <p className="text-gray-400">Position: {getUserPosition() ?? 'Not in queue'}</p>
                  <p className="text-gray-400">
                    Estimated Wait: {getReadableTime(calculateEstimatedTime(getUserPosition() ?? 0 - 1))}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <button onClick={getQueueNumber} className="btn btn-primary btn-lg">
                  Get Queue Number
                </button>
                <p className="text-gray-400">
                  Current wait time: ~{getReadableTime(averageWaitTime)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Queue Status Table */}
      <div className="card bg-black shadow-2xl mt-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4 text-primary">Queue Status</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Wait Time</th>
                  <th>Estimated Service</th>
                </tr>
              </thead>
              <tbody>
                {queueItems.map((item, index) => (
                  <tr 
                    key={item.number}
                    className={item.number === userNumber ? "bg-base-900" : ""}
                  >
                    <td className="font-mono">{formatNumber(item.number)}</td>
                    <td>
                      <div className={`badge ${
                        item.status === 'serving' 
                          ? 'badge-primary' 
                          : 'badge-secondary'
                      }`}>
                        {item.status}
                      </div>
                    </td>
                    <td>{item.timestamp.toLocaleTimeString()}</td>
                    <td>{getReadableTime(item.estimatedTime || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}