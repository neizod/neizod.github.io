"use strict";

const canvas = document.querySelector("#canvas-solid");
const context = canvas.getContext("2d");
const modelInput = document.querySelector("#model");
const clearColorsLink = document.querySelector("#clear-colors");
const drawingControls = document.querySelector("#canvas-drawing-control");
const STORAGE_KEY = "dodecahedron-demo.state";
const COLORS = {
  rollControlUI: { guide: "#666", active: "#90a" },
  uncolored: { face: "#ddd", edge: "#999" },
  immutable: { pentagon: "#bfc", triangle: "#000", defaultLine: "#222" },
  cycle: [null, "#e31", "#08d", "#fc0"]
};

const phi = (1 + Math.sqrt(5)) / 2;

const SOLID_DATA = {
  snub: {
    vertices: makeSnubVertices(),
    faces: [
      [51, 39, 59], [39, 1, 13], [59, 39, 13], [13, 1, 25], [55, 51, 59], [55, 43, 51],
      [7, 6, 43], [19, 42, 7], [43, 18, 51], [6, 18, 43], [42, 6, 7], [50, 42, 19],
      [50, 54, 42], [58, 54, 50], [38, 58, 50], [12, 58, 38], [0, 12, 38], [0, 24, 12],
      [24, 32, 12], [24, 28, 32], [16, 28, 24], [16, 4, 28], [16, 41, 4], [4, 41, 5],
      [5, 40, 4], [5, 17, 40], [5, 29, 17], [29, 25, 17], [29, 33, 25], [33, 13, 25],
      [1, 39, 2], [36, 1, 2], [14, 36, 2], [56, 36, 14], [48, 36, 56], [52, 48, 56],
      [40, 48, 52], [40, 17, 48], [56, 44, 52], [20, 52, 44], [20, 44, 8], [32, 20, 8],
      [28, 20, 32], [8, 44, 10], [8, 10, 46], [46, 10, 22], [46, 22, 54], [46, 54, 58],
      [10, 34, 22], [22, 34, 30], [30, 34, 26], [30, 26, 18], [30, 18, 6], [34, 14, 26],
      [14, 2, 26], [49, 41, 16], [49, 53, 41], [57, 53, 49], [57, 45, 53], [45, 21, 53],
      [45, 9, 21], [9, 33, 21], [21, 33, 29], [11, 9, 45], [11, 47, 9], [23, 55, 47],
      [47, 55, 59], [47, 11, 23], [35, 23, 11], [31, 23, 35], [27, 31, 35], [19, 31, 27],
      [19, 7, 31], [37, 57, 49], [37, 15, 57], [38, 3, 0], [3, 27, 15], [27, 35, 15],
      [3, 15, 37], [3, 37, 0], [14, 34, 10, 44, 56], [39, 51, 18, 26, 2], [6, 42, 54, 22, 30],
      [46, 58, 12, 32, 8], [52, 20, 28, 4, 40], [36, 48, 17, 25, 1], [13, 33, 9, 47, 59],
      [7, 43, 55, 23, 31], [38, 50, 19, 27, 3], [37, 49, 16, 24, 0], [15, 35, 11, 45, 57],
      [53, 21, 29, 5, 41]
    ]
  },
  rhombi: {
    vertices: makeRhombiVertices(),
    faces: [
      [32, 24, 40], [52, 16, 17], [21, 20, 54], [44, 28, 36], [56, 0, 4], [2, 58, 6],
      [26, 34, 42], [46, 38, 30], [50, 14, 12], [15, 51, 13], [37, 29, 45], [57, 5, 1],
      [41, 25, 33], [48, 8, 10], [9, 49, 11], [27, 43, 35], [53, 19, 18], [3, 7, 59],
      [47, 31, 39], [22, 23, 55], [23, 22, 18, 19], [18, 42, 34, 53], [34, 26, 48, 10],
      [48, 24, 32, 8], [32, 40, 16, 52], [16, 20, 21, 17], [21, 54, 37, 45], [37, 13, 51, 29],
      [51, 15, 39, 31], [39, 55, 23, 47], [55, 38, 46, 22], [46, 30, 6, 58], [6, 4, 0, 2],
      [0, 56, 40, 24], [52, 17, 41, 33], [41, 57, 1, 25], [1, 5, 7, 3], [7, 31, 47, 59],
      [33, 25, 49, 9], [49, 27, 35, 11], [35, 43, 19, 53], [38, 14, 50, 30], [50, 12, 36, 28],
      [36, 54, 20, 44], [44, 56, 4, 28], [2, 26, 42, 58], [59, 43, 27, 3], [29, 5, 57, 45],
      [15, 13, 12, 14], [10, 8, 9, 11], [46, 58, 42, 18, 22], [53, 34, 10, 11, 35],
      [41, 17, 21, 45, 57], [54, 36, 12, 13, 37], [4, 6, 30, 50, 28], [0, 24, 48, 26, 2],
      [25, 1, 3, 27, 49], [5, 29, 51, 31, 7], [14, 38, 55, 39, 15], [19, 43, 59, 47, 23],
      [9, 8, 32, 52, 33], [40, 56, 44, 20, 16]
    ]
  }
};

