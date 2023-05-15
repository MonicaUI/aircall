import React, {useState}from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {useCallsData} from './client/calldetailAPI.jsx'
import CallDetails from './components/callDetails.jsx';
import Details from './components/details.jsx';
import { useLocation } from 'react-router';
import { Snackbar, Alert } from '@mui/material';

export default function App() {
  const [loading, setLoading] = useState(false);
    const { callInfo, setCallInfo } = useCallsData(setLoading);
  const { pathname } = useLocation();
  const [tabIndex, setTabIndex] = useState(pathname === "/archive" || pathname === "/" ? pathname : false);
    const [snackBarDetails, setSnackBarDetails] = useState({
      open: false,
      message: "",
    });

    const handleSnackBarClose = () => {
      setSnackBarDetails((prev) => {
        return { ...prev, open: false }
      });
    };
  return (

    <div className='container'>
            <Snackbar
        open={snackBarDetails.open}
        autoHideDuration={600}
        onClose={handleSnackBarClose}
        style={{ maxWidth: 300 }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {
          <Alert severity="success" variant="filled" sx={{ width: "100%", borderRadius: "200px" }}>
            {snackBarDetails.message}
          </Alert>}
      </Snackbar>
      <Header {...{ tabIndex, setTabIndex }}/>
        <div className="container-view">
          <Routes>
        <Route path="/" element={<CallDetails {...{
            callInfo,
            setCallInfo,
            loading,
            setLoading,
            setSnackBarDetails
          }}
          />} />
            <Route path="/archive" element={<CallDetails {...{
            callInfo,
            setCallInfo,
            loading,
            setLoading,
            filter: "archive",
            setSnackBarDetails
          }}
          />} />
          <Route path="//call/:id" element={<Details {...{
            callInfo,
            setCallInfo,
            loading,
            setLoading,
            setTabIndex,
            setSnackBarDetails
          }}
          />} />
        </Routes>
        </div>
      <Footer />
    </div>
   );
};

