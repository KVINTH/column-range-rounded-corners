/**
 * Highcharts plugin for creating individual rounded corners.
 * 
 * Author: Deepak Singh
 * Version: 1.0.0
 * License: MIT License
 * https://stackoverflow.com/a/45560433
 */
(function(factory) {
  "use strict";

  if (typeof module === 'object' && module.exports) {
    module.exports = factory;
  } else {
    factory(Highcharts);
  }
}(function(H) {
    H.wrap(H.seriesTypes.columnrange.prototype, 'translate', function(proceed) {
      const options = this.options;
      const topMargin = options.topMargin || 0;
      const bottomMargin = options.bottomMargin || 0;

      proceed.call(this);

      H.each(this.points, function(point) {
        if (options.borderRadiusTopLeft || options.borderRadiusTopRight || options.borderRadiusBottomRight || options.borderRadiusBottomLeft) {
          const w = point.shapeArgs.width;
          const h = point.shapeArgs.height;
          const x = point.shapeArgs.x;
          const y = point.shapeArgs.y;

          let radiusTopLeft = H.relativeLength(options.borderRadiusTopLeft || 0, w);
          let radiusTopRight = H.relativeLength(options.borderRadiusTopRight || 0, w);
          let radiusBottomRight = H.relativeLength(options.borderRadiusBottomRight || 0, w);
          let radiusBottomLeft = H.relativeLength(options.borderRadiusBottomLeft || 0, w);

          const maxR = Math.min(w, h) / 2

          radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
          radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
          radiusBottomRight = radiusBottomRight > maxR ? maxR : radiusBottomRight;
          radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

          point.dlBox = point.shapeArgs;

          point.shapeType = 'path';
          point.shapeArgs = {
            d: [
              'M', x + radiusTopLeft, y + topMargin,
              'L', x + w - radiusTopRight, y + topMargin,
              'C', x + w - radiusTopRight / 2, y, x + w, y + radiusTopRight / 2, x + w, y + radiusTopRight,
              'L', x + w, y + h - radiusBottomRight,
              'C', x + w, y + h - radiusBottomRight / 2, x + w - radiusBottomRight / 2, y + h, x + w - radiusBottomRight, y + h + bottomMargin,
              'L', x + radiusBottomLeft, y + h + bottomMargin,
              'C', x + radiusBottomLeft / 2, y + h, x, y + h - radiusBottomLeft / 2, x, y + h - radiusBottomLeft,
              'L', x, y + radiusTopLeft,
              'C', x, y + radiusTopLeft / 2, x + radiusTopLeft / 2, y, x + radiusTopLeft, y,
              'Z'
            ]
          };
        }
    });
  });
}));