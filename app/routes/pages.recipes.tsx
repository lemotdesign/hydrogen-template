import {type MetaFunction} from '@remix-run/react';
import {Link} from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    {title: 'Strong | Taro Recipes'},
    {
      name: 'description',
      content: 'Discover delicious recipes using Strong Taro products - from protein smoothies to gluten-free baking and traditional Samoan dishes.',
    },
  ];
};

// Sample recipes data - would come from CMS in production
const recipes = [
  {
    id: '1',
    title: 'Tropical Taro Protein Smoothie',
    description: 'A refreshing post-workout smoothie packed with tropical flavors and plant-based protein.',
    category: 'Smoothies',
    difficulty: 'Easy',
    prepTime: '5 min',
    servings: 1,
    product: 'Taro Protein',
    featured: true,
  },
  {
    id: '2',
    title: 'Gluten-Free Taro Banana Bread',
    description: 'Moist, delicious banana bread made with our taro flour for a nutritious twist on a classic.',
    category: 'Baking',
    difficulty: 'Medium',
    prepTime: '45 min',
    servings: 8,
    product: 'Taro Flour',
    featured: true,
  },
  {
    id: '3',
    title: 'Classic Taro Milk Tea',
    description: 'Create café-quality taro milk tea at home with our premium taro milk tea powder.',
    category: 'Beverages',
    difficulty: 'Easy',
    prepTime: '10 min',
    servings: 1,
    product: 'Taro Milk Tea',
    featured: true,
  },
  {
    id: '4',
    title: 'Taro Protein Energy Balls',
    description: 'No-bake energy balls perfect for pre-workout fuel or healthy snacking.',
    category: 'Snacks',
    difficulty: 'Easy',
    prepTime: '15 min',
    servings: 12,
    product: 'Taro Protein',
  },
  {
    id: '5',
    title: 'Taro Flour Pancakes',
    description: 'Fluffy, gluten-free pancakes that are perfect for a healthy weekend breakfast.',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '20 min',
    servings: 4,
    product: 'Taro Flour',
  },
  {
    id: '6',
    title: 'Iced Taro Latte',
    description: 'A creamy, iced version of our classic taro milk tea for hot summer days.',
    category: 'Beverages',
    difficulty: 'Easy',
    prepTime: '5 min',
    servings: 1,
    product: 'Taro Milk Tea',
  },
  {
    id: '7',
    title: 'Taro Protein Overnight Oats',
    description: 'Prep the night before for a quick, protein-packed breakfast on busy mornings.',
    category: 'Breakfast',
    difficulty: 'Easy',
    prepTime: '5 min',
    servings: 1,
    product: 'Taro Protein',
  },
  {
    id: '8',
    title: 'Traditional Samoan Taro Cakes',
    description: 'A modern take on a traditional Samoan recipe using our premium taro flour.',
    category: 'Traditional',
    difficulty: 'Medium',
    prepTime: '30 min',
    servings: 6,
    product: 'Taro Flour',
  },
];

const categories = ['All', 'Smoothies', 'Baking', 'Beverages', 'Snacks', 'Breakfast', 'Traditional'];

