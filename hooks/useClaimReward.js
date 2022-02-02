import { useStore } from 'effector-react';
import React from 'react';
import { stakingABI } from '../abi/staking';
import { $address, setAddress } from '../store/address';
import { $web3Modal, setWeb3Modal } from '../store/web3Modal';
const Web3 = require('web3');

const useClaimReward = () => {
  const address = useStore($address);
  const web3 = useStore($web3Modal);

  const claimReward = async () => {
    try {
      const stakingContractAddress =
        '0x0dc8c9726e7651afa4d7294fb2a3d7ee1436dd4a';
      const contract = new web3.eth.Contract(
        stakingABI,
        stakingContractAddress
      );
      await contract.methods.claimReward().send({
        from: address,
        gasLimit: 1500000,
      });
      const wallet = address.split('').join('');
      setAddress('');
      setTimeout(() => {
        setAddress(wallet);
      }, 50);
    } catch (error) {
      console.log(error);
    }
  };
  return claimReward;
};

export { useClaimReward };
