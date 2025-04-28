import { useRefreshToken } from "../hooks/useRefreshToken";

/**
 * A wrapper around the element rendered by the React Router <Route> component.
 *
 * Useful to trigger code when the route changes.
 */
const RouteWrapper = ({children}: {children: React.ReactNode}) => {
  useRefreshToken();

  return (
    <>{children}</>
  );
}

export default RouteWrapper;