function solveSnubXi() {
  // xi is the real root of x^3 + 2x^2 - phi^2 = 0.
  let xi = 0.94;
  for (let iteration = 0; iteration < 12; iteration += 1) {
    xi -= (xi**3 + 2 * xi**2 - phi**2) / (3 * xi**2 + 4 * xi);
  }
  return xi;
}

function makeSnubVertices() {
  const xi = solveSnubXi();
  const seed = [
    phi**2 - phi**2 * xi,
    -(phi**3) + phi * xi + 2 * phi * xi**2,
    xi
  ];
  const rotations = [
    [
      [1 / (2 * phi), -phi / 2, 1 / 2],
      [phi / 2, 1 / 2, 1 / (2 * phi)],
      [-1 / 2, 1 / (2 * phi), phi / 2]
    ],
    [[0, 0, 1], [1, 0, 0], [0, 1, 0]]
  ];
  const orientation = [
    [-phi / 2, 1 / 2, 1 / (2 * phi)],
    [1 / (2 * phi), phi / 2, -1 / 2],
    [-1 / 2, -1 / (2 * phi), -phi / 2]
  ];
  const transform = (matrix, vector) => matrix.map(row =>
    row.reduce((sum, value, index) => sum + value * vector[index], 0)
  );
  const vertices = [];
  const pending = [seed];
  while (pending.length) {
    const vertex = pending.shift();
    if (vertices.some(candidate =>
      Math.hypot(...candidate.map((value, index) => value - vertex[index])) < 1e-9
    )) continue;
    vertices.push(vertex);
    rotations.forEach(rotation => pending.push(transform(rotation, vertex)));
  }
  // Preserve the vertex numbering used by the face and morph tables below.
  const generatedToTopologyOrder = [
    37, 0, 50, 24, 38, 8, 32, 16, 3, 12, 40, 49, 4, 27, 58,
    28, 21, 11, 19, 53, 35, 46, 20, 41, 15, 43, 30, 7, 22, 52,
    5, 57, 31, 54, 56, 14, 44, 29, 45, 23, 42, 10, 25, 1, 17,
    55, 6, 34, 48, 47, 59, 13, 9, 36, 33, 26, 2, 39, 18, 51
  ];
  const ordered = Array(vertices.length);
  vertices.forEach((vertex, index) => {
    ordered[generatedToTopologyOrder[index]] = transform(orientation, vertex);
  });
  return ordered;
}

function makeRhombiVertices() {
  const signedVariants = coordinates => {
    const variants = [];
    for (const xSign of [1, -1]) {
      for (const ySign of [1, -1]) {
        for (const zSign of [1, -1]) {
          const vertex = [
            coordinates[0] * xSign,
            coordinates[1] * ySign,
            coordinates[2] * zSign
          ];
          if (!variants.some(candidate =>
            candidate.every((value, index) => value === vertex[index])
          )) variants.push(vertex);
        }
      }
    }
    return variants;
  };
  return [
    [1 / 2, 1 / 2, phi + 1 / 2],
    [phi + 1 / 2, 1 / 2, 1 / 2],
    [1 / 2, phi + 1 / 2, 1 / 2],
    [phi**2 / 2, phi / 2, phi],
    [phi, phi**2 / 2, phi / 2],
    [phi / 2, phi, phi**2 / 2],
    [1 + phi / 2, 0, phi**2 / 2],
    [phi**2 / 2, 1 + phi / 2, 0],
    [0, phi**2 / 2, 1 + phi / 2]
  ].flatMap(signedVariants);
}

