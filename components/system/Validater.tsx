import React from 'react';
import classNames from 'classnames';
import { useAppSlice } from 'hooks/selector';
import { CustomButton } from 'components/common/CustomButton';
import { useWalletAccount } from 'hooks/useWalletAccount';
import { useNetworkProposalData } from 'hooks/useNetworkProposalData';
import { addTrustNode, removeTrustNode } from 'redux/reducers/ValidatorSlice';
import { useAppDispatch } from 'hooks/common';
import { useWriteContract } from 'wagmi';

export default function Validater({ nodes }: any) {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSlice();
  const { metaMaskAccount } = useWalletAccount();
  const { admin } = useNetworkProposalData();
  const [voterAddress, setVoterAddress] = React.useState('');
  const { writeContractAsync } = useWriteContract();
  return (
    <div className='bg-color-bg2 border-[0.01rem] border-color-border1 rounded-[.3rem]'>
      <div className='h-[.7rem] flex items-center justify-between font-[500] border-solid border-b-[.01rem] border-white dark:border-[#1B1B1F] text-[.16rem] text-color-text2 px-[30px]'>
        <span>Trusted Validator Node Address</span>
        {/* <span>Active Validators</span> */}
      </div>
      <div
        className={classNames(
          'font-[500] min-h-[350px] py-[20px]',
          'bg-bgPage/50 dark:bg-bgPageDark/50'
        )}
      >
        {nodes &&
          nodes.map((node: string, index: number) => (
            <div
              key={index}
              className={
                darkMode
                  ? 'flex items-center justify-between px-[30px] py-[8px] border-b-[0.01rem] border-[#303745] text-[.14rem] text-color-text1'
                  : 'flex items-center justify-between px-[20px] py-[5px] border-b-[0.01rem] border-[#ffffff] text-[.14rem] text-color-text1'
              }
            >
              <div className='text-[13px] truncate'>{node}</div>
              {/* <div className={robotoSemiBold.className}>57</div> */}
            </div>
          ))}
        <div className='text-[.14rem] text-color-text1 mt-5 text-center mb-[10px] max-w-[422px] mx-auto'>
          <input
            type='text'
            placeholder='Enter Trusted Node Address'
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            className={
              darkMode
                ? 'w-full rounded-[35px] bg-[#1B1B1F] text-center h-[42px] border-[0.01rem] border-[#6C86AD80]'
                : 'w-full rounded-[35px] bg-[#fff] text-center h-[42px] border-[0.01rem] border-[#6C86AD80]'
            }
          />
          <div className='mt-[10px] max-w-[100%] mx-auto flex items-center gap-1 w-[100%] justify-center'>
            <CustomButton
              type='small'
              height='.42rem'
              width='130px'
              disabled={admin !== metaMaskAccount}
              onClick={() => {
                dispatch(addTrustNode(writeContractAsync, voterAddress));
              }}
            >
              Add
            </CustomButton>
            <CustomButton
              type='small'
              height='.42rem'
              width='130px'
              disabled={admin !== metaMaskAccount}
              onClick={() => {
                dispatch(removeTrustNode(writeContractAsync, voterAddress));
              }}
            >
              Remove
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
