const headerData = {
  links: [
    {
      title: "Explore",
      href: "/",
    },
    {
      title: "Create",
      href: "/create-item",
    },
    {
      title: "Collections",
      href: "/collections",
    },
    {
      title: "Traded",
      href: "/traded",
    },
    {
      title: "Help",
      mobile: true,
      href: "https://docs.payrue.com/payrue-nft-faq/",
      target: "blank",
      icon: "/img/external-link.svg",
      iconStyle: {
        height: 20,
        marginLeft: 5,
      },
    },
    {
      title: "PayRue Wallet",
      mobile: true,
      href: "https://payrue.finance/dex-wallet",
      target: "blank",
      icon: "/img/external-link.svg",
      iconStyle: {
        height: 20,
        marginLeft: 5,
      },
    },
  ],
  dao: [
    {
      title: "DAO & PayRue Ltd",
      onClick: () =>
        window.open("https://payrue.finance/dao/dao-ltd", "_blank"),
    },
    {
      title: "DAO Structure",
      onClick: () =>
        window.open("https://payrue.finance/dao/structure", "_blank"),
    },
    {
      title: "PayRue Penguins",
      onClick: () => (window.location.href = "/promo"),
    },
    {
      title: "Governance",
      onClick: () => window.open("https://snapshot.org/#/payrue", "_blank"),
    },
  ],
  more: [
    {
      title: "Help",
      onClick: () =>
        window.open("https://docs.payrue.com/payrue-nft-faq/", "_blank"),
    },
    {
      title: "PayRue Wallet",
      onClick: () => window.open("https://payrue.finance/dex-wallet", "_blank"),
    },
  ],
  // promo: [
  //   {
  //     title: "Discord",
  //     href: "/traded",
  //   },
  //   {
  //     title: "Forum",
  //     href: "/traded",
  //   },
  // ],
};

export { headerData };