const models = {
  snub: prepareGeometry(SOLID_DATA.snub),
  rhombi: prepareGeometry(SOLID_DATA.rhombi)
};
const snubToRhombi = [
  30, 33, 49, 14, 0, 40, 59, 31, 42, 21, 53, 37, 46, 41, 11,
  12, 4, 32, 3, 39, 26, 20, 19, 29, 6, 52, 27, 15, 2, 16, 43, 51,
  58, 17, 35, 13, 9, 50, 38, 25, 24, 56, 47, 7, 34, 54, 18, 45,
  8, 28, 55, 1, 48, 44, 23, 5, 10, 36, 22, 57
];
const snubRotation = [
  [1 / (2 * phi), 1 / 2, phi / 2],
  [1 / 2, -phi / 2, 1 / (2 * phi)],
  [phi / 2, 1 / (2 * phi), -1 / 2]
];
const alignedSnub = alignSnubModel();
const dodecahedronTargets = makeDodecahedronTargets();
const dodecahedronVertexGroups = groupCoincidentVertices(dodecahedronTargets);
const rhombiEdgeKeys = new Set(models.rhombi.edges.map(edge => edgeKey(edge)));
const colorUnits = makeColorUnits();
const triangleColorUnits = new Map(colorUnits.flatMap((unit, unitIndex) =>
  unit.triangleFaceIndices.map(faceIndex => [faceIndex, unitIndex])
));
const squareColorUnits = new Map(colorUnits.map((unit, unitIndex) =>
  [unit.squareFaceIndex, unitIndex]
));
const defaultRotation = multiplyQuaternions(
  axisAngleQuaternion(1, 0, 0, 0.45),
  axisAngleQuaternion(0, 1, 0, -0.65)
);
const storedState = loadState();
const state = {
  position: Number.isFinite(storedState.position)
    ? Math.max(0, Math.min(1, storedState.position))
    : 0,
  rotation: Array.isArray(storedState.rotation) &&
      storedState.rotation.length === 4 &&
      storedState.rotation.every(Number.isFinite) &&
      Math.hypot(...storedState.rotation) > 0
    ? normalizeQuaternion(storedState.rotation)
    : [...defaultRotation],
  colors: Array.isArray(storedState.colors) &&
      storedState.colors.length === colorUnits.length
    ? storedState.colors.map(color => COLORS.cycle.includes(color) ? color : null)
    : Array(colorUnits.length).fill(COLORS.cycle[0])
};
modelInput.value = state.position * 100;

let drag = null;
let touchRoll = null;
const touchPoints = new Map();
let colorHitFaces = [];
let colorHitEdges = [];

function prepareGeometry(geometry) {
  const radius = Math.max(...geometry.vertices.map(vertex => Math.hypot(...vertex)));
  const scale = Math.sqrt(3) / radius;
  const vertices = geometry.vertices.map(([x, y, z]) => ({
    x: x * scale,
    y: y * scale,
    z: z * scale
  }));
  const edgeMap = new Map();
  geometry.faces.forEach(face => face.forEach((vertex, index) => {
    const next = face[(index + 1) % face.length];
    const key = `${Math.min(vertex, next)}-${Math.max(vertex, next)}`;
    edgeMap.set(key, [Math.min(vertex, next), Math.max(vertex, next)]);
  }));
  return { vertices, faces: geometry.faces, edges: [...edgeMap.values()] };
}

function alignSnubModel() {
  const vertices = Array(models.snub.vertices.length);
  models.snub.vertices.forEach((vertex, index) => {
    vertices[snubToRhombi[index]] = {
      x: vertex.x * snubRotation[0][0] + vertex.y * snubRotation[1][0] +
        vertex.z * snubRotation[2][0],
      y: vertex.x * snubRotation[0][1] + vertex.y * snubRotation[1][1] +
        vertex.z * snubRotation[2][1],
      z: vertex.x * snubRotation[0][2] + vertex.y * snubRotation[1][2] +
        vertex.z * snubRotation[2][2]
    };
  });
  const faces = models.snub.faces.map(face =>
    face.map(index => snubToRhombi[index])
  );
  return prepareGeometry({
    vertices: vertices.map(vertex => [vertex.x, vertex.y, vertex.z]),
    faces
  });
}

