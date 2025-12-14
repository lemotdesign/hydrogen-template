import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {StrongHeader} from '~/components/StrongHeader';
import {StrongFooter} from '~/components/StrongFooter';
import {CartMain} from '~/components/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

export type StrongLayoutProps = {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
  footer: Promise<FooterQuery>;
  header: HeaderQuery;
  isLoggedIn: boolean;
};

export function StrongLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
}: StrongLayoutProps) {
  return (
    <>
      <CartAside cart={cart} />
      <SearchAside />
      <StrongHeader header={header} cart={cart} isLoggedIn={isLoggedIn} />
      <main className="strong-main">{children}</main>
      <StrongFooter />
    </>
  );
}

function CartAside({cart}: {cart: StrongLayoutProps['cart']}) {
  return (
    <Aside id="cart-aside" heading="YOUR CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search products..."
                ref={inputRef}
                type="search"
                className="search-input"
              />
              &nbsp;
              <button type="submit" className="btn btn-primary btn-sm">
                Search
              </button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

