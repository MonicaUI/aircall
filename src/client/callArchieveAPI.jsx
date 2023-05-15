import axios from "axios";
require("babel-polyfill");

export const allCallArchieve = async (setLoading, callInfo, setCallInfo, archiveAll) => {
if(archiveAll) {
  try {
    setLoading((prev) => !prev);

    await Promise.all(callInfo.map(async (call) => {
      const endPoint = `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`;
      return await axios.patch(endPoint, { is_archived: archiveAll });
    }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCallInfo((prev) => {
      return prev.map((call) => {
        return { ...call, is_archived: archiveAll };
      });
    });

    setLoading((prev) => !prev);

  } catch (err) {
    console.log(err.message);
  };
} else {
  try {
    setLoading((prev) => !prev);

    await Promise.all(callInfo.map(async (call) => {
      const endPoint = `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/reset`;
      return await axios.patch(endPoint);
    }));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setCallInfo((prev) => {
      return prev.map((call) => {
        return { ...call, is_archived: archiveAll };
      });
    });

    setLoading((prev) => !prev);

  } catch (err) {
    console.log(err.message);
  };
}
  
 

};

export const callArchieve = (id, is_archived, setCalls, setSnackBarDetails, setSelectedCall) => {
  const endPoint = `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`;

  axios.patch(endPoint, {
    is_archived: !is_archived
  })
    .catch((err) => {
      console.log(err.message);
    });

  setCalls((prev) => {
    const selectedCall = prev.find((call) => call.id === id);
    const otherCalls = prev.filter((call) => call.id !== selectedCall.id);
    const selectedCallNew = { ...selectedCall, is_archived: !is_archived };
    const newCallsData = [...otherCalls, selectedCallNew];
    return newCallsData;
  });

  if (setSelectedCall) {
    setSelectedCall((prev) => {
      prev.is_archived = !prev.is_archived;
      return prev;
    });
  };

  setSnackBarDetails({
    open: true,
    message: `Call# ${id} successfuly ${is_archived ? "restored" : "archived"}`
  });

};