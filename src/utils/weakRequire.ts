/**
 * Requires a module without having webpack including it in the bundle.
 *
 * @param sourceModule reference to the `module` instance from where this request originated.
 * @param request name of the module to require.
 */
export default function weakRequire(sourceModule: NodeModule, request: string): any {
  return 'require' in sourceModule ? sourceModule.require(request) : {};
}