export default function RecipesPage() {
  const featuredRecipes = recipes.filter(r => r.featured);
  const allRecipes = recipes;

  return (
    <>
      <div className="recipes-page">
        {/* Hero Section */}
        <section className="recipes-hero">
          <div className="container">
            <span className="recipes-hero-label">Recipes</span>
            <h1 className="recipes-hero-title">
              Cook With <span className="highlight-yellow">Strong</span>
            </h1>
            <p className="recipes-hero-description">
              Discover delicious ways to incorporate our Samoan Taro products into 
              your daily meals. From quick smoothies to traditional recipes.
            </p>
          </div>
        </section>
        
        {/* Featured Recipes */}
        <section className="recipes-featured">
          <div className="container">
            <h2 className="section-title">Featured Recipes</h2>
            <div className="featured-recipes-grid">
              {featuredRecipes.map((recipe) => (
                <FeaturedRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Category Filter */}
        <section className="recipes-browse">
          <div className="container">
            <h2 className="section-title">Browse Recipes</h2>
            <div className="category-filters">
              {categories.map((category) => (
                <button 
                  key={category}
                  className={`category-filter ${category === 'All' ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Recipes Grid */}
            <div className="recipes-grid">
              {allRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Products CTA */}
        <section className="recipes-cta">
          <div className="container">
            <div className="recipes-cta-content">
              <h2>Get Started With Strong Products</h2>
              <p>
                All our recipes use Strong Taro products. Shop our collection and 
                start cooking today.
              </p>
              <div className="recipes-products-preview">
                <Link to="/products/taro-protein" className="product-preview-item">
                  <div className="product-preview-icon"><ProteinIcon /></div>
                  <span>Taro Protein</span>
                </Link>
                <Link to="/products/taro-flour" className="product-preview-item">
                  <div className="product-preview-icon"><WheatIcon /></div>
                  <span>Taro Flour</span>
                </Link>
                <Link to="/products/taro-milk-tea" className="product-preview-item">
                  <div className="product-preview-icon"><CupIcon /></div>
                  <span>Taro Milk Tea</span>
                </Link>
              </div>
              <Link to="/collections/all" className="btn btn-primary btn-lg">
                Shop All Products
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <style>{recipesPageStyles}</style>
    </>
  );
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  prepTime: string;
  servings: number;
  product: string;
  featured?: boolean;
}

function FeaturedRecipeCard({recipe}: {recipe: Recipe}) {
  return (
    <Link to={`/blogs/recipes/${recipe.id}`} className="featured-recipe-card">
      <div className="featured-recipe-image">
        <div className="featured-recipe-placeholder">
          <RecipeIcon />
        </div>
        <span className="recipe-category-badge">{recipe.category}</span>
      </div>
      <div className="featured-recipe-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-meta">
          <span><ClockIcon /> {recipe.prepTime}</span>
          <span><ServingsIcon /> {recipe.servings} servings</span>
          <span><DifficultyIcon /> {recipe.difficulty}</span>
        </div>
        <div className="recipe-product-tag">
          Uses: {recipe.product}
        </div>
      </div>
    </Link>
  );
}

function RecipeCard({recipe}: {recipe: Recipe}) {
  return (
    <Link to={`/blogs/recipes/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-image">
        <div className="recipe-card-placeholder">
          <RecipeIcon />
        </div>
        <span className="recipe-category-badge">{recipe.category}</span>
      </div>
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-meta">
          <span><ClockIcon /> {recipe.prepTime}</span>
          <span><DifficultyIcon /> {recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  );
}

// Icons
function RecipeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" x2="18" y1="17" y2="17"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ServingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function ProteinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function WheatIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22 16 8"/>
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/>
      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/>
      <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
      <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
      <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"/>
    </svg>
  );
}

function CupIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
      <line x1="6" x2="6" y1="2" y2="4"/>
      <line x1="10" x2="10" y1="2" y2="4"/>
      <line x1="14" x2="14" y1="2" y2="4"/>
    </svg>
  );
}

const recipesPageStyles = `
  .recipes-page {
    background: var(--strong-cream);
  }
  
  .section-title {
    font-size: var(--text-2xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-8);
  }
  
  @media (min-width: 768px) {
    .section-title {
      font-size: var(--text-3xl);
    }
  }
  
  /* Hero */
  .recipes-hero {
    padding: var(--space-16) 0 var(--space-12);
    text-align: center;
  }
  
  .recipes-hero-label {
    display: inline-block;
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--strong-secondary);
    margin-bottom: var(--space-4);
  }
  
  .recipes-hero-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-black);
    color: var(--strong-black);
    margin: 0 0 var(--space-4);
    line-height: 1.2;
  }
  
  @media (min-width: 768px) {
    .recipes-hero-title {
      font-size: var(--text-5xl);
    }
  }
  
  .recipes-hero-description {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }
  
  /* Featured Recipes */
  .recipes-featured {
    padding: 0 0 var(--space-16);
  }
  
  .featured-recipes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .featured-recipes-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .featured-recipe-card {
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-base);
    display: flex;
    flex-direction: column;
  }
  
  .featured-recipe-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
  
  .featured-recipe-image {
    aspect-ratio: 16/10;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-secondary) 100%);
  }
  
  .featured-recipe-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    opacity: 0.5;
  }
  
  .recipe-category-badge {
    position: absolute;
    top: var(--space-3);
    left: var(--space-3);
    background: var(--strong-primary);
    color: var(--strong-black);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    text-transform: uppercase;
  }
  
  .featured-recipe-content {
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    flex-grow: 1;
  }
  
  .featured-recipe-content h3 {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    margin: 0;
    line-height: 1.3;
  }
  
  .featured-recipe-content p {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.5;
    flex-grow: 1;
  }
  
  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }
  
  .recipe-meta span {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }
  
  .recipe-product-tag {
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: var(--strong-secondary);
    padding-top: var(--space-3);
    border-top: 1px solid var(--strong-cream);
  }
  
  /* Browse Recipes */
  .recipes-browse {
    padding: var(--space-16) 0;
    background: var(--strong-white);
  }
  
  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-8);
  }
  
  .category-filter {
    padding: var(--space-2) var(--space-4);
    border: 2px solid var(--strong-gray-light);
    border-radius: var(--radius-full);
    background: transparent;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all var(--transition-base);
  }
  
  .category-filter:hover {
    border-color: var(--strong-black);
    color: var(--strong-black);
  }
  
  .category-filter.active {
    border-color: var(--strong-black);
    background: var(--strong-black);
    color: var(--strong-white);
  }
  
  .recipes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  @media (min-width: 768px) {
    .recipes-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .recipes-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .recipe-card {
    background: var(--strong-cream);
    border-radius: var(--radius-xl);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all var(--transition-base);
  }
  
  .recipe-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .recipe-card-image {
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--strong-leaf) 0%, var(--strong-charcoal) 100%);
  }
  
  .recipe-card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--strong-white);
    opacity: 0.3;
  }
  
  .recipe-card-content {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .recipe-card-content h3 {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    margin: 0;
    line-height: 1.3;
  }
  
  .recipe-card-content p {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* CTA */
  .recipes-cta {
    padding: var(--space-16) 0;
  }
  
  .recipes-cta-content {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }
  
  .recipes-cta h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-black);
    margin: 0 0 var(--space-3);
  }
  
  .recipes-cta > .recipes-cta-content > p {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
    margin: 0 0 var(--space-8);
  }
  
  .recipes-products-preview {
    display: flex;
    justify-content: center;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
  }
  
  .product-preview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    text-decoration: none;
    color: inherit;
    transition: transform var(--transition-base);
  }
  
  .product-preview-item:hover {
    transform: translateY(-4px);
  }
  
  .product-preview-icon {
    width: 80px;
    height: 80px;
    background: var(--strong-white);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-3xl);
    box-shadow: var(--shadow-md);
  }
  
  .product-preview-item span {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
  }
`;

