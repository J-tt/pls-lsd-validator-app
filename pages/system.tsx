import classNames from 'classnames';
import { CustomTag } from 'components/common/CustomTag';
import { DataLoading } from 'components/common/DataLoading';
import { PageTitleContainer } from 'components/common/PageTitleContainer';
import { PoolAssets } from 'components/pool/PoolAssets';
import ProtocolRevenue from 'components/system/ProtocolRevenue';
import ProtocolStatus from 'components/system/ProtocolStatus';
import Validater from 'components/system/Validater';
import Voter from 'components/system/Voter';
import VouchContracts from 'components/system/VouchContracts';
import { robotoBold } from 'config/font';
import { useAppSlice } from 'hooks/selector';
import { useApr } from 'hooks/useApr';
import { useNetworkProposalData } from 'hooks/useNetworkProposalData';
import { usePoolData } from 'hooks/usePoolData';
import { usePoolPubkeyData } from 'hooks/usePoolPubkeyData';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getLsdTokenName } from 'utils/configUtils';
import { getLsdTokenIcon } from 'utils/iconUtils';
import { formatNumber } from 'utils/numberUtils';
import { useAccount } from 'wagmi';

const SystemPage = () => {
  const { apr } = useApr();
  const { voters, voteManagerAddress } = useNetworkProposalData();
  const { nodes } = usePoolPubkeyData();
  const { admin } = useNetworkProposalData();
  const { address: metaMaskAccount } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (
      admin !== metaMaskAccount &&
      metaMaskAccount?.indexOf(voters) === -1 &&
      metaMaskAccount?.indexOf(nodes) === -1
    ) {
      router.push('/');
    }
  }, [voters, admin, nodes]);

  return (
    <div>
      <PageTitleContainer>
        <div className='h-full flex items-center w-smallContentW xl:w-contentW 2xl:w-largeContentW'>
          <div className='w-[.68rem] h-[.68rem] relative'>
            <Image src={getLsdTokenIcon()} layout='fill' alt='icon' />
          </div>

          <div>
            <div className='ml-[.12rem] flex items-center'>
              <div
                className={classNames(
                  robotoBold.className,
                  'text-[.34rem] text-color-text1'
                )}
              >
                {getLsdTokenName()} Pool
              </div>

              <CustomTag type='apr' ml='.12rem'>
                {apr === undefined ? (
                  <DataLoading height='.12rem' />
                ) : (
                  `${formatNumber(apr, { decimals: 2 })}%`
                )}
                <span className='ml-[.06rem]'>staking APR</span>
              </CustomTag>
            </div>

            <div className='ml-[.12rem] mt-[.12rem] text-[.12rem] text-color-text2 cursor-pointer'>
              <div className='flex items-center'>
                <div className='mr-[.06rem]'>
                  Take part in rPool programs, earn tokens easily.
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTitleContainer>

      <div className='w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto mb-[.56rem]'>
        <PoolAssets />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-1 mt-1'>
          <div>
            <ProtocolStatus />
          </div>
          <div>
            <ProtocolRevenue />
          </div>
          <div>
            <VouchContracts />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 mt-1'>
          <div>
            <Voter voters={voters} voteManagerAddress={voteManagerAddress} />
          </div>
          <div>
            <Validater nodes={nodes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPage;
