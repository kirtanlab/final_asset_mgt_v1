import React from 'react';
import { Helmet } from 'react-helmet-async';
import LocationList from 'src/sections/Locations/view/location_details_table';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Location Master</title>
      </Helmet>

      <LocationList />
    </>
  );
}
