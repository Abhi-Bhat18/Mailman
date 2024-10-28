import { PermissionsMap, PermissionResource, PermissionAction } from '@/lib/features/auth/authSlice'
const isUserAuthorized = (
  permissions: PermissionsMap,
  feature: PermissionResource,
  action: PermissionAction
) => {
  const featurePermissions = permissions[feature];
  console.log("Feature Permission", featurePermissions);
  if (
    featurePermissions.includes(action) ||
    featurePermissions.includes("manage")
  ) {
    return true;
  } else {
    return false;
  }
};

export default isUserAuthorized;
