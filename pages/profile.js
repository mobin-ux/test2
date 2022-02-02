import React, { useCallback, useEffect } from "react";
import { StyledModalProfileView } from "../styled/StyledProfile";
import Bnb from "../components/icons/Bnb";
import axios from "axios";
import Fantom from "../components/icons/Fantom";
import { Ethereum } from "../components/icons/Ethereum";
import { Matic } from "../components/icons/Matic";
import { Avalanche } from "../components/icons/Avalanche";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useGate, useStore } from "effector-react";
import { $address } from "../store/address";
import { useBreakpoints } from "../hooks/useBreakpoints";
import Link from "next/link";
import { shortnererFunction } from "../utils/shortnererFunction";
import { NftItem } from "../components/nft-item";
import { backendUrl } from "../hooks/useAPI";
import { ClientOnly, CollectionCard } from "../components";
import { $session } from "../store/session";
import { useRouter } from "next/router";
import { $profile } from "../store/profile/profile";
import { useStakedPropel } from "../hooks/useStakedPropel";
import { useClaimReward } from "../hooks/useClaimReward";
import { Logout } from "../layouts";
import { $myCollections, myCollectionsGate } from "../store/collections";

const options = (data, isMobile) => ({
  title: {
    text: "",
    enabled: false,
  },
  tooltip: {
    valueSuffix: " USD",
  },
  chart: {
    backgroundColor: "transparent",
    height: isMobile ? 250 : 400,
    width: isMobile ? 280 : 450,
  },
  accessibility: {
    point: {
      valueSuffix: "USD",
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
      },
      size: isMobile ? 220 : 350,
    },
  },
  series: [
    {
      type: "pie",
      name: "Balance",
      innerSize: "50%",
      data: [...data],
    },
  ],
});

