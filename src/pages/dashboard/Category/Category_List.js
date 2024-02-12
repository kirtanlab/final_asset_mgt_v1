import { Helmet } from 'react-helmet-async';
import AssetCategoryList from 'src/sections/Category/view/category_details_table';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Assets Category Master</title>
      </Helmet>

      <AssetCategoryList />
    </>
  );
}
