import React, { useEffect } from "react";
import { useParams } from "react-router";
import {useSelectedCall} from "../client/calldetailAPI.jsx";
import {date, time} from "../constants/dateConverter.jsx";
import LoadingSpinner from './spinner.jsx'
import {
  ListItem,
  ListItemText,
  List,
  ListSubheader,
  Divider,
  IconButton
} from "@mui/material";
import {callArchieve}  from "../client/callArchieveAPI.jsx";
import CallMadeIcon from '@mui/icons-material/CallMade';
import EventIcon from '@mui/icons-material/Event';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import BusinessIcon from '@mui/icons-material/Business';
import TimerIcon from '@mui/icons-material/Timer';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import Tippy from "@tippyjs/react";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import "tippy.js/dist/tippy.css";
import { ListItemIcon } from "@mui/material";
import CallData from '../constants/callData.jsx'

function Details({ loading, setLoading, setTabIndex, setCallInfo, setSnackBarDetails, }) {
  const { id } = useParams();
  const { selectedCall, setSelectedCall } = useSelectedCall(id, setLoading);
  const { iconTypeMap, secondaryTextPrefixMap } = CallData();

  useEffect(() => {
    setTabIndex(false);
  }, []);

  const handleDetailsArchiveToggle = () => {
    callArchieve(selectedCall.id, selectedCall.is_archived, setCallInfo, setSnackBarDetails, setSelectedCall)
  };
  const callInfo = () => {
    const archiveIcon = selectedCall.is_archived ? <RestoreIcon /> : <ArchiveIcon />

    return (
      Object.keys(selectedCall).length > 0 &&
      <List subheader={<ListSubheader>Call # {selectedCall.id}</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <ConnectWithoutContactIcon />
          </ListItemIcon>
          <ListItemText primary={selectedCall.from} secondary={secondaryTextPrefixMap[selectedCall.call_type] + selectedCall.to} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            {iconTypeMap[selectedCall.call_type]}
          </ListItemIcon>
          <ListItemText primary="Call Type" secondary={selectedCall.call_type} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Time & Day" secondary={date(selectedCall.created_at) + " " + time(selectedCall.created_at)} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText primary="Duration" secondary={selectedCall.duration + " seconds"} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            {<ArchiveIcon />}
          </ListItemIcon>
          <ListItemText primary="Archived" secondary={selectedCall.is_archived ? "Yes" : "No"} />
          <Tippy content={selectedCall.is_archived ? "Restore" : "Archive"} placement="left" theme="material" arrow={true}>
            <IconButton onClick={handleDetailsArchiveToggle}>
              {archiveIcon}
            </IconButton>
          </Tippy>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            {selectedCall.direction === "inbound" ? <CallReceivedIcon /> : <CallMadeIcon />}
          </ListItemIcon>
          <ListItemText primary="Direction" secondary={selectedCall.direction} />
        </ListItem>
        <Divider />
        <Divider />
        <ListItem>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Via" secondary={selectedCall.via} />
        </ListItem>
        <Divider />
      </List>
    )
  }

  return (
    <React.Fragment>
      {loading ? <LoadingSpinner /> : selectedCall && callInfo()}
    </React.Fragment>
  )
};

export default Details;