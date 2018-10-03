// @flow

export const dump = (obj: any) => {
  log('#####################################################################################');
  log(`## Dumping object ${obj}`);
  log(`## obj class is: ${obj.className()}`);
  log('#####################################################################################');
  log('obj.properties:');
  log(
    obj
      .class()
      .mocha()
      .properties(),
  );
  log('obj.propertiesWithAncestors:');
  log(
    obj
      .class()
      .mocha()
      .propertiesWithAncestors(),
  );
  log('obj.classMethods:');
  log(
    obj
      .class()
      .mocha()
      .classMethods(),
  );
  log('obj.classMethodsWithAncestors:');
  log(
    obj
      .class()
      .mocha()
      .classMethodsWithAncestors(),
  );
  log('obj.instanceMethods:');
  log(
    obj
      .class()
      .mocha()
      .instanceMethods(),
  );
  log('obj.instanceMethodsWithAncestors:');
  log(
    obj
      .class()
      .mocha()
      .instanceMethodsWithAncestors(),
  );
  log('obj.protocols:');
  log(
    obj
      .class()
      .mocha()
      .protocols(),
  );
  log('obj.protocolsWithAncestors:');
  log(
    obj
      .class()
      .mocha()
      .protocolsWithAncestors(),
  );
  log('obj.treeAsDictionary():');
  log(obj.treeAsDictionary());
  return obj;
};

export const timeFunction = (fn: () => any, label: string) => {
  const a = MSMoment.new().timestamp();

  const res = fn();

  const b = MSMoment.new().timestamp();

  const time = (b - a).toFixed(3);

  log(`${label}: ${time}`);

  return res;
};
