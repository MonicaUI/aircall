import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {time} from '../constants/dateConverter.jsx';
import CallData from '../constants/callData.jsx';
import { Link } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { ListItemIcon } from "@mui/material";

function CallDetailInfo({ call }) {
   
  const { id, call_type, from, to } = call;
  const { iconTypeMap, secondaryTextPrefixMap } = CallData();

  return (
    <div id = "test">
    {call_type !== undefined ? ( 
    <ListItem disablePadding 
      secondaryAction={time(call.created_at)}
    >
      <ListItemButton disablePadding sx={{ border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius: "10px"}} component={Link} to={`/call/${id}`}>
      
       <ListItemIcon>
          {iconTypeMap[call_type]}
        </ListItemIcon>
        
         <ListItemText
          primary={from}
          secondary={secondaryTextPrefixMap[call_type] + to}
        />
      </ListItemButton>
   
    </ListItem> ) : 
    <ListItem sx={{ padding: "20px",justifyContent: "space-around"}}>No Number</ListItem> }
    </div>
  )

};

export default CallDetailInfo;