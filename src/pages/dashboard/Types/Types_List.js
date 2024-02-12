import { Helmet } from 'react-helmet-async';

import AssetTypeList from 'src/sections/Types/view/types_details_table';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Assets Types Master</title>
      </Helmet>

      <AssetTypeList />
    </>
  );
}
