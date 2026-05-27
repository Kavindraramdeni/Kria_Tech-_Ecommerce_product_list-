import React from 'react';
import { ProductPageTemplate } from '../ProductPageTemplate';
import { GIFTS_DATA } from '../../data/gifts';

interface PersonalizedGiftsPageProps {
    onNavigateBack: () => void;
}

export const PersonalizedGiftsPage: React.FC<PersonalizedGiftsPageProps> = ({ onNavigateBack }) => {
  return (
    <ProductPageTemplate 
      data={GIFTS_DATA} 
      onNavigateBack={onNavigateBack} 
      primaryColor="blue"
    />
  );
};