function makeDodecahedronTargets() {
  const targets = Array(models.rhombi.vertices.length);
  const triangles = models.rhombi.faces.filter(face => face.length === 3);
  const centers = triangles.map(face => face.reduce((center, index) => ({
    x: center.x + models.rhombi.vertices[index].x / 3,
    y: center.y + models.rhombi.vertices[index].y / 3,
    z: center.z + models.rhombi.vertices[index].z / 3
  }), { x: 0, y: 0, z: 0 }));
  const targetScale = Math.sqrt(3) / Math.hypot(
    centers[0].x, centers[0].y, centers[0].z
  );
  triangles.forEach((face, triangleIndex) => face.forEach(index => {
    const center = centers[triangleIndex];
    targets[index] = {
      x: center.x * targetScale,
      y: center.y * targetScale,
      z: center.z * targetScale
    };
  }));
  return targets;
}

function makeColorUnits() {
  return models.rhombi.faces
    .map((face, squareFaceIndex) => ({ face, squareFaceIndex }))
    .filter(({ face }) => face.length === 4)
    .map(({ face, squareFaceIndex }) => {
      const diagonals = [[face[0], face[2]], [face[1], face[3]]];
      const diagonal = diagonals.find(edge =>
        alignedSnub.edges.some(candidate => edgeKey(candidate) === edgeKey(edge))
      );
      const triangleFaceIndices = alignedSnub.faces
        .map((triangle, faceIndex) => ({ triangle, faceIndex }))
        .filter(({ triangle }) => triangle.length === 3 &&
          triangle.includes(diagonal[0]) && triangle.includes(diagonal[1]))
        .map(({ faceIndex }) => faceIndex);
      return { squareFaceIndex, square: face, triangleFaceIndices };
    });
}

function groupCoincidentVertices(vertices) {
  const groups = new Map();
  vertices.forEach((vertex, index) => {
    const key = [vertex.x, vertex.y, vertex.z]
      .map(value => value.toFixed(10)).join(",");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });
  return [...groups.values()];
}

function interpolateVertices(from, to, amount) {
  return from.map((vertex, index) => ({
    x: vertex.x + (to[index].x - vertex.x) * amount,
    y: vertex.y + (to[index].y - vertex.y) * amount,
    z: vertex.z + (to[index].z - vertex.z) * amount
  }));
}

function edgeKey(edge) {
  return `${Math.min(...edge)}-${Math.max(...edge)}`;
}

function modelAtPosition(position) {
  if (position < 0.5) {
    return {
      ...alignedSnub,
      vertices: interpolateVertices(
        alignedSnub.vertices,
        models.rhombi.vertices,
        position * 2
      )
    };
  }
  return {
    ...models.rhombi,
    vertices: interpolateVertices(
      models.rhombi.vertices,
      dodecahedronTargets,
      (position - 0.5) * 2
    )
  };
}

function axisAngleQuaternion(x, y, z, angle) {
  const sine = Math.sin(angle / 2);
  return [Math.cos(angle / 2), x * sine, y * sine, z * sine];
}

function multiplyQuaternions(a, b) {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
}

function normalizeQuaternion(quaternion) {
  const length = Math.hypot(...quaternion);
  return quaternion.map(value => value / length);
}

function rotateVertex(vertex) {
  const [w, x, y, z] = state.rotation;
  const tx = 2 * (y * vertex.z - z * vertex.y);
  const ty = 2 * (z * vertex.x - x * vertex.z);
  const tz = 2 * (x * vertex.y - y * vertex.x);
  return {
    x: vertex.x + w * tx + y * tz - z * ty,
    y: vertex.y + w * ty + z * tx - x * tz,
    z: vertex.z + w * tz + x * ty - y * tx
  };
}

function subtract3(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross3(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

function dot3(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

// ----------------------------------------------------------------------------

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      rotation: state.rotation,
      position: state.position,
      colors: state.colors
    }));
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(1, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return rect;
}

function visibleFacesFromCamera(model, rotated, cameraDistance) {
  const camera = { x: 0, y: 0, z: cameraDistance };
  return model.faces.map(face => {
    const points = face.map(index => rotated[index]);
    const center = points.reduce((sum, point) => ({
      x: sum.x + point.x / points.length,
      y: sum.y + point.y / points.length,
      z: sum.z + point.z / points.length
    }), { x: 0, y: 0, z: 0 });
    let normal = cross3(subtract3(points[1], points[0]), subtract3(points[2], points[0]));
    if (dot3(normal, center) < 0) normal = { x: -normal.x, y: -normal.y, z: -normal.z };
    return dot3(normal, subtract3(camera, center)) > 0;
  });
}

