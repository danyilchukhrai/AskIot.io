// containers/vendor-leads/index.tsx
import React from 'react';
import { useUserTypeContext } from '@/providers/UserTypeProvider';

const VendorLeadsDetail = () => {
  const { currentUserType } = useUserTypeContext();

  // Render different content based on the current user type
  if (currentUserType !== 'provider') {
    // Redirect or show an error message
    return <div>You must be a provider to view this page.</div>;
  }

  return (
    <div>
      {/* Your Leads page content here */}
    </div>
  );
};

export default VendorLeadsDetail;