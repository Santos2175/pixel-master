import React from 'react';

const LeaderBoard = ({ isVisible, closeLeaderBoard }) => {
  return (
    <div className={`leaderboard ${isVisible ? 'active' : ''}`}>
      <div className='loading'>loading</div>
      <button className='close' onClick={closeLeaderBoard}>
        <i className='iconfont icon-rt'></i>
      </button>
    </div>
  );
};

export default LeaderBoard;
