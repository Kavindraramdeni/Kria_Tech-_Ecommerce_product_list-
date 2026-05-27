import React from 'react';
import { ProductPageTemplate } from '../ProductPageTemplate';
import { WALL_DECOR_DATA } from '../../data/wall-decor';

interface SignatureWallDecorPageProps {
    onNavigateBack: () => void;
}

export const SignatureWallDecorPage: React.FC<SignatureWallDecorPageProps> = ({ onNavigateBack }) => {
  return (
    <ProductPageTemplate 
      data={WALL_DECOR_DATA} 
      onNavigateBack={onNavigateBack} 
      primaryColor="orange"
    />
  );
};
