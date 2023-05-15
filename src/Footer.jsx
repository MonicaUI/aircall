import React from "react";
import "./css/Footer.css";
import PhoneIcon from '@mui/icons-material/Phone';
import ContactsIcon from '@mui/icons-material/Contacts';
import DialpadIcon from '@mui/icons-material/Dialpad';
import SettingsIcon from '@mui/icons-material/Settings';
import AdjustIcon from '@mui/icons-material/Adjust';

const Footer = () => {
  return (
    <footer>
      <PhoneIcon/>
      <ContactsIcon />
      <DialpadIcon />
      <SettingsIcon />
      <AdjustIcon />
    </footer>
  );
};

export default Footer;