function drawEdge(edge, projected, dashed) {
  context.beginPath();
  context.moveTo(projected[edge[0]].x, projected[edge[0]].y);
  context.lineTo(projected[edge[1]].x, projected[edge[1]].y);
  context.strokeStyle = state.position === 1
    ? COLORS.uncolored.edge
    : COLORS.immutable.defaultLine;
  context.lineWidth = state.position === 1 ? 3 : 1;
  context.lineCap = "butt";
  context.setLineDash(dashed ? [4, 2] : []);
  context.stroke();
}

function colorUnitForFace(faceIndex) {
  return state.position < 0.5
    ? triangleColorUnits.get(faceIndex)
    : squareColorUnits.get(faceIndex);
}

function edgeIsVisible(edge, faces, visibleFaces) {
  return faces.some((face, faceIndex) =>
    visibleFaces[faceIndex] && face.includes(edge[0]) && face.includes(edge[1]));
}

function drawDodecahedronColorEdges(projected, rotated, visibleFaces) {
  const coloredEdges = [];
  colorUnits.forEach((unit, unitIndex) => {
    const longEdges = unit.square.map((vertex, index) => [
      vertex,
      unit.square[(index + 1) % unit.square.length]
    ]).filter(edge => {
      const a = dodecahedronTargets[edge[0]];
      const b = dodecahedronTargets[edge[1]];
      return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) > 0.1;
    });
    const edge = longEdges[0];
    const visible = longEdges.some(candidate =>
      edgeIsVisible(candidate, models.rhombi.faces, visibleFaces));
    if (visible) {
      colorHitEdges.push({
        unitIndex,
        a: projected[edge[0]],
        b: projected[edge[1]]
      });
    }
    const color = state.colors[unitIndex];
    if (!color || !visible) return;
    coloredEdges.push({
      edge,
      color,
      depth: (rotated[edge[0]].z + rotated[edge[1]].z) / 2
    });
  });
  coloredEdges.sort((a, b) => a.depth - b.depth).forEach(({ edge, color }) => {
    context.beginPath();
    context.moveTo(projected[edge[0]].x, projected[edge[0]].y);
    context.lineTo(projected[edge[1]].x, projected[edge[1]].y);
    context.strokeStyle = color;
    context.lineWidth = 6;
    context.lineCap = "round";
    context.setLineDash([]);
    context.stroke();
  });
}

function drawDodecahedronVertices(projected, visibleFaces) {
  dodecahedronVertexGroups.filter(group =>
    group.some(index => models.rhombi.faces.some((face, faceIndex) =>
      face.length === 5 && visibleFaces[faceIndex] && face.includes(index)
    ))
  ).forEach(group => {
    const point = projected[group[0]];
    context.beginPath();
    context.arc(point.x, point.y, 4, 0, Math.PI * 2);
    context.fillStyle = COLORS.immutable.triangle;
    context.fill();
  });
}

function drawFaces(orderedFaces, projected) {
  colorHitFaces = state.position < 1
    ? orderedFaces.map(({ face, index }) => ({
      unitIndex: colorUnitForFace(index),
      points: face.map(vertex => projected[vertex])
    })).filter(item => item.unitIndex !== undefined)
    : [];
  orderedFaces.forEach(({ face, index }) => {
    context.beginPath();
    context.moveTo(projected[face[0]].x, projected[face[0]].y);
    face.slice(1).forEach(vertex =>
      context.lineTo(projected[vertex].x, projected[vertex].y));
    context.closePath();
    const unitIndex = colorUnitForFace(index);
    context.fillStyle = face.length === 5
      ? COLORS.immutable.pentagon
      : face.length === 3 && unitIndex === undefined
        ? COLORS.immutable.triangle
        : unitIndex === undefined
          ? COLORS.uncolored.face
          : state.colors[unitIndex] || COLORS.uncolored.face;
    context.fill();
  });
}

function drawModelEdges(model, projected, visibleFaces) {
  model.edges.map(edge => ({
    edge,
    dashed: state.position > 0 && state.position < 0.5 &&
      !rhombiEdgeKeys.has(edgeKey(edge)),
    visible: edgeIsVisible(edge, model.faces, visibleFaces)
  })).filter(item => item.visible)
    .forEach(item => drawEdge(item.edge, projected, item.dashed));
}

