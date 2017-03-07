/* @flow */

// eslint-disable-next-line import/prefer-default-export
export const dump = (obj: any) => {
  log('#####################################################################################');
  log(`## Dumping object ${obj}`);
  log(`## obj class is: ${obj.className()}`);
  log('#####################################################################################');
  log('obj.properties:');
  log(obj.class().mocha().properties());
  log('obj.propertiesWithAncestors:');
  log(obj.class().mocha().propertiesWithAncestors());
  log('obj.classMethods:');
  log(obj.class().mocha().classMethods());
  log('obj.classMethodsWithAncestors:');
  log(obj.class().mocha().classMethodsWithAncestors());
  log('obj.instanceMethods:');
  log(obj.class().mocha().instanceMethods());
  log('obj.instanceMethodsWithAncestors:');
  log(obj.class().mocha().instanceMethodsWithAncestors());
  log('obj.protocols:');
  log(obj.class().mocha().protocols());
  log('obj.protocolsWithAncestors:');
  log(obj.class().mocha().protocolsWithAncestors());
  log('obj.treeAsDictionary():');
  log(obj.treeAsDictionary());
  return obj;
};

export const timeFunction = (fn: () => any, label: string) => {
  const methodStart = NSDate.date();

  const res = fn();

  const methodFinish = NSDate.date();
  const executionTime = methodFinish.timeIntervalSinceDate(methodStart);

  log(`${label}: ${executionTime.toFixed(3)}`);

  return res;
};
