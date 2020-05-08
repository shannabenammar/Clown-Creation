
var Purple1 = new THREE.Color( "rgb(230, 44, 205)" ); 
var Blue1 = new THREE.Color( "rgb(32, 174, 245)");
var Green1 = new THREE.Color( "rgb(34, 245, 175)");
var GreenFace = new THREE.Color( "rgb(155, 250, 218)");
var Black1 = new THREE.Color( "rgb(43, 9, 82)");
var Pink1 = new THREE.Color( "rgb(247, 143, 239)");
var Yellow1 = new THREE.Color( "rgb(250, 252, 104)");

var bodyMaterial = new THREE.MeshBasicMaterial({color: Blue1});
var legMaterial = new THREE.MeshBasicMaterial({color: Purple1});
var headMaterial = new THREE.MeshBasicMaterial({color: GreenFace});
var blackMaterial = new THREE.MeshBasicMaterial({color: Black1});
var handMaterial = new THREE.MeshBasicMaterial({color: Green1});
var smileMaterial = new THREE.MeshBasicMaterial({color: Pink1});
var ballMaterial = new THREE.MeshBasicMaterial({color: Yellow1});

var sphereDetail=  32,
    cylinderDetail = 32,
    noseRadius=0.35,
    noseRotation=TW.degrees2radians(10),
    earRadius= 1.5,
    earScale= 1,
    earAngle= Math.PI/4,
    eyeRadius= 0.5,
    eyeAngleX= -Math.PI/6,
    eyeAngleY= +Math.PI/6,
    armLength= 8,
    armRadiusTop= 0.75,
    armRadiusBottom= 0.75,
    shoulderRadius=2,
    legRadiusTop= 0.75,
    legRadiusBottom= 0.75,
    legLength= 11,
    legRotationX= -TW.degrees2radians(0),
    legRotationZ= TW.degrees2radians(0),
    hipWidth= 2,
    hipHeight= -7,
    headRadius= 4.5,
    bodyRadius= 5,
    bodyScaleY= 1.1,
    handRadius = 1.5,
    feetRadius = 1.75,
    brimRadius = 7,
    brimRotationY = headRadius -1.5,
    brimRotationX = headRadius * 0.25,
    hatBottomRadius = 4,
    hatTopRadius = 5;

function createSmile() {

      /*
      Creates the mesh for the smile shape using the TorusGeometry object from THREE.js
      Returns the smile mesh to the call of this function
      */
  
    var sd = sphereDetail;
    var smileGeometry = new THREE.TorusGeometry(2, 0.2, 30, 200, -1.5 );
    var smileMesh = new THREE.Mesh(smileGeometry, smileMaterial);
  
    return smileMesh;
}

function addSmile(head) {
  
     /*
      Creates a frame for the smile then adjusts the angle and position of the smile.
      Calls the createSmile(); function which returns the smile mesh. 
      Adds the smile mesh to the smile frame
      Adds the smile frame to the head
      returns the head with the smile on it
      */
  
    var smileframe = new THREE.Object3D();
    var smile = createSmile();
    var angle = noseRotation;    
    var radius = headRadius;
  
    smile.position.z = radius - 0.25;

    smileframe.rotation.x = angle * 0.5;
    smileframe.rotation.y = (angle - 0.30) + 0.15;
    smileframe.rotation.z = (-angle * 0.5) -0.40;
  
    smileframe.add(smile);
    head.add(smileframe);
  
    return head;
}

function createHat() {
  
      /*
      Creates the top of the clowns hat using a new CylinderGeometry object
      Creates the mesh of the hat using the color of the body and the 
      hat geometry that was defined
      Returns the hat mesh
      */
  
    var cd = cylinderDetail;
    var hatGeometry = new THREE.CylinderGeometry(hatTopRadius, hatBottomRadius, 5,100);
    var hatMesh = new THREE.Mesh(hatGeometry, bodyMaterial);
  
    return hatMesh;
}

function addHat(head) {
  
      /*
      Creates the frame of the hat.
      Calls the createHat() function to retreive the hats mesh.
      Adjust the position and rotation of the mesh so it sits correctly
      on the head of the clown
      Adds the hat mesh to the hat frame
      Adds the hatframe to the head
      Returns the head with the hat on it
      */
  
    var hatframe = new THREE.Object3D();
    var hat = createHat();
   
    hatframe.position.y = headRadius - 0.25;
    hatframe.position.x = 0.75 ;
    hatframe.position.z = -brimRotationX -1.23 ;

    hatframe.rotation.y = -brimRotationY +10.60;
    hatframe.rotation.z = TW.degrees2radians(-30);
    hatframe.rotation.x = -brimRotationX +1.20;


    hatframe.add(hat);
    head.add(hatframe);
  
    return head;
}


