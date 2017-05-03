import {
  makeRectPath,
  makeShapePath,
  makeRectShapeLayer,
  makeShapeGroup,
} from '../../src/jsonUtils/shapeLayers';

xdescribe('makeHorizontalPath');
xdescribe('makeVerticalPath');
describe('makeRectPath', () => {
  it('is correctly constructed', () => {
    const path = makeRectPath([10, 20, 30, 40]);

    expect(path.points[0]).toHaveProperty('cornerRadius', 10);
    expect(path.points[1]).toHaveProperty('cornerRadius', 20);
    expect(path.points[2]).toHaveProperty('cornerRadius', 30);
    expect(path.points[3]).toHaveProperty('cornerRadius', 40);
  });
});

describe('makeShapePath', () => {
  it('is correctly constructed', () => {
    const frame = { foo: 'bar' };
    const path = { baz: 'qux' };
    const shapePath = makeShapePath(frame, path);

    expect(shapePath).toHaveProperty('frame', frame);
    expect(shapePath).toHaveProperty('path', path);
  });
});

describe('makeRectShapeLayer', () => {
  it('is correctly constructed', () => {
    const shapeLayer = makeRectShapeLayer(100, 200, 300, 400, [10, 20, 30, 40]);

    expect(shapeLayer).toHaveProperty('frame.x', 100);
    expect(shapeLayer).toHaveProperty('frame.y', 200);
    expect(shapeLayer).toHaveProperty('frame.width', 300);
    expect(shapeLayer).toHaveProperty('frame.height', 400);
    expect(shapeLayer).toHaveProperty('fixedRadius', 10);
  });
});

describe('makeShapeGroup', () => {
  it('is correctly constructed', () => {
    const frame = { foo: 'bar' };
    const layers = [{ baz: 'qux' }];
    const fills = ['foo', 'bar'];

    const shapeGroup = makeShapeGroup(frame, layers, fills);

    expect(shapeGroup).toHaveProperty('frame', frame);
    expect(shapeGroup).toHaveProperty('layers', layers);
    expect(shapeGroup).toHaveProperty('style.fills', fills);
  });
});
