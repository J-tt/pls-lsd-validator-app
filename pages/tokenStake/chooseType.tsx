import classNames from "classnames";
import { CardContainer } from "components/common/CardContainer";
import { CustomButton } from "components/common/CustomButton";
import { ChooseTypeGuide } from "components/tokenStake/ChooseTypeGuide";
import { robotoBold } from "config/font";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { useIsTrustedValidator } from "hooks/useIsTrustedValidator";
import { useRouter } from "next/router";
import { useState } from "react";
import { RootState } from "redux/store";
import { openLink } from "utils/commonUtils";

const ChooseTypePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [validatorKeys, setValidatorKeys] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const { isTrust } = useIsTrustedValidator();

  const { validatorWithdrawalCredentials } = useAppSelector(
    (state: RootState) => {
      return {
        validatorWithdrawalCredentials:
          state.validator.validatorWithdrawalCredentials,
      };
    }
  );

  return (
    <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto">
      <div className="flex mt-[.24rem] items-start">
        <CardContainer width="6.2rem" title="Choose Validator Type">
          <div className="h-[3.4rem] flex justify-center pt-[.52rem]">
            <div className="w-[1.88rem] h-[2.11rem] rounded-[.16rem] bg-color-bgPage flex flex-col items-center justify-between">
              <div className="mt-[.32rem] flex flex-col items-center">
                <div
                  className={classNames(
                    "text-[.16rem] text-color-text1",
                    robotoBold.className
                  )}
                >
                  Trusted Validator
                </div>

                <div
                  className={classNames(
                    "text-[.14rem] text-color-text2 mt-[.14rem]"
                  )}
                >
                  Apply to be nominated
                </div>
              </div>

              <div className="self-stretch mb-[.24rem] mx-[.16rem]">
                {!isTrust ? (
                  <CustomButton
                    height=".48rem"
                    type="stroke"
                    onClick={() => {
                      openLink("https://forms.gle/RtFK7qo9GzabQTCfA");
                    }}
                  >
                    Apply
                  </CustomButton>
                ) : (
                  <CustomButton
                    height=".48rem"
                    onClick={() => {
                      router.push("/tokenStake/trustDeposit");
                    }}
                  >
                    Next
                  </CustomButton>
                )}
              </div>
            </div>

            <div className="ml-[.27rem] w-[1.88rem] h-[2.11rem] rounded-[.16rem] bg-color-bgPage flex flex-col items-center justify-between">
              <div className="mt-[.32rem] flex flex-col items-center mx-[.16rem]">
                <div
                  className={classNames(
                    "text-[.16rem] text-color-text1",
                    robotoBold.className
                  )}
                >
                  DVT Validator
                </div>

                <div
                  className={classNames(
                    "text-[.14rem] text-color-text2 mt-[.14rem] leading-normal text-center "
                  )}
                >
                  Use 3rd Party Server, such as SSV and Obol
                </div>
              </div>

              <div className="self-stretch mb-[.24rem] mx-[.16rem]">
                <CustomButton
                  height=".48rem"
                  type="stroke"
                  onClick={() => {
                    openLink("https://docs.stafi.io/dvt/#ssv-integration");
                  }}
                >
                  Instruction
                </CustomButton>
              </div>
            </div>
          </div>
        </CardContainer>

        <div className="ml-[.85rem]">
          <ChooseTypeGuide />
        </div>
      </div>
    </div>
  );
};

export default ChooseTypePage;
