import React from 'react';
import { Helmet } from 'react-helmet-async';
import RequestList from 'src/sections/requests/view/request_details_table';

const index = () => {
  console.log('');
  return (
    <>
      <Helmet>
        <title> Dashboard: Asset Requests</title>
      </Helmet>
      <RequestList />
    </>
  );
};

export default index;
