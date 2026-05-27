import React from 'react';
import { ProductPageTemplate } from '../ProductPageTemplate';
import { EDUCATIONAL_DATA } from '../../data/educational';

interface EducationalKidsPageProps {
    onNavigateBack: () => void;
}

export const EducationalKidsPage: React.FC<EducationalKidsPageProps> = ({ onNavigateBack }) => {
  return (
    <ProductPageTemplate 
      data={EDUCATIONAL_DATA} 
      onNavigateBack={onNavigateBack} 
      primaryColor="orange"
    />
  );
};

;