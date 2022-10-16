import * as React from 'react';

import { PromotionsList } from '../components/promotions/components/promotions-list.component';

const PromotionsPage: React.FC = React.memo(function PromotionsPage() {
  return (
    <PromotionsList />
  );
});

export default PromotionsPage;
