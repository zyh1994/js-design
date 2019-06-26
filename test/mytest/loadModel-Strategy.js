/**
 * 载入模型，模型材质，模型数据，回调函数执行方法，传入3D实体
 * @param urlMtl
 * @param urlObj
 * @param fn
 */
var loadModel=function (urlMtl,urlObj,fn) {
    var modelName = 'default';
    var objLoader = new THREE.OBJLoader2();
    var callbackOnLoad = function (event) {
        var mesh = event.detail.loaderRootNode.children[0];
        fn(mesh);
    };
    var onLoadMtl = function (materials) {
        objLoader.setModelName(modelName);
        objLoader.setMaterials(materials);
        objLoader.setLogging(true, true);
        objLoader.load(urlObj, callbackOnLoad, null, null, null, true);
    };
    objLoader.loadMtl(urlMtl, null, onLoadMtl);
    var tableModel = objLoader.loaderRootNode;
}
/**
 * 不同的模型处理策略，table：货架需要定义行列层，位置，货车需要定义位置，叉车需要定义位置，两种车都需要运动，运动按照路线形成
 * @type {{table: strategies.table, truck: strategies.truck, vechile: strategies.vechile}}
 */
var strategies={
    "table":function (mesh) {

    },
    "truck":function (mesh) {

    },
    "vechile":function (mesh) {

    }
}
// 扩展成对象时，用对象中的行列层表示
function tableGroup(tableMesh, rowNum, columnNum, layerNum) {//model,行、列、层
    if (rowNum === 0 || columnNum === 0 || layerNum === 0) {
        rowNum = columnNum = layerNum = 1;
    }
    var mesh = tableMesh;
    var geo = new THREE.Geometry().fromBufferGeometry(mesh.geometry);//将buffer转换成不同的
    var material = mesh.material;
    geo.computeBoundingBox();
    var box3 = geo.boundingBox;
    var geom = new THREE.Geometry();
    var size = box3.getSize();
    var cmesh = new THREE.Mesh(geo, material);
    cmesh.rotation.x = Math.PI / 2;
    cmesh.rotation.z = Math.PI;
    cmesh.updateMatrix();
    console.log(cmesh);
    for (var row = 0; row < rowNum; row++) {
        for (var column = 0; column < columnNum; column++) {
            for (var layer = 0; layer < layerNum; layer++) {
                var clone = cmesh.clone();
                var len_x = size.x;
                var len_y = size.y;
                var len_z = size.z;
                // console.log(len_x);
                clone.position.x += (len_x * column);
                clone.position.y += (len_y * layer);
                clone.position.z += (len_z * row);
                clone.updateMatrix();
                geom.merge(clone.geometry, clone.matrix);
            }
        }
    }
    var nmesh = new THREE.Mesh(geom, material);
    return nmesh;
}
