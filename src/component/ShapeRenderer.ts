
import Component from "./Component"
import Shape from "../geom/shape/Shape"

export default class ShapeRenderer extends Component {

    shape : Shape;
    color: string;
    outlineColor : string;
    outlineWidth : number;

    constructor(params) {
        super('shaperenderer', "renderer", params);

        if (!this.color) {
            this.color = 'blue';
        }

    }

    onDraw(game, ctx) {

        if (this.color != null) {
            ctx.fillStyle = this.color;
        } else {
            ctx.fillStyle = 'red';
        }

        if (this.shape != null) {
            
            var pos = this.gameObject.drawPos;
            this.shape.draw(ctx, pos, this.gameObject.rotation, game.scaleRatio);
            ctx.fill();

            if (this.outlineWidth != 0 && this.outlineColor) {
                ctx.strokeStyle = this.outlineColor;
                ctx.lineWidth = this.outlineWidth;
                ctx.stroke();
            }
        }

    }

    static fromJSON(json) {
        var obj = (typeof json) == 'string' ? JSON.parse(json) : json;

        return new ShapeRenderer({
            shape: Shape.fromJSON(obj.shape),
            color: obj.color,
            outlineColor: obj.outlineColor,
            outlineWidth: obj.outlineWidth
        });
    }

}

Component.registerComponent('shaperenderer', ShapeRenderer);