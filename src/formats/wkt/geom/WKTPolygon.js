/*
 * Copyright (C) 2017 United States Government as represented by the Administrator of the
 * National Aeronautics and Space Administration. All Rights Reserved.
 */
define([
    '../../../shapes/Polygon',
    '../../../shapes/ShapeAttributes',
    '../../../shapes/SurfacePolygon',
    '../WKTElements',
    './WKTObject',
    '../WKTType'
], function (Polygon,
             ShapeAttributes,
             SurfacePolygon,
             WKTElements,
             WKTObject,
             WKTType) {
    /**
     * It represents the polygon.
     * @alias WKTPolygon
     * @augments WKTObject
     * @constructor
     */
    var WKTPolygon = function () {
        WKTObject.call(this, WKTType.SupportedGeometries.POLYGON);

        this._renderable = null;
    };

    WKTPolygon.prototype = Object.create(WKTObject.prototype);

    /**
     * @inheritDoc
     */
    WKTPolygon.prototype.commaWithoutCoordinates = function() {
        this.outerBoundaries = this.coordinates.slice();
        this.coordinates = [];
    };

    /**
     * It returns SurfacePolygon for 2D. It returns Polygon for 3D.
     * @inheritDoc
     * @return {Polygon[]|SurfacePolyline[]}
     */
    WKTPolygon.prototype.shapes = function () {
        if (this._is3d) {
            if(this.outerBoundaries) {
                return [new Polygon([this.outerBoundaries, this.coordinates], new ShapeAttributes(null))];
            } else {
                return [new Polygon(this.coordinates, new ShapeAttributes(null))];
            }
        } else {
            if(this.outerBoundaries) {
                return [new SurfacePolygon([this.outerBoundaries, this.coordinates], new ShapeAttributes(null))];
            } else {
                return [new SurfacePolygon(this.coordinates, new ShapeAttributes(null))];
            }
        }
    };

    WKTElements['POLYGON'] = WKTPolygon;

    return WKTPolygon;
});