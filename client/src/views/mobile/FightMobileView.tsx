import { Fight } from '@eternaltwin/labrute-core/types';
import { Box, Grid, Link, Paper, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FightComponent from '../../components/Arena/FightComponent.js';
import Page from '../../components/Page.js';
import Text from '../../components/Text.js';

export interface FightMobileViewProps {
  bruteName: string | undefined;
  adverts: string[];
  fight: Fight | null;
}

const FightMobileView = ({
  bruteName,
  adverts,
  fight,
}: FightMobileViewProps) => {
  const { t } = useTranslation();

  return (
    <Page
      title={`${bruteName || ''} ${t('MyBrute')}`}
      headerUrl={`/${bruteName}/cell`}
    >
      <Paper sx={{ textAlign: 'center' }}>
        {/* FIGHT */}
        <FightComponent fight={fight} />

        {/* ADVERTS */}
        <Text color="text.primary" textAlign="center" typo="Poplar" upperCase sx={{ mt: 2 }}>{t('fight.discoverGames')}</Text>
        <Grid container spacing={2}>
          {adverts.map((advert) => (
            <Grid item key={advert} xs={12} sm={6}>
              <Tooltip title="TODO">
                <Link href="" sx={{ width: 200, display: 'inline-block' }}>
                  <Box
                    component="img"
                    src={`/images/redirects/${advert}`}
                    sx={{ width: 1, border: 2, borderColor: 'common.white' }}
                  />
                </Link>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Page>
  );
};

export default FightMobileView;
