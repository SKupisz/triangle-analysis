import React from "react";

export default class Main extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            a1: null, b1: null, c1: null,
            a2: null, b2: null, c2: null,
            a3: null, b3: null, c3: null,
            phase: 1,
        };

        this.calculateTheArea = this.calculateTheArea.bind(this);
        this.updateTheFactor = this.updateTheFactor.bind(this);
        this.goBackToTheBeginning = this.goBackToTheBeginning.bind(this);
    }
    calculateTheArea(){
        this.setState({
            phase: 2
        },() => {
            if(this.state.a1 == null || this.state.b1 == null || this.state.c1 == null ||
                this.state.a2 == null || this.state.b2 == null || this.state.c2 == null ||
                this.state.a3 == null || this.state.b3 == null || this.state.c3 == null){
                this.setState({
                    phase: 1
                },() => {});
            }
            else{
                let xa = 0, ya = 0,
                xb = 0, yb = 0,
                xc = 0, yc = 0;
                // calculating corner's coordinates
                ya = ((this.state.a3*this.state.c1-this.state.a1*this.state.c3)/(this.state.a1*this.state.b3-this.state.a3*this.state.b1));
                xa = ((-this.state.b1*ya-this.state.c1)/this.state.a1);
                yb = ((this.state.a3*this.state.c2-this.state.a2*this.state.c3)/(this.state.a2*this.state.b3-this.state.a3*this.state.b2));
                xb = ((-this.state.b3*yb-this.state.c3)/this.state.a3);
                yc = ((this.state.a2*this.state.c1-this.state.a1*this.state.c2)/(this.state.a1*this.state.b2-this.state.a2*this.state.b1));
                xc = ((-this.state.b1*yc-this.state.c1)/this.state.a1);

                // Triangle's area
                let area = Math.abs(xa*(yb-yc)+xb*(yc-ya)+xc*(ya-yb));
                area/=2;

                //counting the length of each triangle's side
                let ab = Math.sqrt(Math.pow((xa-xb),2)+Math.pow((ya-yb),2)),
                ac = Math.sqrt(Math.pow((xa-xc),2)+Math.pow((ya-yc),2)),
                bc = Math.sqrt(Math.pow((xc-xb),2)+Math.pow((yc-yb),2));

                // checking if the triangle is an rectangular, an acute angled or an obtuse one
                let type = "", biggest = Math.max(ab,Math.max(ac,bc)),
                smallest = Math.min(ab,Math.min(ac,bc)), middle = ab+ac+bc-biggest-smallest;
                if(Math.pow(smallest,2)+Math.pow(middle,2) == Math.pow(biggest,2)) type = "prostokątny";
                else if(Math.pow(smallest,2)+Math.pow(middle,2) < Math.pow(biggest,2)) type = "rozwartokątny";
                else type = "ostrokątny";
                if(ab == ac && ab == bc) type+= "równoboczny";
                else if((ab == ac && ab != bc) || (ab == bc && ab != ac) || (bc == ac && bc != ab)) type+="równoramienny";
                
                // trigonometric functions of each angle

                let cosA = (Math.pow(ac,2)+Math.pow(ab,2)-Math.pow(bc,2))/(2*ab*ac),
                sinA = Math.sqrt(1-Math.pow(cosA,2));
                let cosB = (Math.pow(bc,2)+Math.pow(ab,2)-Math.pow(ac,2))/(2*ab*bc),
                sinB = Math.sqrt(1-Math.pow(cosB,2));
                let cosC = (Math.pow(bc,2)+Math.pow(ac,2)-Math.pow(ab,2))/(2*bc*ac),
                sinC = Math.sqrt(1-Math.pow(cosC,2));

                //counting mid-perpendiculars of each side
                let abMiddle = [((xa+xb)/2).toFixed(3),((ya+yb)/2).toFixed(3)],
                acMiddle = [((xa+xc)/2).toFixed(3),((ya+yc)/2).toFixed(3)],
                bcMiddle = [((xb+xc)/2).toFixed(3),((yb+yc)/2).toFixed(3)];
                let abx = -this.state.b3,aby = this.state.a3, 
                acx = -this.state.b2,acy = this.state.a2,
                bcx = -this.state.b1,bcy = this.state.a1;
                let abc = (-abx*abMiddle[0]-aby*abMiddle[1]).toFixed(3),
                acc = (-acx*acMiddle[0]-acy*acMiddle[1]).toFixed(3),
                bcc = (-bcx*bcMiddle[0]-bcy*bcMiddle[1]).toFixed(3);
                let finalOfAb = "",finalOfAc="", finalOfBc = "";
                if(abx != 0) finalOfAb+=(abx+"x + ");
                if(aby != 0) {
                    if(abc == 0) finalOfAb+=(aby+"y ");
                    else finalOfAb+=(aby+"y + ");
                }
                if(abc != 0) finalOfAb+=(abc);
                finalOfAb+=" = 0";
                if(acx != 0) finalOfAc+=(acx+"x + ");
                if(acy != 0) {
                    if(acc == 0) finalOfAc+=(acy+"y ");
                    else finalOfAc+=(acy+"y + ");
                }
                if(acc != 0) finalOfAc+=(acc);
                finalOfAc+=" = 0";
                if(bcx != 0) finalOfBc+=(bcx+"x + ");
                if(bcy != 0) {
                    if(bcc == 0) finalOfBc+=(bcy+"y ");
                    else finalOfBc+=(bcy+"y + ");
                }
                if(bcc != 0) finalOfBc+=(bcc);
                finalOfBc+=" = 0";

                // counting the bisector of each angle

                let InscribedRadius = (2*area)/(ab+ac+bc);


                // counting the middle point of a circle escribed on the analyzed triangle
                let xs = (acy*abc+aby*acc)/(acx*aby - acy*abx);
                let ys = (-abx*xs-abc)/aby;
                let EscribedRadius = bc/(2*sinA);
                let CircleEquitation = "";
                if(xs == 0) CircleEquitation+="x^2 + ";
                else if(xs > 0) CircleEquitation+="(x-"+xs.toFixed(3)+")^2 + ";
                else CircleEquitation+="(x+"+(xs*(-1)).toFixed(3)+")^2 + ";
                if(ys == 0) CircleEquitation+="y^2 ";
                else if(ys > 0) CircleEquitation+="(y-"+ys.toFixed(3)+")^2 ";
                else CircleEquitation+="(y+"+(ys*(-1)).toFixed(3)+")^2 ";
                CircleEquitation+=("= "+Math.pow(EscribedRadius,2).toFixed(3));
                // passing the data to the display
                this.setState({
                    triangleArea: area.toFixed(3),
                    pointA: [xa.toFixed(3),ya.toFixed(3)],
                    pointB: [xb.toFixed(3),yb.toFixed(3)],
                    pointC: [xc.toFixed(3),yc.toFixed(3)],
                    abSide: ab.toFixed(3),
                    acSide: ac.toFixed(3),
                    bcSide: bc.toFixed(3),
                    triangleType: type,
                    trigFunctions: [[sinA.toFixed(3),cosA.toFixed(3)],
                    [sinB.toFixed(3),cosB.toFixed(3)],
                    [sinC.toFixed(3),cosC.toFixed(3)]], /* [sin a,cos a],[sin b,cos b],[sin c,cos c]*/
                    abPerpendicular: finalOfAb,
                    acPerpendicular: finalOfAc,
                    bcPerpendicular: finalOfBc,
                    escribedCircleData: [xs.toFixed(3),ys.toFixed(3),0],
                    escribedCircleEquitation: CircleEquitation,
                    escribedCircleRadius: EscribedRadius.toFixed(3),
                    inscribedCircleRadius: InscribedRadius.toFixed(3),
                    phase: 3
                },() => {});
            }
        });
    }
    updateTheFactor(event,name){
        let value = parseInt(event.target.value,10);
        switch(name){
            case 1:
                this.setState({
                    a1: value
                },() => {});
                break;
            case 2:
                this.setState({
                    b1: value
                },() => {});
                break;      
            case 3:
                this.setState({
                    c1: value
                },() => {});
                break;   
            case 4:
                this.setState({
                    a2: value
                },() => {});
                break;
            case 5:
                this.setState({
                    b2: value
                },() => {});
                break;      
            case 6:
                this.setState({
                    c2: value
                },() => {});
                break;
            case 7:
                this.setState({
                    a3: value
                },() => {});
                break;
            case 8:
                this.setState({
                    b3: value
                },() => {});
                break;      
            case 9:
                this.setState({
                    c3: value
                },() => {});
                break;     
            default: 
                break;
        }
    }
    goBackToTheBeginning(){
        this.setState({
            a1: null, b1: null, c1: null,
            a2: null, b2: null, c2: null,
            a3: null, b3: null, c3: null,
            phase: 1,
        },() => {});
    }
    componentDidMount(){
        this.calculateTheArea();
    }
    render(){
        return(
            <div className="main-container block-center">
                {this.state.phase === 1 ? <span className="data-wrap">
                    <div className="paths-wrapper block-center">
                        <div className="paths">
                            Prosta k: 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,1)}} className = "number-input first-input" step = "0.01" name="" id=""/>x + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,2)}} className = "number-input" step = "0.01" name="" id=""/>y + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,3)}} className = "number-input" step = "0.01" name="" id=""/> = 0
                        </div>
                        <div className="paths">
                            Prosta l: 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,4)}} className = "number-input first-input" step = "0.01" name="" id=""/>x + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,5)}} className = "number-input" step = "0.01" name="" id=""/>y + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,6)}} className = "number-input" step = "0.01" name="" id=""/> = 0
                        </div>
                        <div className="paths">
                            Prosta m: 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,7)}} className = "number-input first-input" step = "0.01" name="" id=""/>x + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,8)}} className = "number-input" step = "0.01" name="" id=""/>y + 
                            <input type="number" onChange = {(event) => {this.updateTheFactor(event,9)}} className = "number-input" step = "0.01" name="" id=""/> = 0
                        </div>
                    </div>
                    <button className="getTheResultsBtn block-center" onClick = {() => {this.calculateTheArea()}}>Oblicz</button>
                </span> : this.state.phase === 2 ? "Obliczanie..." :
                <span className="results-wrap">
                    <div className="results-container block-center">
                        <header className="main-header block-center">Wyniki analizy</header>
                        <div className="section-starter">Dane ogólne</div>
                        
                        <div className="info-wrapper">Trójkąt {this.state.triangleType}</div>
                        <div className="info-wrapper">Część wspólna prostej k i m: A({this.state.pointA[0]+","+this.state.pointA[1]})</div>
                        <div className="info-wrapper">Część wspólna prostej l i m: B({this.state.pointB[0]+","+this.state.pointB[1]})</div>
                        <div className="info-wrapper">Część wspólna prostej k i l: C({this.state.pointC[0]+","+this.state.pointC[1]})</div>
                        <div className="info-wrapper">Długość boku AB: {this.state.abSide}</div>
                        <div className="info-wrapper">Długość boku AC: {this.state.acSide}</div>
                        <div className="info-wrapper">Długość boku BC: {this.state.bcSide}</div>
                        <div className="info-wrapper">Promień okręgu opisanego: {this.state.escribedCircleRadius}</div>
                        <div className="info-wrapper">Promień okręgu wpisanego: {this.state.inscribedCircleRadius}</div>
                        <div className="info-wrapper">Pole trójkąta: {this.state.triangleArea}</div>

                        <div className="section-starter another-starter">Funkcje trygonometryczne kątów trójkąta</div>

                        <div className="info-wrapper">Kąt BAC: sinα = {this.state.trigFunctions[0][0]}, cosα = {this.state.trigFunctions[0][1]}</div>
                        <div className="info-wrapper">Kąt ABC: sinβ = {this.state.trigFunctions[1][0]}, cosβ = {this.state.trigFunctions[1][1]}</div>
                        <div className="info-wrapper">Kąt BCA: sinγ = {this.state.trigFunctions[2][0]}, cosγ = {this.state.trigFunctions[2][1]}</div>

                        <div className="section-starter another-starter">Okrąg opisany</div>
                        <div className="info-wrapper">Równanie symetralnej boku AB: {this.state.abPerpendicular}</div>
                        <div className="info-wrapper">Równanie symetralnej boku AC: {this.state.acPerpendicular}</div>
                        <div className="info-wrapper">Równanie symetralnej boku BC: {this.state.bcPerpendicular}</div>
                        <div className="info-wrapper">Współrzędne środka okręgu: S({this.state.escribedCircleData[0]+", "+this.state.escribedCircleData[1]})</div>
                        <div className="info-wrapper">Równanie okręgu opisanego: {this.state.escribedCircleEquitation}</div>

                        <button className="getTheResultsBtn go-back-button block-center" onClick = {() => {this.goBackToTheBeginning();}}>Powrót</button>
                    </div>
                </span>}
            </div>
        )
    }
}