function createBrim() {
  
     /*
     Creats the brim geometry sing the RingGeometry object from THREE.js.
     Creates the mesh using the brim geometry that was just creates=d along with
     the same color as the body.
     returns the mesh of the brim
      */
  
    var sd = sphereDetail;
    var radius = brimRadius;
    var brimGeometry = new THREE.RingGeometry(0, radius, 100);
    var brimM = new THREE.MeshBasicMaterial( { color: 'rgb(32, 174, 245)', side: THREE.DoubleSide } );
    var brimMesh = new THREE.Mesh(brimGeometry, brimM);
  
    return brimMesh;
}

function addBrim(head) {
  
    /*
      Creates the frame of the brim.
      Calls the createbrim() function to retreive the brims mesh.
      Adjust the position and rotation of the mesh so it sits correctly
      on the head of the clown
      Adds the brim mesh to the brim frame
      Adds the brimframe to the head
      Returns the head with the brim on it
      */
  
    var brimframe = new THREE.Object3D();
    var brim = createBrim();
    var radius = brimRadius;
  
    brimframe.position.y = headRadius -1.75;
    brimframe.rotation.y = brimRotationY ;
    brimframe.rotation.x = brimRotationX;
    brimframe.position.x = 0 ;
  
    brimframe.add(brim);
    head.add(brimframe);
  
    return head;
}

function createFeet() {
  
     /*
     Creats the feet geometry sing the sphereGeometry object from THREE.js.
     Creates the mesh using the feet geometry that was just created along with
     the same color as the hands
     Adjusts the Y position of the feet on the body
     returns the mesh of the feet
      */
    
    var sd = sphereDetail ;
    var radius = feetRadius;
    var feetM = new THREE.MeshBasicMaterial( { color: 'rgb(34, 245, 175)', side: THREE.DoubleSide } );  
    var feetGeometry = new THREE.SphereGeometry(radius,sd,100,0,Math.PI*2, 6, 2.4);
    var feetMesh = new THREE.Mesh(feetGeometry, feetM);
  
    feetMesh.position.y = (-bodyScaleY) -10;

    return feetMesh;
}

function createBall(){
  
    /*
     Creats the ball geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the ball geometry that was just created along with
     the ballMaterial (ball color)
     returns the mesh of the ball
      */
  
    var ballGeometry = new THREE.SphereGeometry(0.75,32,32);
    var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

  return ballMesh; 
}

function addBall(body){
  
     /*
      Creates the frame of the ball.
      Calls the createball() function to retreive the balls mesh.
      Adjust the position and rotation of the mesh so it sits on the origin 
      of the clown
      Adds the ball mesh to the ball frame
      Adds the ballframe to the body
      Returns the body with the ball in its origin
      */
  
    var ballFrame = new THREE.Object3D();
    var ball = createBall();

    ballFrame.position.y = 0;
    ballFrame.position.x = 0;
  
    ballFrame.add(ball)
    body.add(ballFrame);
  
    return body;
}

function addFeet(leg,side) {
  
      /*
      Creates the frame of the feet.
      Calls the createfeet() function to retreive the feet mesh.
      Adjust the position and rotation of the mesh so it sits on the 
      bottom of the legs of the clown
      Adds the feet mesh to the feet frame
      Adds the feetframe to the legs
      Returns the legs with the feet on them
      */
 
    var feetFrame = new THREE.Object3D();
    var feet = createFeet();
    var radius = feetRadius;

    feetFrame.add(feet);
    leg.add(feetFrame);
  
   return leg;
}

function createHand() {
  
     /*
     Creats the hand geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the hand geometry that was just created along with
     the handMaterial hand color)
     returns the mesh of the hand
      */
    
   var sd = sphereDetail ;
   var radius = handRadius;
   var handGeometry = new THREE.SphereGeometry(radius,sd,sd);
   var handMesh = new THREE.Mesh(handGeometry, handMaterial);
  
   handMesh.position.y = (-armLength/2) -3;

  return handMesh;
}

function addHand(arm,side) {
  
    /*
      Creates the frame of the hand.
      Calls the createHand() function to retreive the mesh.
      Adjust the position and rotation of the mesh so it sits on the 
      bottom of the arms of the clown
      Adds the mesh to the hand frame
      Adds the frame to the arm
      Returns the arms with the hands on them
      */
  
    var handFrame = new THREE.Object3D();
    var hand = createHand();
    var radius = handRadius;

    handFrame.add(hand);
    arm.add(handFrame);
  
    return arm;
}

