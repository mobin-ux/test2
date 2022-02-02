import css from "./footer.module.scss";
const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={`${css.container} mx-2 md:mx-10 py-3`}>
        <div className={css.footer_logo}>
          <div className={css.copy}>
            <i className={css.logo}>PayRue</i>
            <p>
              2021 © The use of materials is prohibited without written consent.
            </p>
          </div>
        </div>
        <div className={css.footer_content}>
          <p className={css.support}>
            Technical support
            <a href="mailto:support@payrue.zendesk.com">
              support@payrue.zendesk.com
            </a>
          </p>
          <div className={css.links_external}>
            <a href="https://twitter.com/pay_rue">
              <svg width="23" height="19" viewBox="0 0 23 19">
                <use xlinkHref="/img/sprite.svg#tw" />
              </svg>
            </a>

            <a href="https://discord.com/invite/6XR9v7Wydw">
              <img width="30" src="/img/discord.svg" alt="discord" />
            </a>

            <a href="https://forum.payrue.com/">
              <img width="23" src="/img/forum.svg" alt="forum" />
            </a>

            <a href="https://github.com/payRueOrg">
              <img width="25" src="/img/github.svg" alt="github" />
            </a>

            <a href="https://t.me/payrue_global">
              <svg width="23" height="19" viewBox="0 0 23 19">
                <use xlinkHref="/img/sprite.svg#tg" />
              </svg>
            </a>

            <a href="https://www.reddit.com/user/payrue">
              <svg width="23" height="23" viewBox="0 0 25 25">
                <use xlinkHref="/img/sprite.svg#re" />
              </svg>
            </a>

            <a href="https://www.facebook.com/payrue">
              <svg width="11" height="23" viewBox="0 0 11 23">
                <use xlinkHref="/img/sprite.svg#fb" />
              </svg>
            </a>

            <a href="https://www.instagram.com/payrueofficial">
              <svg width="23" height="23" viewBox="0 0 23 23">
                <use xlinkHref="/img/sprite.svg#ig" />
              </svg>
            </a>

            <a href="https://payrue.chat/home.html#/login">
              <img width="16" src="/img/payrue-chat.svg" alt="payrue-chat" />
            </a>
          </div>
          <div className={css.links_internal}>
            <div className={css.section}>
              <a href="https://payrue.finance/">PayRue Swap</a>
              <a href="https://nft.payrue.com/">PayRue NFT Marketplace</a>
              <a href="https://payrue.finance/dex-wallet">PayRue Wallet</a>
              <a href="https://payrue.chat/">PayRue Chat</a>
            </div>
            <div className={css.section}>
              <a href="https://payrue.com/about.html">About Us</a>
              <a href="https://payrue.gitbook.io/investor-page/">
                PayRue Investor Page
              </a>
              <a href="https://documenter.getpostman.com/view/10441178/SzKSSKAh?version=latest#3589a9b2-1ef7-4239-a607-35f39a4c863a">
                PayRue API
              </a>
              <a href="https://payrue.com/mediakit.html">PayRue Mediakit</a>
            </div>
            <div className={css.section}>
              <a href="https://payrue.com/docs/Know_Your_Customer_Declaration_Form.pdf">
                KYC
              </a>
              <a href="https://payrue.com/privacy.html">Privacy Policy</a>
              <a href="https://payrue.com/cookies.html">Cookies Policy</a>
              <a href="https://payrue.com/terms.html">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