const Profile = () => {
  useGate(myCollectionsGate);
  const collections = useStore($myCollections);
  const walletAddress = useStore($address);

  const { isMobile } = useBreakpoints();

  const wallet = useStore($profile);
  const stakedPropel = useStakedPropel();
  const claimReward = useClaimReward();

  const logoUrl = (logo) => `${backendUrl}/uploads/collections/${logo}`;
  const coverUrl = (cover) => `${backendUrl}/uploads/collections/${cover}`;

  const [prices, setPrices] = React.useState({
    "matic-network": { usd: 0 },
    ethereum: { usd: 0 },
    "avalanche-2": { usd: 0 },
    fantom: { usd: 0 },
    binancecoin: { usd: 0 },
  });

  const BSCTokenBalance = (wallet?.tokenBalances?.bsc || [])
    .map(({ usdBalance }) => Number(usdBalance))
    .reduce((a, b) => a + b, 0);

  const BSCBalance =
    wallet?.balances?.bsc && prices?.binancecoin
      ? parseFloat(
          (
            Number(wallet?.balances?.bsc) * prices?.binancecoin?.usd +
            BSCTokenBalance
          ).toFixed(2)
        )
      : 0;

  const FantomTokenBalance = (wallet?.tokenBalances?.fantom || [])
    .map(({ usdBalance }) => Number(usdBalance))
    .reduce((a, b) => a + b, 0);

  const FantomBalance =
    wallet?.balances?.fantom && prices?.fantom
      ? parseFloat(
          (
            Number(wallet?.balances?.fantom) * prices?.fantom?.usd +
            FantomTokenBalance
          ).toFixed(2)
        )
      : 0;

  const EthereumTokenBalance = (wallet?.tokenBalances?.ethereum || [])
    .map(({ usdBalance }) => Number(usdBalance))
    .reduce((a, b) => a + b, 0);

  const EthereumBalance =
    wallet?.balances?.ethereum && prices?.ethereum
      ? parseFloat(
          (
            Number(wallet?.balances?.ethereum) * prices?.ethereum?.usd +
            EthereumTokenBalance
          ).toFixed(2)
        )
      : 0;

  const PolygonTokenBalance = (wallet?.tokenBalances?.polygon || [])
    .map(({ usdBalance }) => Number(usdBalance))
    .reduce((a, b) => a + b, 0);

  const PolygonBalance =
    wallet?.balances?.polygon && prices?.["matic-network"]
      ? parseFloat(
          (
            Number(wallet?.balances?.polygon) * prices?.["matic-network"]?.usd +
            PolygonTokenBalance
          ).toFixed(2)
        )
      : 0;

  const AvalancheTokenBalance = wallet?.tokenBalances?.avalanche
    .map(({ usdBalance }) => Number(usdBalance))
    .reduce((a, b) => a + b, 0);

  const AvalancheBalance =
    wallet?.balances?.avalanche && prices?.["avalanche-2"]
      ? parseFloat(
          (
            Number(wallet?.balances?.avalanche) * prices?.["avalanche-2"]?.usd +
            AvalancheTokenBalance
          ).toFixed(2)
        )
      : 0;

  const total = wallet?.balances
    ? BSCBalance +
      FantomBalance +
      EthereumBalance +
      PolygonBalance +
      AvalancheBalance
    : 0;

  const nfts = Object.entries(wallet?.nfts || {})
    .filter(([, value]) => value.result.length > 0)
    .map(([_, value]) => {
      return value?.result.map((nft) => ({
        ...nft,
        meta: JSON.parse(nft.metadata),
      }));
    })
    .flatMap((value) => value);

  const session = useStore($session);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/").then();
    }
  }, [session, router]);

  const fetchPrices = useCallback(() => {
    const ids = [
      "ethereum",
      "binancecoin",
      "avalanche-2",
      "matic-network",
      "fantom",
    ].join(",");
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      )
      .then(({ data }) => setPrices(data));
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const handleLogout = () => router.push("/logout");

  return (
    <ClientOnly>
      <StyledModalProfileView>
        <div className="profile-top">
          <div className="profile-top-left">
            <div className="profile-top-left-profile">
              <img src="/img/profile.svg" alt="profile" />
            </div>
            <div className="profile-top-left-info">
              <div className="profile-top-left-info-name">
                <h3>My Wallet</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div className="profile-top-left-info-share">
                <p>{shortnererFunction(walletAddress)}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(walletAddress)}
                >
                  <img src="/img/copy.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="profile-top-right">
            <h3>Total Address Net Asset Value</h3>
            <h4>${total.toFixed(2)} USD</h4>
            <div className="profile-top-right-profit" />
          </div>
        </div>
        <div className="profile-chart-section">
          <div className="profile-chart-section-left">
            <div className="property">
              <h4>My Total Crypto Balance</h4>
              <h4>{total.toFixed(2)} USD</h4>
            </div>
            <div className="property">
              <div className="coin">
                <div className="coin-img">
                  <Bnb size={42} />
                </div>
                <p>BSC</p>
              </div>
              <h5>{BSCBalance} USD</h5>
            </div>
            <div className="property">
              <div className="coin">
                <div className="coin-img">
                  <Fantom size={42} />
                </div>
                <p>Fantom</p>
              </div>
              <h5>{FantomBalance} USD</h5>
            </div>
            <div className="property">
              <div className="coin">
                <div className="coin-img">
                  <Ethereum size={42} />
                </div>
                <p>Ethereum</p>
              </div>
              <h5>{EthereumBalance} USD</h5>
            </div>
            <div className="property">
              <div className="coin">
                <div className="coin-img">
                  <Matic size={42} />
                </div>
                <p>Polygon</p>
              </div>
              <h5>{PolygonBalance} USD</h5>
            </div>
            <div className="property">
              <div className="coin">
                <div className="coin-img">
                  <Avalanche size={42} />
                </div>
                <p>Avalanche</p>
              </div>
              <h5>{AvalancheBalance} USD</h5>
            </div>
          </div>
          <div className="profile-chart-section-right">
            <h3>Wallet Analytics</h3>
            <div className="profile-chart-section-right-chart">
              <HighchartsReact
                className="chart"
                highcharts={Highcharts}
                options={{
                  ...options(
                    [
                      ["BSC", BSCBalance],
                      ["Fantom", FantomBalance],
                      ["Ethereum", EthereumBalance],
                      ["Polygon", PolygonBalance],
                      ["Avalanche", AvalancheBalance],
                    ],
                    isMobile
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="profile-nft-stacking-section">
          <div className="profile-nft-stacking-section-left">
            <h4>NFT</h4>
            <div className="profile-nft-stacking-section-left-body">
              {nfts?.slice(0, 2).map((nft, index) => (
                <NftItem {...nft} key={index} />
              ))}
              <Link prefetch={false} href="/nfts">
                View all
              </Link>
            </div>
          </div>
          <div className="profile-nft-stacking-section-right">
            <h4>Staking </h4>

            <div className="profile-nft-stacking-section-right-body">
              <div className="profile-nft-stacking-section-right-body-item">
                <p>Reward:</p>
                <p>
                  {parseFloat(
                    Number(stakedPropel.reward).toFixed(4)
                  ).toLocaleString("en")}{" "}
                  Propel
                  <button onClick={claimReward}>Claim</button>
                </p>
              </div>
              <div className="profile-nft-stacking-section-right-body-item">
                <p>You Staked:</p>
                <p>
                  {parseFloat(
                    Number(stakedPropel.staked).toFixed(4)
                  ).toLocaleString("en")}{" "}
                  Propel
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-collections mt-8 flex flex-col items-center">
          <h3>My Collections</h3>
          <div className="profile-collections-body flex gap-8 px-4 py-8 flex-wrap items-center">
            {collections?.slice(0, 2).map((collection, index) => (
              <CollectionCard key={index} {...collection} />
            ))}
          </div>
        </div>
      </StyledModalProfileView>
    </ClientOnly>
  );
};

export default Profile;
