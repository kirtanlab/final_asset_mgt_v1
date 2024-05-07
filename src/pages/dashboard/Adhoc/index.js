import React from 'react';
import { Helmet } from 'react-helmet-async';
import RequestListAdhoc from 'src/sections/Adhoc/view/request_details_table_adhoc';
// import RequestList from 'src/sections/requests/view/request_details_table';

const index = () => {
  <>
    <Helmet>
      <title> Dashboard: Adhoc Asset Requests</title>
    </Helmet>
    <RequestListAdhoc />
  </>;
};

export default index;
