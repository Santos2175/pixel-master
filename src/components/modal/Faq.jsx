import React from 'react';

const Faq = ({ closeModal }) => {
  return (
    <div className='modal'>
      <div className='content'>
        <button className='closeFAQ' onClick={closeModal}>
          <i className='iconfont icon-close'></i>
        </button>

        {/* title */}
        <h2>faq.title</h2>
        <p>
          EOS PIXEL MASTER is the world's first collaborative artwork based on
          blockchain. Use the toolbar to paint pixels. Confirm your pixels by
          purchasing with EOS tokens. This requires
          <a className='link' href=''>
            an EOS account
          </a>{' '}
          and
          <a className='link' href=''>
            Scatter
          </a>
          , or you can use
          <a className='link' href=''>
            Token Pocket
          </a>
          on mobile.
        </p>

        {/* how to earn */}
        <h4>faq.questions.howToEarn</h4>
        <p>
          EOS PIXEL MASTER features multiple ways to earn:
          <strong>Patron Bonus, Bidding, Pot, and Referrals</strong>. Each pixel
          starts with a price tag of<strong>0.05 EOS</strong>. The payments from
          this Initial Pixel Offering go into Contract Proceeds.
        </p>

        {/* contract proceeds */}
        <h4>faq.questions.contractProceeds</h4>
        <p>
          40% paid as allocated as the Patron Bonus.
          <br />
          25% added to the Pot.
          <br />
          8% paid as referral reward (or to the pot if there is no referrer).
          <br />
          20% to EOS PIXEL MASTER Dev Team.
          <br />
          7% RAM payments.
        </p>

        {/* bidding */}
        <h4>faq.questions.bidding</h4>
        <p>
          You may purchase an already-owned pixel for<strong>1.35x</strong> the
          previous price. Of this 35% increase,<strong>75%</strong> goes
          directly to the previous owner as profit, and<strong>25%</strong> are
          fees, goes to Contract Proceeds (see above).
        </p>

        {/* patron bonus */}
        <h4>faq.questions.patronBonus</h4>
        <p>
          Every pixel you paint entitles you to the Patron Bonus. Even if your
          pixel is painted over by another player, you still receive the bonus,
          because you contributed. The more pixels you paint, the more bonus you
          will receive. Funds from your Account Balance will be available for
          withdrawal after the Game Activation threshold is met.
        </p>

        {/* pot */}
        <h4>faq.questions.pot</h4>
        <p>
          After the Game Activation threshold is met, if the pot fails to
          increase by<strong>0.5%</strong> per day, the pot will be distributed
          and the canvas will end. The pot will be distributed to
          <strong>
            all players who purchased a pixel in the past 24 hours
          </strong>
          , proportional to that player's pot contribution (purchase value of
          pixels) in that past-24-hour time period. Once the canvas is complete,
          it is immortalized into the blockchain.
        </p>

        {/* referrals */}
        <h4>faq.questions.referrals</h4>
        <p>
          If you're logged in with Scatter and have painted at least one pixel,
          you'll be able to use your referral link. Any purchases made from this
          link will earn you a referral bonus that's automatically deposited
          into your Account Balance. Funds from your Account Balance will be
          available for withdrawal after the Game Activation threshold is met.
        </p>

        {/* threshold */}
        <h4>faq.questions.threshold</h4>
        <p>
          There is a Game Activation threshold of<strong>150,000pixels</strong>.
          Before150,000pixels are purchased, the Patron Bonus and referral
          bonuses will still accrue in your account, but withdrawal is locked.
          After the threshold is met, all players will be able to withdraw funds
          from their account balance, and the Pot becomes activated.
        </p>

        {/* credits */}
        <h4>faq.questions.credits</h4>
        <p>
          Contact us on Telegram!{' '}
          <a
            className='link'
            target='_blank'
            href='https://t.me/playPixelMaster'>
            {' '}
            https://t.me/playPixelMaster{' '}
          </a>
          <br />
          View our account details:{' '}
          <a
            className='link'
            target='_blank'
            href='https://www.myeoskit.com/#tx/1pixelmaster'>
            {' '}
            https://www.myeoskit.com/#tx/1pixelmaster{' '}
          </a>
          <br />
          Thanks to EOS Asia for open source contracts:{' '}
          <a
            className='link'
            target='_blank'
            href='https://github.com/eosasia/eospixels'>
            {' '}
            https://github.com/eosasia/eospixels{' '}
          </a>
          <br />
        </p>
      </div>
    </div>
  );
};

export default Faq;
