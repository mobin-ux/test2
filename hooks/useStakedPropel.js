import React from 'react';

import { stakingABI } from '../abi/staking';
import { useStore } from 'effector-react';
import { $address } from '../store/address';
import { $connection } from '../store/connection';
const Web3 = require('web3');
const stakingContractAddress = '0x0dc8c9726e7651afa4d7294fb2a3d7ee1436dd4a';
const useStakedPropel = () => {
  const connection = useStore($connection)
  const address = useStore($address)
  const [stakedPropel, setStakedPropel] = React.useState({
    staked: '0',
    reward: '0',
  });

  React.useEffect(() => {
    const getStakedPropel = async () => {
      const web3 = new Web3(connection);
      const contract = new web3.eth.Contract(
        stakingABI,
        stakingContractAddress
      );
      const _staked = await contract.methods.staked(address).call();
      const staked = web3.utils.fromWei(_staked, 'ether');
      const _reward = await contract.methods
        .rewardClaimable(address)
        .call();
      const reward = web3.utils.fromWei(_reward, 'ether');
      setStakedPropel({
        staked,
        reward,
      });
    };
    if (address && connection) getStakedPropel();
  }, [address, connection]);

  return stakedPropel;
};

export { useStakedPropel };