function createShoulder() {
  
    /*
     Creats the shoulder geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the legMaterial (leg and now shoulder color)
     returns the mesh of the shoulder
      */
   
    var sd = sphereDetail ;
    var radius = shoulderRadius;
    var shGeometry = new THREE.SphereGeometry(radius,sd,sd);
    var shoulderMesh = new THREE.Mesh(shGeometry, legMaterial);
      
    return shoulderMesh;
 
}

function addShoulder(arm,side) {
 
     /*
      Creates the frame of the shoulder.
      Calls the creatShoulder() function to retreive the mesh.
      Adjust the position and rotation of the mesh so it sits on the 
      top of the arms of the clown
      Adds the mesh to the shoulder frame
      Adds the frame to the arm
      Returns the arms with the shoulders on them
      */
  
    var shoulderFrame = new THREE.Object3D();
    var shoulder = createShoulder();
    var radius = shoulderRadius;
    var sx = 1.5 * bodyRadius * 0.5 ;
    var sy = bodyScaleY * bodyRadius * 0.7;
 
    shoulderFrame.add(shoulder);
    arm.add(shoulderFrame);
  
    return arm;
}

function createEar() {
  
    /*
     Creats the ear geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the blackMaterial (color)
     returns the mesh of the ear
      */
   
  
    var sd = sphereDetail ;
    var radius = earRadius;
    var earGeometry = new THREE.SphereGeometry(radius,sd,sd);
    var ear = new THREE.Mesh(earGeometry, blackMaterial);
   
    ear.scale.z = earScale;
  
    return ear;
}

function addEar(head,side) {
  
  
    /* adds an ear to the head on the right (side=1) or left
     * (side=-1). The center of the ear is flush with the surface of the
     * head by moving it out by the radius, and rotating it around the z
     * axis to get it to the desired height. */
  
    var earframe = new THREE.Object3D();
    var ear = createEar();
    var radius = headRadius;
    var angle = earAngle / headRadius;
  
    ear.position.x = side * radius; 

    earframe.add(ear);
    head.add(earframe);
  
    return head;
}

function createNose() {
  
    /*
     Creats the nose geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the blackMaterial (color)
     returns the mesh of the nose
      */
  
    var sd = sphereDetail;
    var radius = noseRadius;
    var noseGeometry = new THREE.SphereGeometry(radius,sd,sd);
    var noseMesh = new THREE.Mesh(noseGeometry, blackMaterial);
  
    return noseMesh;
}

function addNose(head) {
  
    /* adds a nose to the head. It's placed by creating a composite object
     * centered in the middle of the head, and positioning the nose at the
     * head radius on +Z, then rotating around X by a little. */
  
    var noseframe = new THREE.Object3D();
    var nose = createNose();
    var radius = headRadius;
    var angle = noseRotation;
  
    noseframe.rotation.x = angle;
    nose.position.z = radius; 
    noseframe.add(nose);
   
    head.add(noseframe);
  
    return head;
}

function createEye() {
  
     /*
     Creats the eyes geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the blackMaterial (color)
     returns the mesh of the eye
      */
  
    var sd = sphereDetail;
    var radius = eyeRadius;
    var eyeGeometry = new THREE.SphereGeometry(radius,sd,sd);
    var eyeMesh = new THREE.Mesh(eyeGeometry, blackMaterial);
     
    return eyeMesh;
}

function addEye(head,side) {
  
    /* adds an eye to the head on the right (side=1) or left
     * (side=-1). The center of the eye is flush with the surface of the
     * head by moving it out along the z axis by the radius, and rotating
     * it around the x and then y axes to get it to the desired height. */
  
    var eyeframe = new THREE.Object3D();
    var eye = createEye();
    var radius = headRadius;
    var angleX = eyeAngleX /headRadius;
    var angleY = eyeAngleY /1.5;
  
    eye.position.z = radius;
    eyeframe.rotation.x = angleX;
    eyeframe.rotation.y = side * angleY;
  
    eyeframe.add(eye);
    head.add(eyeframe);
  
    return head;
}

function createHead() {
  
    /* Returns a clown head object, with origin in the center, and
     * eyes on the +Z side of the head, and ears on the left (-X) and
     * right (+X) sides. 
     * Adds all the components of the head before returning.
     * Including the eyes, smile,ears,and hat
     */
  
    var head = new THREE.Object3D();

    var sd = sphereDetail ;
    var radius = headRadius;
    var headGeometry = new THREE.SphereGeometry(radius, sd, sd);
    var headMesh = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headMesh);
  
        addBrim(head);
        addHat(head);
        addSmile(head);   
        addEye(head,1);
        addEye(head,-1);
        addNose(head);
        addEar(head,1);
        addEar(head,-1);
    
    return head;
}

