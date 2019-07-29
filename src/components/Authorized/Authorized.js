import CheckPermissions from './CheckPermissions';

const Authorized = ({
  children,
  authority,
  noMatch,
  AuthorityRouters,
  currentRouter,
  allRouters,
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  //if(AuthorityRouters.indexOf(currentRouter.substr(13))>-1){
  return CheckPermissions(
    authority,
    childrenRender,
    noMatch,
    AuthorityRouters,
    currentRouter,
    allRouters
  );
  //}else{
  // return noMatch;
  //}
};
export default Authorized;
