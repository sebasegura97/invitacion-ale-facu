// SpriteReveal.jsx
export default function SpriteReveal() {
  return (
    <div className="w-full px-4 mb-8">
      <div
        className="sprite mx-auto w-full max-w-[128px] aspect-square"
        style={
          {
            ["--frames"]: 19,
            ["--steps"]: 18, // frames - 1
          } as React.CSSProperties
        }
      />
      <style jsx>{`
        .sprite {
          background-image: url("/sprite.png");
          background-repeat: no-repeat;
          background-position: 100% 0; /* arranca en el borde derecho (último frame) */
          background-size: calc(var(--frames) * 100%) 100%; /* N frames en una fila */
          image-rendering: auto;
          backface-visibility: hidden;
          will-change: background-position;
          animation: spriteMoveRtl 1.5s steps(var(--steps)) forwards;
        }

        @keyframes spriteMoveRtl {
          from {
            background-position: 100% 0;
          } /* último frame (derecha) */
          to {
            background-position: 0% 0;
          } /* primer frame (izquierda, casa completa) */
        }
      `}</style>
    </div>
  );
}
