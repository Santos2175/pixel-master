import React, { useState } from 'react';
import Faq from './modal/Faq';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  //   it pop ups the modal
  const handleFaqClick = () => {
    setShowModal(true);
  };

  //   it closes the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header className='header'>
        {/* left portion */}
        <div className='left'>
          <div className='nav-item'>
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
            <img src='' alt='fire png' />
          </div>
          <div className='nav-item' onClick={handleFaqClick}>
            <i className='iconfont icon-questioncircle faqIcon'></i>
            <span>menu.fq</span>
          </div>
        </div>
      </header>

      {showModal && (
        <div className='modal-overlay'>
          <Faq closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Header;
