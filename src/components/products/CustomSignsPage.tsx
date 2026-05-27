import React from 'react';
import { ProductPageTemplate } from '../ProductPageTemplate';
import { SIGNS_DATA } from '../../data/signs';

interface CustomSignsPageProps {
    onNavigateBack: () => void;
}

export const CustomSignsPage: React.FC<CustomSignsPageProps> = ({ onNavigateBack }) => {
  return (
    <ProductPageTemplate 
      data={SIGNS_DATA} 
      onNavigateBack={onNavigateBack} 
      primaryColor="indigo"
    />
  );
};

