import classNames from "classnames";
import { CustomTag } from "components/common/CustomTag";
import { DataLoading } from "components/common/DataLoading";
import { PageTitleContainer } from "components/common/PageTitleContainer";
import { DelegateElection } from "components/pool/DelegateElection";
import { PoolAssets } from "components/pool/PoolAssets";
import { UnstakingPoolStatus } from "components/pool/UnstakingPoolStatus";
import { ValidatorEjection } from "components/pool/ValidatorEjection";
import { robotoBold } from "config/font";
import { useAppSlice } from "hooks/selector";
import { useApr } from "hooks/useApr";
import Image from "next/image";
import { useRouter } from "next/router";
import lsdTokenIcon from "public/images/token/lsdETH.svg";
import { getLsdTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

const PoolDataPage = () => {
  const { darkMode } = useAppSlice();
  const router = useRouter();

  const { apr } = useApr();

  return (
    <div>
      <PageTitleContainer>
        <div className="h-full flex items-center w-smallContentW xl:w-contentW 2xl:w-largeContentW">
          <div className="w-[.68rem] h-[.68rem] relative">
            <Image src={lsdTokenIcon} layout="fill" alt="icon" />
          </div>

          <div>
            <div className="ml-[.12rem] flex items-center">
              <div
                className={classNames(
                  robotoBold.className,
                  "text-[.34rem] text-color-text1"
                )}
              >
                {getLsdTokenName()} Pool
              </div>

              <CustomTag type="apr" ml=".12rem">
                {apr === undefined ? (
                  <DataLoading height=".12rem" />
                ) : (
                  `${formatNumber(apr, { decimals: 2 })}%`
                )}
                <span className="ml-[.06rem]">staking APR</span>
              </CustomTag>
            </div>

            <div className="ml-[.12rem] mt-[.12rem] text-[.12rem] text-color-text2 cursor-pointer">
              <div className="flex items-center">
                <div className="mr-[.06rem]">
                  Take part in rPool programs, earn tokens easily.
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTitleContainer>

      <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto mb-[.56rem]">
        <PoolAssets />

        <UnstakingPoolStatus />

        <ValidatorEjection />

        <DelegateElection />
      </div>
    </div>
  );
};

export default PoolDataPage;
