import { Helmet } from 'react-helmet-async';
import AssetClassesList from 'src/sections/Classifications/view/classifications_details_table';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Assets Category Master</title>
      </Helmet>

      <AssetClassesList />
    </>
  );
}
