'use strict';
// var tween = new TWEEN.Tween({x:10}).to({x:3},10000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function () {
//     //update the mesh
// });
var MyAnimation = function () {
    function MyAnimation(posSrc, target, timer) {
        this.posSrc=posSrc;
        this.target=target;
        this.timer=timer;
    }
    MyAnimation.prototype.update = function (fn) {
        fn();
    }
    var instance;
    var defaultA = {
        posSrc: new THREE.Vector3(),
        target: new THREE.Vector3(),
        timer: 1000
    };
    MyAnimation.prototype.getTween = function (a) {
        if(a){
            instance=new TWEEN.Tween(a.posSrc).to(a.target,a.timer);
            return instance;
        }else{
            return  instance?instance:new TWEEN.Tween(defaultA.posSrc).to(defaultA.target,defaultA.timer);
        }
    }
    return MyAnimation;
}();