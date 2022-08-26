/*
 *    | y
 *    .
 * z / \ x
 *
 */

let rotate_status = 0;
const width = 600;      // window.innerWidth
const height = 600;     // window.innerHeight

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const canvas = document.getElementById('canvas-pyramidal');
canvas.insertBefore(renderer.domElement, canvas.firstChild);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#ffffff');

const aspect = width / height;
const unit = 7.5;
const camera = new THREE.OrthographicCamera(-unit*aspect, unit*aspect, unit, -unit, 1, 1000);
let [rx, rz] = [125, 175];
camera.position.set(rx, 75, rz);
camera.lookAt(scene.position);


const rotate = (x, y, a) => [
  x*Math.cos(a) - y*Math.sin(a),
  x*Math.sin(a) + y*Math.cos(a)
];


const boxedcube = (color=0xffffff, s=1-1/64) => [
  new THREE.Mesh(
    new THREE.BoxGeometry(s, s, s),
    new THREE.MeshBasicMaterial({ color: color })
  ),
  new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    new THREE.LineBasicMaterial({ color: '#000000' })
  )
];

const boxedcube_position = (x, y, z, color=0xffffff) => {
  const [cube, box] = boxedcube(color);
  cube.position.set(x, y, z);
  box.position.set(x, y, z);
  return [cube, box];
};

const populate_scene = (i, arr, obj) => {
  arr[i].push(obj);
  scene.add(obj);
};


const n = 5;
const ny = 3;
const py = -2;
const dz = -2;
const colors = ['#e50000', '#ff8d00', '#ffee00', '#028121', '#004cff', '#770088'];

const looper = [
  { sx: 0,   dx: -n, dy: +ny+py, check: (x, y, z) => (x <= y && z >= n-y-1) },
  { sx: 1-n, dx:  0, dy: +ny+py, check: (x, y, z) => (z >= n-y-1 && Math.abs(x) < n-y) },
  { sx: 0,   dx: +1, dy: +ny+py, check: (x, y, z) => (x >= n-y-1 && z >= n-y-1) },
  { sx: 0,   dx: -n, dy: -ny+py, check: (x, y, z) => (x < n-y && z < n-y) },
  { sx: 1-n, dx:  0, dy: -ny+py, check: (x, y, z) => (z < n-y && Math.abs(x) < y+1) },
  { sx: 0,   dx: +1, dy: -ny+py, check: (x, y, z) => (x >= y && z < n-y) }
];


let cubes = [[], [], [], [], [], []];
let boxes = [[], [], [], [], [], []];
let visibles = [true, true, true, true, true, true];
for (let i=0; i<6; i++) {
  const { sx, dx, dy, check } = looper[i];
  for (let x=sx; x<n; x++) {
    for (let z=0; z<n; z++) {
      for (let y=0; y<n; y++) {
        if (check(x, y, z)) {
          const [cube, box] = boxedcube_position(x+dx, y+dy, z+dz, colors[i]);
          populate_scene(i, cubes, cube);
          populate_scene(i, boxes, box);
        }
      }
    }
  }
}


const outer_frame = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(2*n+1, 2*n+1, n)),
  new THREE.LineDashedMaterial({ color: '#000000', scale: 3, dashSize: 1, })
);
outer_frame.computeLineDistances();
outer_frame.position.set(0, 2+py, (n-1)/2+dz);
scene.add(outer_frame);


const togvis = (i) => {
  visibles[i] = !visibles[i];
  for (let j=0; j<cubes[i].length; j++) {
    cubes[i][j].visible = boxes[i][j].visible = visibles[i];
  }
};

const togrot = (d) => {
  rotate_status = (rotate_status === d) ? 0 : d ;
  document.getElementById('rotate-left').innerHTML = (rotate_status === -1) ? '⏹️' : '⬅️' ;
  document.getElementById('rotate-right').innerHTML = (rotate_status === +1) ? '⏹️' : '➡️' ;
};

const animate = () => {
  requestAnimationFrame(animate);
  [rx, rz] = rotate(rx, rz, rotate_status*2*Math.PI/180);
  camera.position.set(rx, 75, rz);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
};
animate();

document.getElementById('control-pyramidal').style.display = 'block';
