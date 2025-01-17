import { Brute, Log } from '@eternaltwin/labrute-core/types';
import { Box, Paper, Tooltip, useMediaQuery } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import BoxBg from '../components/BoxBg.js';
import CellClan from '../components/Cell/CellClan.js';
import CellLog from '../components/Cell/CellLog.js';
import CellMain from '../components/Cell/CellMain.js';
import CellPets from '../components/Cell/CellPets.js';
import CellSkills from '../components/Cell/CellSkills.js';
import CellSocials from '../components/Cell/CellSocials.js';
import CellWeapons from '../components/Cell/CellWeapons.js';
import Link from '../components/Link.js';
import Page from '../components/Page.js';
import Text from '../components/Text.js';
import { useAuth } from '../hooks/useAuth.js';
import { useLanguage } from '../hooks/useLanguage.js';
import useStateAsync from '../hooks/useStateAsync.js';
import advertisings from '../utils/advertisings.js';
import Server from '../utils/Server.js';
import CellMobileView from './mobile/CellMobileView.js';

/**
 * CellView component
 */
const CellView = () => {
  const { t } = useTranslation();
  const { bruteName } = useParams();
  const { user } = useAuth();
  const smallScreen = useMediaQuery('(max-width: 935px)');
  const { language } = useLanguage();
  const navigate = useNavigate();

  const nextTournament = moment().add(1, 'day');

  const [brute, setBrute] = useState<Brute | null>(null);
  const { data: logs } = useStateAsync([], Server.Log.list, bruteName);

  // Fetch brute
  useEffect(() => {
    let isSubscribed = true;
    if (bruteName) {
      Server.Brute.get(bruteName).then((data) => {
        if (isSubscribed) {
          setBrute(data);
        }
      }).catch(() => {
        navigate('/');
      });
    }
    return () => { isSubscribed = false; };
  }, [bruteName, navigate]);

  // Owner?
  const ownsBrute = useMemo(() => !!(user && brute && user.brutes
    && user.brutes.find((b) => b.name === brute.name)), [user, brute]);

  // Randomized advertising
  const advertising = useMemo(() => advertisings[Math.floor(
    Math.random() * (advertisings.length - 1) + 1
  )], []);

  return brute && (smallScreen
    ? (
      <CellMobileView
        brute={brute}
        advertising={advertising}
        logs={logs}
        ownsBrute={ownsBrute}
        language={language}
        nextTournament={nextTournament}
      />
    )
    : (
      <Page title={`${brute.name} ${t('MyBrute')}`} headerUrl={`/${brute.name}/cell`}>
        <Box display="flex" zIndex={1} sx={{ mt: 2 }}>
          {/* BRUTE NAME + SOCIALS */}
          <CellSocials
            brute={brute}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              ml: 3,
              mr: 1,
              flexGrow: 1,
              py: 0,
              px: 1,
              mb: '5px',
            }}
          />
          <Paper sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottom: 'none',
            width: 270,
            bgcolor: 'background.paperLight',
            mb: 0,
          }}
          />
        </Box>
        <Paper sx={{
          borderTopRightRadius: 0,
          bgcolor: 'background.paperLight',
          zIndex: 2,
          position: 'relative',
          mt: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -9,
            right: 0,
            width: 270,
            height: '9px',
            bgcolor: 'background.paperLight',
          },
        }}
        >
          <Box display="flex">
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Box sx={{ width: 315 }}>
                {/* WEAPONS */}
                <Text bold sx={{ textAlign: 'center' }}>{t('weaponsBonuses')}</Text>
                <CellWeapons weapons={brute.data.weapons} />
                {/* SKILLS */}
                <CellSkills brute={brute} />
                {/* PETS */}
                <CellPets pets={brute.data.pets} sx={{ mt: 2 }} />
              </Box>
              {/* MAIN */}
              <CellMain
                sx={{ flexGrow: 1 }}
                brute={brute}
                ownsBrute={ownsBrute}
                language={language}
                nextTournament={nextTournament}
              />
            </Box>
            {/* RIGHT SIDE */}
            <Box sx={{
              position: 'relative',
              width: 270,
              mt: -7,
            }}
            >
              {/* REF LINK */}
              <Tooltip title={t('refLink')}>
                <Paper sx={{
                  p: 1,
                  mr: 0,
                  ml: 4,
                  bgcolor: 'background.paperAccent',
                  textAlign: 'center',
                }}
                >
                  <Text bold>{`${window.location.origin}?ref=${bruteName}`}</Text>
                </Paper>
              </Tooltip>

              {/* CLAN */}
              <CellClan brute={brute} />
              {/* ADVERT */}
              <BoxBg
                src={`/images/${language}/cell/a-bg.gif`}
                sx={{
                  width: 300,
                  height: 205,
                  ml: 0.5,
                }}
              >
                <Tooltip title="TODO">
                  <Link to="" sx={{ width: 200, mx: 4, display: 'inline-block' }}>
                    <Box
                      component="img"
                      src={`/images/redirects/${advertising}`}
                      sx={{ ml: 1, mt: 3.5 }}
                    />
                  </Link>
                </Tooltip>
              </BoxBg>
              {/* LOGS */}
              <Box sx={{ ml: 2, mt: 1 }}>
                {logs.map((log: Log) => <CellLog key={log.id} log={log} />)}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Page>
    ));
};

export default CellView;
