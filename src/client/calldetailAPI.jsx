import { useState, useEffect } from "react";
import axios from "axios";

export const useCallsData = ( setLoading) => {
  const [callInfo, setCallInfo] = useState([]);

  useEffect(() => {

    const getAllCallsData = async () => {
      try {
        setLoading((prev) => !prev);
        const { data } = await axios.get("https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities");
        const callInfo = [...data];
        setCallInfo(callInfo);
        setLoading((prev) => !prev);
      } catch (err) {
        console.log(err.message);
      };

    };

    getAllCallsData()

  }, []);

  return { callInfo, setCallInfo }
  
};


  export const useSelectedCall = (id, setLoading) => {
    const [selectedCall, setSelectedCall] = useState({});

    useEffect(() => {
      const fetchCallDetails = async () => {
        try {
          setLoading((prev) => !prev);
          const endPoint = `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`;
          const { data } = await axios.get(endPoint);
          setSelectedCall(data);
          await new Promise((resolve) => setTimeout(resolve, 400));
          setLoading((prev) => !prev);
        } catch (err) {
          console.log(err.messsage);
        };
      };

      fetchCallDetails();
    }, []);

    return { selectedCall, setSelectedCall };
  };
