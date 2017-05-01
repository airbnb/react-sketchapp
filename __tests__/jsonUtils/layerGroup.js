import layerGroup from '../../src/jsonUtils/layerGroup';

describe('layer group', () => {
  it('is correctly constructed', () => {
    const group = layerGroup(100, 200, 300, 400, 0.5);

    expect(group).toHaveProperty('frame.x', 100);
    expect(group).toHaveProperty('frame.y', 200);
    expect(group).toHaveProperty('frame.width', 300);
    expect(group).toHaveProperty('frame.height', 400);
    expect(group).toHaveProperty('style.contextSettings.opacity', 0.5);
  });
});
