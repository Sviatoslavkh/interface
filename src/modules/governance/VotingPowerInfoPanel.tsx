import { Trans } from '@lingui/macro';
import { Box, Button, Divider, Typography } from '@mui/material';
import { AvatarSize } from 'src/components/Avatar';
import { ConnectedUserAvatar } from 'src/components/ConnectedUserAvatar';
import { ConnectedUserNameText } from 'src/components/ConnectedUserName';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Row } from 'src/components/primitives/Row';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { useVotingPower } from 'src/hooks/governance-data-provider/useVotingPower';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useRootStore } from 'src/store/root';

export function VotingPowerInfoPanel() {
  const { currentAccount } = useWeb3Context();
  const powers = useVotingPower();
  const { openGovDelegation } = useModalContext();
  const defaultDomain = useRootStore((store) => store.defaultDomain);
  // TODO: if not logged in & loading, show some placeholder
  return (
    <>
      <Box sx={{ px: 6, py: 6 }}>
        <Typography variant="h3" sx={{ height: '36px', display: 'flex', alignItems: 'center' }}>
          <Trans>Your info</Trans>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ConnectedUserAvatar avatarProps={{ size: AvatarSize.LG }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {defaultDomain?.name ? (
              <>
                <ConnectedUserNameText />
                <ConnectedUserNameText />
              </>
            ) : (
              <ConnectedUserNameText />
            )}
          </Box>
        </Box>
        {currentAccount && (
          <>
            <Row
              sx={{ py: 2 }}
              caption={
                <>
                  <Typography variant="description">
                    <Trans>Voting power</Trans>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    (AAVE + stkAAVE)
                  </Typography>
                </>
              }
            >
              <FormattedNumber
                value={powers?.votingPower || 0}
                variant="main16"
                visibleDecimals={2}
              />
            </Row>
            <Row
              sx={{ py: 2 }}
              caption={
                <>
                  <Typography variant="description">
                    <Trans>Proposition power</Trans>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    (AAVE + stkAAVE)
                  </Typography>
                </>
              }
            >
              <FormattedNumber
                value={powers?.propositionPower || 0}
                variant="main16"
                visibleDecimals={2}
              />
            </Row>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ px: 6, pt: 4, pb: 6, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Delegate your power</Typography>
        </Box>
        {currentAccount ? (
          <Button
            variant="contained"
            disabled={
              powers?.votingPower === '0' &&
              powers?.propositionPower === '0' &&
              powers?.aaveVotingDelegatee === '' &&
              powers?.aavePropositionDelegatee === '' &&
              powers?.stkAavePropositionDelegatee === '' &&
              powers?.stkAaveVotingDelegatee === ''
            }
            onClick={() => openGovDelegation()}
          >
            <Trans>Delegate</Trans>
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </Box>
    </>
  );
}