function draw() {
  const rect = resizeCanvas();
  context.clearRect(0, 0, rect.width, rect.height);
  const scale = Math.min(rect.width, rect.height) * 0.21;
  const cameraDistance = 6;
  const model = modelAtPosition(state.position);
  const rotated = model.vertices.map(rotateVertex);
  const visibleFaces = visibleFacesFromCamera(model, rotated, cameraDistance);
  const projected = rotated.map(vertex => {
    const perspective = cameraDistance / (cameraDistance - vertex.z);
    return {
      x: rect.width / 2 + vertex.x * scale * perspective,
      y: rect.height / 2 - vertex.y * scale * perspective
    };
  });
  const orderedFaces = model.faces.map((face, index) => ({
    face,
    index,
    depth: face.reduce((sum, vertex) => sum + rotated[vertex].z, 0) / face.length
  }))
    .filter(item => visibleFaces[item.index])
    .sort((a, b) => a.depth - b.depth);
  colorHitEdges = [];
  drawFaces(orderedFaces, projected);
  drawModelEdges(model, projected, visibleFaces);
  if (state.position === 1) {
    drawDodecahedronColorEdges(projected, rotated, visibleFaces);
    drawDodecahedronVertices(projected, visibleFaces);
  }
  context.setLineDash([]);
  context.lineCap = "butt";
  drawRollGuide(rect);
}

function drawRollGuide(rect) {
  if (!drag || drag.button !== 2) return;
  const origin = { x: rect.width / 2, y: rect.height / 2 };
  context.lineWidth = 1;
  context.setLineDash([4, 4]);
  context.strokeStyle = COLORS.rollControlUI.guide;
  context.beginPath();
  context.moveTo(origin.x, origin.y);
  context.lineTo(drag.startX, drag.startY);
  context.stroke();
  context.strokeStyle = COLORS.rollControlUI.active;
  context.beginPath();
  context.moveTo(origin.x, origin.y);
  context.lineTo(drag.lastX, drag.lastY);
  context.stroke();
  context.setLineDash([]);
  context.strokeStyle = COLORS.rollControlUI.guide;
  context.beginPath();
  context.arc(drag.startX, drag.startY, 5, 0, Math.PI * 2);
  context.stroke();
}

function pointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function pointInPolygon(point, polygon) {
  const signs = polygon.map((vertex, index) => {
    const next = polygon[(index + 1) % polygon.length];
    return (point.x - next.x) * (vertex.y - next.y) -
      (vertex.x - next.x) * (point.y - next.y);
  });
  return !(
    signs.some(value => value < 0) && signs.some(value => value > 0)
  );
}

function distanceToSegment(point, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;
  const amount = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1,
    ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared
  ));
  return Math.hypot(
    point.x - (a.x + amount * dx),
    point.y - (a.y + amount * dy)
  );
}

function colorUnitAtPoint(point) {
  if (state.position === 1) {
    const hit = colorHitEdges
      .map(item => ({
        ...item,
        distance: distanceToSegment(point, item.a, item.b)
      }))
      .filter(item => item.distance <= 12)
      .sort((a, b) => a.distance - b.distance)[0];
    return hit?.unitIndex;
  }
  return [...colorHitFaces].reverse()
    .find(item => pointInPolygon(point, item.points))?.unitIndex;
}

function updateColorCursor(event) {
  if (event.pointerType === "touch") return;
  canvas.style.cursor = !drag &&
      colorUnitAtPoint(pointerPosition(event)) !== undefined
    ? "pointer"
    : "";
}

function colorFromClick(event) {
  if (!drag || (drag.button !== 0 && drag.button !== 2) ||
      event.pointerId !== drag.pointerId) return;
  const point = pointerPosition(event);
  if (Math.hypot(point.x - drag.startX, point.y - drag.startY) > 4) return;
  const unitIndex = colorUnitAtPoint(point);
  if (unitIndex === undefined) return;
  const colorIndex = COLORS.cycle.indexOf(state.colors[unitIndex]);
  const direction = drag.button === 0 ? 1 : -1;
  state.colors[unitIndex] = COLORS.cycle[
    (colorIndex + direction + COLORS.cycle.length) % COLORS.cycle.length
  ];
}

