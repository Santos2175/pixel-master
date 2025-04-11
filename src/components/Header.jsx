import React, { useState } from 'react';
import Faq from './modal/Faq';
import LeaderBoard from './LeaderBoard';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  //   it pop ups the modal
  const handleFaqClick = () => {
    setActiveItem('faq');
    setShowModal(true);
  };

  //   it closes the modal
  const closeModal = () => {
    setActiveItem(null);
    setShowModal(false);
  };

  // show leaderboard
  const handleLeaderBoardClick = () => {
    setActiveItem('leaderboard');
    setShowLeaderBoard(true);
  };

  // close the leaderboard
  const closeLeaderBoard = () => {
    setActiveItem(null);
    setShowLeaderBoard(false);
  };

  return (
    <>
      <header className='header'>
        {/* left portion */}
        <div className='left'>
          <div
            className={`nav-item ${
              activeItem === 'leaderboard' ? 'active' : ''
            }`}
            onClick={handleLeaderBoardClick}>
            <i className='iconfont icon-trophy trophy'></i>
            <span>menu.leaderboard</span>
          </div>
          <select className='nav-item language' id=''>
            <option className='option' value='en'>
              🇺🇸 English
            </option>
            <option className='option' value='zh'>
              🇨🇳 简体中文
            </option>
            <option className='option' value='ja'>
              🇯🇵 日本語
            </option>
            <option className='option' value='ko'>
              🇰🇷 한국어
            </option>
          </select>
        </div>

        {/* center portion */}
        <div className='center'>
          <div className='pixel'></div>
          <span>title</span>
        </div>

        {/* right portion */}
        <div className='right'>
          <div className='nav-item'>
            <img src='/fire.png' alt='fire png' />
          </div>
          <div className='nav-item' onClick={handleFaqClick}>
            <i className='iconfont icon-questioncircle faqIcon'></i>
            <span>menu.fq</span>
          </div>
        </div>
      </header>

      {/* leaderboard */}
      {showLeaderBoard && (
        <LeaderBoard
          isVisible={showLeaderBoard}
          closeLeaderBoard={closeLeaderBoard}
        />
      )}

      {/* faq modal */}
      {showModal && (
        <div className='modal-overlay'>
          <Faq closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Header;