function createArm() {
  
    /*
     Creats the arm geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the bodykMaterial (color)
     returns the mesh of the arm
     returns an Object with the center at the shoulder and the negative
     * Y axis running down the center. */
  
    var arm = new THREE.Object3D();
    var top = armRadiusTop ;
    var bot = armRadiusBottom ;
    var len = armLength;
    var cd  = cylinderDetail;
    var armGeom = new THREE.CylinderGeometry(top,bot,len,cd);
    var armMesh = new THREE.Mesh( armGeom, bodyMaterial );
  
    armMesh.position.y = (-len/2);
    
    arm.add(armMesh);
    addHand(arm,1);
    addHand(arm,-1);
  
    return arm;
}

function addArm(bear,side) {
  
  
    /* adds an arm to the bear on the right (side=1) or left (side=-1).
      Chnaging the position of the arms so it sits correctly on the body
      adds the shoulders to the arms before returning the object of the arm
    */
  
    var arm = createArm();
    var radius = bodyRadius ;
    var scale = bodyScaleY; 
    var sx = 1.5 * bodyRadius * 0.5 ;
    var sy = scale * radius * 0.7;

    arm.position.set( side * sx, sy+12, 0);
    arm.rotation.z = side  * 0.50;
    arm.rotation.x =  1.75 - hipWidth;
    arm.rotation.y =  side * 0.5 ;
    arm.position.z = 0.15;
  
     addShoulder(arm,1);
     addShoulder(arm,-1);
    
    
    bear.add(arm);
}

function createLimb(radiusTop, radiusBottom, length) {
  
    /*
     Creats the limb geometry using the cylindereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the legMaterial (color)
     returns the mesh of the limb
      */
 
    var limb = new THREE.Object3D();
    var cd  = cylinderDetail;
    
    var limbGeom = new THREE.CylinderGeometry(radiusTop,radiusBottom,length,cd);
    var limbMesh = new THREE.Mesh( limbGeom, legMaterial );
    limbMesh.position.y = -length/2 ;
    limb.add(limbMesh);
    return limb;
}

function addLeg(bear,side) {

    /* adds an leg to the body on the right (side=1) or left
     * (side=-1). The position is changed so that it sits correctly 
     on the body. adds the feet to the legs before returning the
     object of the legs*/
  
    var top = legRadiusTop ;
    var bot = legRadiusBottom;
    var len = legLength;
    var leg = createLimb(top,bot,len);
    leg.name = (side == 0? "right leg" : "left leg");
    var radius = bodyRadius;
    var scale = bodyScaleY; 
    var hx = side * hipWidth;
    var hy = -1 * bodyScaleY;
    
    leg.position.set( hx, hy+12, 0 );
    leg.rotation.x = legRotationX;
    leg.rotation.z = side * legRotationZ;
  
    addFeet(leg,1);
    addFeet(leg,-1);
  
    bear.add(leg);
  
}

function createBody(){
  
     /*
     Creats the body geometry using the sphereGeometry object from THREE.js.
     Creates the mesh using the geometry that was just created along with
     the bodyMaterial (color)
     Changing the position of the body along with the scale.
     returns the mesh of the body after adding all the compents of the
     body. 
      */
  
    var body = new THREE.Object3D();
    var radius = bodyRadius ;
    var sd = sphereDetail;
    var bodyGeom = new THREE.SphereGeometry(radius,sd,sd);
    var bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
    var scale = 2;
  
    bodyMesh.scale.y = 1.3;
    bodyMesh.scale.x = 1; 
    bodyMesh.position.y = 12;
    body.add(bodyMesh);  
  
        addBall(body);
        addArm(body,1);
        addArm(body,-1);   
        addLeg(body, 1);
        addLeg(body,-1);  
    
  return body; 
}

function createClown() {
  
     /* 
      Creates the body frame. Calls the createBody function to retrieve the
      mesh of the body
      Changes the position of the body. 
      adds the clowns body to the frame.
      retrns the object of the clown. 
     */
   
    var bear = new THREE.Object3D();
    var body = createBody();

      bear.add(body);
      var head = createHead();
      var bs = bodyScaleY;
      var br = bodyRadius;
      var hr = headRadius;
  
         head.position.y = (bs*br+hr) +12;
         bear.add(head);
    
  
    return bear;
}

/*
Everything below creates the scene.
-calls the createClown() function to get the clowns body
Adds the clown to the scene.
-Add and sets up the camera view to view the clown
at the correct position. 
*/

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();                     
var bear = createClown();
scene.add(bear);

TW.mainInit(renderer,scene); 
TW.cameraSetup(renderer,
               scene,
               {minx: 0, maxx: 5,
                miny: 0, maxy: 30,
                minz: -10, maxz: 10});

var render = TW.lastClickTarget.TW_state.render;
render();