function startDrag(event) {
  if (event.button !== 0 && event.button !== 2) return;
  const point = pointerPosition(event);
  if (event.pointerType === "touch") {
    touchPoints.set(event.pointerId, point);
    canvas.setPointerCapture(event.pointerId);
    if (touchPoints.size === 2) {
      const [a, b] = [...touchPoints.values()];
      touchRoll = {
        pointerIds: [...touchPoints.keys()],
        startAngle: Math.atan2(b.y - a.y, b.x - a.x),
        startRotation: [...state.rotation]
      };
      drag = null;
      return;
    }
    if (touchPoints.size > 2) {
      drag = null;
      return;
    }
  }
  drag = {
    button: event.button,
    pointerId: event.pointerId,
    startX: point.x,
    startY: point.y,
    lastX: point.x,
    lastY: point.y,
    startRotation: [...state.rotation]
  };
  canvas.setPointerCapture(event.pointerId);
  draw();
}

function moveDrag(event) {
  if (event.pointerType === "touch" && touchPoints.has(event.pointerId)) {
    touchPoints.set(event.pointerId, pointerPosition(event));
    if (touchRoll) {
      const [a, b] = touchRoll.pointerIds.map(id => touchPoints.get(id));
      if (a && b) {
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const viewRoll = axisAngleQuaternion(
          0, 0, 1, touchRoll.startAngle - angle
        );
        state.rotation = normalizeQuaternion(
          multiplyQuaternions(viewRoll, touchRoll.startRotation)
        );
        draw();
      }
      return;
    }
  }
  if (!drag || event.pointerId !== drag.pointerId) return;
  const point = pointerPosition(event);
  const dx = point.x - drag.lastX;
  const dy = point.y - drag.lastY;
  if (drag.button === 0) {
    const distance = Math.hypot(dx, dy);
    if (distance > 0) {
      const viewRotation = axisAngleQuaternion(
        dy / distance, dx / distance, 0, distance * 0.01
      );
      state.rotation = normalizeQuaternion(
        multiplyQuaternions(viewRotation, state.rotation)
      );
    }
  } else {
    const rect = canvas.getBoundingClientRect();
    const originX = rect.width / 2;
    const originY = rect.height / 2;
    const start = Math.atan2(drag.startY - originY, drag.startX - originX);
    const current = Math.atan2(point.y - originY, point.x - originX);
    const viewRoll = axisAngleQuaternion(0, 0, 1, start - current);
    state.rotation = normalizeQuaternion(
      multiplyQuaternions(viewRoll, drag.startRotation)
    );
  }
  drag.lastX = point.x;
  drag.lastY = point.y;
  draw();
}

function endDrag(event) {
  if (event.pointerType === "touch") {
    const wasTouchRoll = touchRoll !== null;
    touchPoints.delete(event.pointerId);
    if (wasTouchRoll) {
      touchRoll = null;
      drag = null;
      saveState();
      draw();
      return;
    }
  }
  if (!drag || event.pointerId !== drag.pointerId) return;
  if (event.type !== "pointercancel") colorFromClick(event);
  drag = null;
  saveState();
  draw();
  updateColorCursor(event);
}

canvas.addEventListener("pointerdown", startDrag);
canvas.addEventListener("pointermove", updateColorCursor);
canvas.addEventListener("pointerleave", () => {
  canvas.style.cursor = "";
});
window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);
canvas.addEventListener("contextmenu", event => event.preventDefault());
clearColorsLink.addEventListener("click", event => {
  event.preventDefault();
  if (!window.confirm("Clear all face and edge colors?")) return;
  state.colors.fill(COLORS.cycle[0]);
  saveState();
  draw();
});
const snapPoints = [
  { value: 0, accessibleName: "snub dodecahedron" },
  { value: 50, accessibleName: "rhombicosidodecahedron" },
  { value: 100, accessibleName: "dodecahedron" }
];

function updateMorph() {
  const value = Number(modelInput.value);
  state.position = value / 100;
  const exact = snapPoints.find(point => point.value === value);
  canvas.setAttribute(
    "aria-label",
    exact
      ? `Interactive 3D ${exact.accessibleName}`
      : `Interactive 3D solid morph at ${value} percent`
  );
  saveState();
  draw();
}

modelInput.addEventListener("input", updateMorph);
modelInput.addEventListener("change", () => {
  const value = Number(modelInput.value);
  const closest = snapPoints.reduce((best, point) =>
    Math.abs(point.value - value) < Math.abs(best.value - value) ? point : best
  );
  if (Math.abs(closest.value - value) <= 12) {
    modelInput.value = closest.value;
  }
  updateMorph();
});
window.addEventListener("resize", draw);

updateMorph();
canvas.style.backgroundImage = "none";
drawingControls.hidden = false;
