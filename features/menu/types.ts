export type MenuCategorySlug =
  | 'ognennoe'
  | 'kholodnye-zakuski'
  | 'supy'
  | 'plov-i-risovoe'
  | 'ryba'
  | 'deserty';

export interface MenuCategory {
  slug: MenuCategorySlug;
  title: string;
  description: string;
}

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface MenuItem {
  id: string;
  categorySlug: MenuCategorySlug;
  name: string;
  description: string;
  price: number;
  weightGrams: number;
  image: string;
  spiceLevel: SpiceLevel;
  tags?: Array<'новинка' | 'хит' | 'на углях'>;
  allergens?: string[];
}
