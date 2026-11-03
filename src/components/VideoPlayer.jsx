import { useEffect, useRef, useState } from "react";
import { Headset, LoaderCircle, X } from "lucide-react";

function createSphereMesh(latitudeSegments = 48, longitudeSegments = 64) {
  const vertices = [];
  for (let latitude = 0; latitude < latitudeSegments; latitude += 1) {
    for (let longitude = 0; longitude < longitudeSegments; longitude += 1) {
      const points = [
        [latitude, longitude],
        [latitude + 1, longitude],
        [latitude + 1, longitude + 1],
        [latitude, longitude],
        [latitude + 1, longitude + 1],
        [latitude, longitude + 1],
      ];
      for (const [row, column] of points) {
        const lat = Math.PI / 2 - (row / latitudeSegments) * Math.PI;
        const lon = (column / longitudeSegments) * Math.PI * 2 - Math.PI;
        vertices.push(
          Math.cos(lat) * Math.sin(lon) * 10,
          Math.sin(lat) * 10,
          -Math.cos(lat) * Math.cos(lon) * 10,
          column / longitudeSegments,
          row / latitudeSegments
        );
      }
    }
  }
  return new Float32Array(vertices);
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Impossible de préparer le lecteur VR.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || "Impossible de préparer le lecteur VR.");
  }
  return shader;
}

function createRenderer(gl) {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    `attribute vec3 aPosition;
     attribute vec2 aUv;
     uniform mat4 uProjection;
     uniform mat4 uView;
     varying vec2 vUv;
     void main() {
       vUv = aUv;
       gl_Position = uProjection * uView * vec4(aPosition, 1.0);
     }`
  );
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    `precision mediump float;
     uniform sampler2D uVideo;
     varying vec2 vUv;
     void main() {
       gl_FragColor = texture2D(uVideo, vUv);
     }`
  );
  const program = gl.createProgram();
  if (!program) throw new Error("Impossible de préparer le lecteur VR.");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "Impossible de préparer le lecteur VR.");
  }

  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!buffer || !texture) throw new Error("Impossible de préparer le lecteur VR.");
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, createSphereMesh(), gl.STATIC_DRAW);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  return {
    program,
    buffer,
    texture,
    position: gl.getAttribLocation(program, "aPosition"),
    uv: gl.getAttribLocation(program, "aUv"),
    projection: gl.getUniformLocation(program, "uProjection"),
    view: gl.getUniformLocation(program, "uView"),
    video: gl.getUniformLocation(program, "uVideo"),
  };
}

export default function VideoPlayer({ title, videoUrl, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const sessionRef = useRef(null);
  const [vrSupported, setVrSupported] = useState(false);
  const [startingVr, setStartingVr] = useState(false);
  const [vrError, setVrError] = useState("");

  useEffect(() => {
    let active = true;
    const xr = navigator.xr;
    if (xr && window.isSecureContext) {
      xr.isSessionSupported("immersive-vr")
        .then((supported) => {
          if (active) setVrSupported(supported);
        })
        .catch((error) => {
          console.error("Unable to check immersive VR support.", error);
          if (active) setVrError("Impossible de vérifier la compatibilité VR de ce navigateur.");
        });
    }
    return () => {
      active = false;
      if (sessionRef.current) sessionRef.current.end();
    };
  }, []);

  async function enterVr() {
    setVrError("");
    setStartingVr(true);
    let session;
    try {
      if (!navigator.xr || !window.isSecureContext) {
        throw new Error("Le mode VR nécessite un navigateur compatible et une connexion HTTPS.");
      }
      if (!(await navigator.xr.isSessionSupported("immersive-vr"))) {
        throw new Error("Ce navigateur ou cet appareil ne prend pas en charge la VR immersive.");
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const gl = canvas?.getContext("webgl", { xrCompatible: true });
      if (!video || !canvas || !gl) throw new Error("Le lecteur VR n'a pas pu démarrer.");

      await video.play();
      session = await navigator.xr.requestSession("immersive-vr");
      await gl.makeXRCompatible();
      const layer = new XRWebGLLayer(session, gl);
      session.updateRenderState({ baseLayer: layer });
      const referenceSpace = await session.requestReferenceSpace("local");
      const renderer = createRenderer(gl);
      sessionRef.current = session;
      session.addEventListener("end", () => {
        sessionRef.current = null;
        setStartingVr(false);
      }, { once: true });

      const frame = (time, xrFrame) => {
        session.requestAnimationFrame(frame);
        const activeSession = xrFrame.session;
        const activeLayer = activeSession.renderState.baseLayer;
        const pose = xrFrame.getViewerPose(referenceSpace);
        if (!pose) return;
        gl.bindFramebuffer(gl.FRAMEBUFFER, activeLayer.framebuffer);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(renderer.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, renderer.buffer);
        gl.enableVertexAttribArray(renderer.position);
        gl.vertexAttribPointer(renderer.position, 3, gl.FLOAT, false, 20, 0);
        gl.enableVertexAttribArray(renderer.uv);
        gl.vertexAttribPointer(renderer.uv, 2, gl.FLOAT, false, 20, 12);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, renderer.texture);
        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }
        gl.uniform1i(renderer.video, 0);
        for (const view of pose.views) {
          const viewport = activeLayer.getViewport(view);
          gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
          gl.uniformMatrix4fv(renderer.projection, false, view.projectionMatrix);
          gl.uniformMatrix4fv(renderer.view, false, view.transform.inverse.matrix);
          gl.drawArrays(gl.TRIANGLES, 0, 48 * 64 * 6);
        }
      };
      session.requestAnimationFrame(frame);
    } catch (error) {
      console.error("Unable to start immersive video playback.", error);
      setVrError(error.message || "Impossible de démarrer la lecture VR.");
      setStartingVr(false);
      if (session) await session.end();
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <section className="w-full max-w-5xl rounded-3xl bg-white p-4 md:p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl text-navy">{title}</h2>
            <p className="text-xs text-navy/55 mt-1">Lecture vidéo et mode immersif 360°</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-royal/10 text-navy" aria-label="Fermer le lecteur">
            <X size={20} />
          </button>
        </div>
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          playsInline
          className="w-full max-h-[65vh] rounded-2xl bg-black"
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <p className="text-xs text-navy/55">
            Le mode casque est destiné aux vidéos 360° au format équirectangulaire.
          </p>
          <button
            type="button"
            onClick={enterVr}
            disabled={!vrSupported || startingVr}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-royal to-lavender text-white disabled:opacity-45 disabled:cursor-not-allowed"
          >
            {startingVr ? <LoaderCircle size={16} className="animate-spin" /> : <Headset size={16} />}
            {startingVr ? "Connexion au casque…" : "Regarder avec un casque VR"}
          </button>
        </div>
        {vrError && <p role="alert" className="text-xs text-terracotta mt-3">{vrError}</p>}
        {!vrSupported && !vrError && (
          <p className="text-xs text-navy/45 mt-3">
            La lecture classique est disponible. La VR nécessite un navigateur compatible, un casque et une connexion HTTPS.
          </p>
        )}
      </section>
    </div>
  );
}
