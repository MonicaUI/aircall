import React from "react";
require("babel-polyfill");
import { List, Divider, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import CallDetailInfo from "./callDetailInfo.jsx";
import {date} from '../constants/dateConverter.jsx';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';
import { ListItemText } from "@mui/material";
import { allCallArchieve } from "../client/callArchieveAPI.jsx";
import LoadingSpinner from "./spinner.jsx";
export const filterByArchived = (callInfo) => {
    return callInfo.filter((call) => {
      return call.is_archived
    });
  };
  
  export const filterByNotArchived = (callInfo) => {
    return callInfo.filter((call) => {
      return !call.is_archived
    });
  };
  
  export const filterByType = () => {
  
  };
  
  
  export const filterByDirection = () => {
  
  };

const useCallsFilter = (callInfo, filter) => {
  if (!filter) return filterByNotArchived(callInfo);
  return filterByArchived(callInfo);
};

function CallDetails({ callInfo, setCallInfo, filter, loading, setLoading, setTabIndex, setSnackBarDetails }) {
  const filteredCalls = useCallsFilter(callInfo, filter);
  const generateCallsList = () => {

    return filteredCalls.map((call) => {
      return (
        <div key={call.id} >
          <Divider style={{ padding: "20px"}}>{date(call.created_at)}</Divider>
          <CallDetailInfo {...{ call, setCallInfo, setTabIndex, setSnackBarDetails }} />
        </div>
      );
    });
  };

  const handleAllCalls = async () => {
    const archiveAll = filter ? false : true;
    await allCallArchieve(setLoading, callInfo, setCallInfo, archiveAll);
  };

  const allArchiveToggleBtn = () => {

    return (
      <React.Fragment>
        {filteredCalls.length > 0 ? < List >
          < ListItem>
            <ListItemButton
              onClick={handleAllCalls}
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(0, 0, 0, 0.12)"
              }}>
              <ListItemIcon>{filter ? <RestoreIcon /> : <ArchiveIcon />}</ListItemIcon >
              <ListItemText
                primary={filter ? "Restore all calls" : "Archive all calls"}
              />
            </ListItemButton >
          </ListItem >
          {generateCallsList()}
        </List > : <div style={{margin: "50px", textAlign: "center"}}>No archieved calls </div>}
      </React.Fragment >
    );

  };

  return (
    <React.Fragment>
      {!loading ? allArchiveToggleBtn() :
        <LoadingSpinner />
         }
    </React.Fragment >
  )

};

export default CallDetails;