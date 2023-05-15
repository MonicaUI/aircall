import React from "react";
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import VoicemailIcon from '@mui/icons-material/Voicemail';

const CallData = () => {

  const iconTypeMap = {
    "answered": <CallMadeIcon style={{ "color": "green" }} />,
    "missed": <CallMissedIcon style={{ "color": "red" }} />,
    "voicemail": <VoicemailIcon style={{ "color": "black" }} />
  };

  const secondaryTextPrefixMap = {
    "answered": "for ",
    "missed": "tried to call on ",
    "voicemail": "left voicemail for "
  };

  return {
    iconTypeMap,
    secondaryTextPrefixMap
  };
  
};

export default CallData;
