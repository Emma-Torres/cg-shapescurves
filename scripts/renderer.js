class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle({x: 100, y: 100}, {x:700 , y: 500}, [255,0, 0, 255], ctx);
        
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle({x: 400, y: 400}, 100, [255, 0, 255, 255], ctx);

    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve({x: 100, y: 100}, {x: 175, y: 400}, {x: 450, y: 350}, {x: 400, y:100}, [0,0,255,255], ctx);

    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //draw E
        this.drawLine({x: 50, y: 100}, {x:50, y: 400}, [0, 0, 255, 255], ctx);
        this.drawLine({x: 50, y: 100}, {x:175, y: 100}, [0, 0, 255, 255], ctx);
        this.drawLine({x: 50, y: 400}, {x:175, y: 400}, [0, 0, 255, 255], ctx);
        this.drawLine({x: 50, y: 250}, {x:175, y: 250}, [0, 0, 255, 255], ctx);

        //draw m
        this.drawLine({x: 225, y: 100}, {x:225, y: 250}, [0, 0, 255, 255], ctx);
        this.drawBezierCurve({x: 225, y: 100}, {x: 225, y: 400}, {x: 300, y: 400}, {x: 300, y:100}, [0,0,255,255], ctx);
        this.drawBezierCurve({x: 300, y: 100}, {x: 300, y: 400}, {x: 375, y: 400}, {x: 375, y:100}, [0,0,255,255], ctx);
        this.drawLine({x: 375, y: 100}, {x:375, y: 250}, [0, 0, 255, 255], ctx);

        //draw m
        this.drawLine({x: 400, y: 100}, {x:400, y: 250}, [0, 0, 255, 255], ctx);
        this.drawBezierCurve({x: 400, y: 100}, {x: 400, y: 400}, {x: 475, y: 400}, {x: 475, y:100}, [0,0,255,255], ctx);
        this.drawBezierCurve({x: 475, y: 100}, {x: 475, y: 400}, {x: 550, y: 400}, {x: 550, y:100}, [0,0,255,255], ctx);
        this.drawLine({x: 550, y: 100}, {x:550, y: 250}, [0, 0, 255, 255], ctx);

        //draw a
        this.drawCircle({x: 650, y: 175}, 70, [0, 0, 255, 255], ctx);
        this.drawLine({x:719, y: 100}, {x:719, y: 200}, [0, 0, 255, 255], ctx);
        this.drawBezierCurve({x: 723, y: 200}, {x: 700, y: 180}, {x: 785, y: 400}, {x: 600, y: 307}, [0,0,255,255], ctx);

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let left_bottom_x =  left_bottom.x;
        let left_bottom_y =  left_bottom.y;
        let right_top_x =  right_top.x;
        let right_top_y =  right_top.y;

       if(this.show_points == true){
           this.drawCircle(left_bottom, 2.5, [0, 0, 0, 255], ctx);
           this.drawCircle({x: left_bottom_x, y: right_top_y}, 2.5, [0, 0, 0, 255], ctx);
           this.drawCircle(right_top, 2.5, [0, 0, 0, 255], ctx);
           this.drawCircle({x: right_top_x, y: left_bottom_y}, 2.5, [0, 0, 0, 255], ctx);
       }

        //console.log(this.show_points);

        this.drawLine(left_bottom, {x: left_bottom_x, y: right_top_y}, color, ctx);
        this.drawLine({x: left_bottom_x, y: right_top_y}, right_top, color, ctx);
        this.drawLine(right_top, {x: right_top_x, y: left_bottom_y}, color, ctx);
        this.drawLine({x: right_top_x, y: left_bottom_y}, left_bottom, color, ctx);

    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let deg = 2 * (Math.PI) / this.num_curve_sections;
        let degree = 0;
        let x = center.x + radius * Math.cos(degree);
        let y = center.y + radius * Math.sin(degree);

        let next_deg = degree + deg;

        let next_x = center.x + radius * Math.cos(next_deg);
        let next_y = center.y + radius * Math.sin(next_deg);

        //loop through number of curve sections
        for(let i = 0; i<this.num_curve_sections; i++){
            if(this.show_points == true){
                this.drawPoint({x: x, y: y}, 3, [0,0,0,255], ctx);
            }

            this.drawLine({x: x, y: y}, {x: next_x, y: next_y}, color, ctx);

            degree = degree + deg;
            x = next_x;
            y = next_y;

            next_deg = next_deg + deg;
            next_x = center.x + radius * Math.cos(next_deg);
            next_y = center.y + radius * Math.sin(next_deg);
        }

        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let t = 0;
        let x = Math.pow(1-t, 3) * pt0.x + 3 * Math.pow(1-t, 2) * t * pt1.x + 3 * (1-t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
        let y = Math.pow(1-t, 3) * pt0.y + 3 * Math.pow(1-t, 2) * t * pt1.y + 3 * (1-t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;

        let t_inc = 1 / this.num_curve_sections;
        let next_t = t + t_inc;
        let next_x = Math.pow(1-next_t, 3) * pt0.x + 3 * Math.pow(1-next_t, 2) * next_t * pt1.x + 3 * (1-next_t) * Math.pow(next_t, 2) * pt2.x + Math.pow(next_t, 3) * pt3.x;
        let next_y = Math.pow(1-next_t, 3) * pt0.y + 3 * Math.pow(1-next_t, 2) * next_t * pt1.y + 3 * (1-next_t) * Math.pow(next_t, 2) * pt2.y + Math.pow(next_t, 3) * pt3.y;

        for(let i = 0; i< this.num_curve_sections; i++){
            if(this.show_points == true){
                this.drawPoint({x: x, y: y}, 3, [0,0,0,255], ctx);
                this.drawRectangle({x: pt0.x, y: pt0.y}, {x: pt0.x+2.5, y: pt0.y+2.5}, [255, 255,0,255], ctx);
                this.drawRectangle({x: pt1.x, y: pt1.y}, {x: pt1.x+2.5, y: pt1.y+2.5}, [255, 255,0,255], ctx);
                this.drawRectangle({x: pt2.x, y: pt2.y}, {x: pt2.x+2.5, y: pt2.y+2.5}, [255, 255,0,255], ctx);
                this.drawRectangle({x: pt3.x, y: pt3.y}, {x: pt3.x+2.5, y: pt3.y+2.5}, [255, 255,0,255], ctx);
            }

            this.drawLine({x: x, y: y}, {x: next_x, y: next_y}, color, ctx);

            t = t + t_inc;
            x = next_x;
            y = next_y;

            next_t = next_t + t_inc;
            next_x = Math.pow(1-next_t, 3) * pt0.x + 3 * Math.pow(1-next_t, 2) * next_t * pt1.x + 3 * (1-next_t) * Math.pow(next_t, 2) * pt2.x + Math.pow(next_t, 3) * pt3.x;
            next_y = Math.pow(1-next_t, 3) * pt0.y + 3 * Math.pow(1-next_t, 2) * next_t * pt1.y + 3 * (1-next_t) * Math.pow(next_t, 2) * pt2.y + Math.pow(next_t, 3) * pt3.y;
        }
        
    }


    drawPoint(center, radius, color, ctx) {
        let deg = 2 * (Math.PI) / this.num_curve_sections;
        let degree = 0;
        let x = center.x + radius * Math.cos(degree);
        let y = center.y + radius * Math.sin(degree);

        let next_deg = degree + deg;

        let next_x = center.x + radius * Math.cos(next_deg);
        let next_y = center.y + radius * Math.sin(next_deg);

        //loop through number of curve sections
        for(let i = 0; i<this.num_curve_sections; i++){
            this.drawLinePoint({x: x, y: y}, {x: next_x, y: next_y}, color, ctx);

            degree = degree + deg;
            x = next_x;
            y = next_y;

            next_deg = next_deg + deg;
            next_x = center.x + radius * Math.cos(next_deg);
            next_y = center.y + radius * Math.sin(next_deg);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        if(this.show_points == true){
            this.drawPoint({x: pt0.x, y: pt0.y}, 3, [0,0,0,255], ctx);
            this.drawPoint({x: pt1.x, y: pt1.y}, 3, [0,0,0,255], ctx);
        }
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }

    drawLinePoint(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
