import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

// ── helpers ──────────────────────────────────────────────────────────────────

/** Map a MotionValue that is already 0-1 to a sub-range */
function sub(v: MotionValue<number>, from: number, to: number) {
  return useTransform(v, [from, to], [0, 1], { clamp: true });
}

// ── stage label pill ──────────────────────────────────────────────────────────
function StagePill({
  number,
  title,
  sub: subtitle,
  progress,
  accent,
}: {
  number: string;
  title: string;
  sub: string;
  progress: MotionValue<number>;
  accent?: boolean;
}) {
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.18, 1, 1, 0.35]);
  const y = useTransform(progress, [0, 0.15], [10, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex items-center gap-3"
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
          accent
            ? 'bg-studio-accent text-white'
            : 'bg-studio-ink/10 text-studio-ink/60'
        }`}
      >
        {number}
      </div>
      <div>
        <p className={`text-xs font-bold uppercase tracking-widest ${accent ? 'text-studio-accent' : 'text-studio-ink/70'}`}>
          {title}
        </p>
        <p className="text-[10px] font-mono text-studio-ink/35 uppercase tracking-wider leading-none mt-0.5">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

// ── four-pointed star helper ──────────────────────────────────────────────────
function StarPath({ x, y, r }: { x: number; y: number; r: number }) {
  const s = r * 0.35;
  return (
    <path
      d={`M${x},${y - r} L${x + s},${y - s} L${x + r},${y} L${x + s},${y + s} L${x},${y + r} L${x - s},${y + s} L${x - r},${y} L${x - s},${y - s}Z`}
    />
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function DrawingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Per-stage progress (0 → 1)
  const p1 = sub(scrollYProgress, 0.00, 0.28); // sketch
  const p2 = sub(scrollYProgress, 0.22, 0.54); // outline
  const p3 = sub(scrollYProgress, 0.48, 0.78); // color
  const p4 = sub(scrollYProgress, 0.73, 1.00); // final / sparkles

  // Blush fills at half opacity
  const blushOpacity = useTransform(p3, [0, 1], [0, 0.45]);

  // Brush paint streak color appears in stage 4
  const brushStrokeOpacity = useTransform(p4, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '280vh' }}
    >
      {/* ── sticky canvas ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-studio-bg paper-texture flex flex-col">

        {/* header row */}
        <div className="pt-24 pb-4 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-2 block"
            >
              Behind the Canvas
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none"
            >
              Watch the <span className="text-studio-accent">Magic</span> Happen
            </motion.h2>
          </div>

          {/* stage pills */}
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <StagePill number="1" title="Concept"  sub="Rough Sketch" progress={p1} />
            <StagePill number="2" title="Line Art"  sub="Clean Outline" progress={p2} />
            <StagePill number="3" title="Color"     sub="Fill & Shade"  progress={p3} accent />
            <StagePill number="4" title="Final Art" sub="Complete ✦"    progress={p4} accent />
          </div>
        </div>

        {/* ── SVG drawing area ── */}
        <div className="flex-1 flex items-center justify-center px-4">
          <svg
            viewBox="0 0 420 470"
            className="w-full max-w-[360px] md:max-w-[440px] lg:max-w-[520px] h-auto"
            style={{ filter: 'drop-shadow(0 16px 48px rgba(44,36,33,0.10))' }}
          >

            {/* ═══════════════════════════════════════════════
                STAGE 1 — ROUGH SKETCH
                Light, slightly translucent construction lines
            ═══════════════════════════════════════════════ */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.45}>
              {/* Head guide circle */}
              <motion.circle
                cx="210" cy="155" r="86"
                stroke="#a07850" strokeWidth="1.5" strokeDasharray="9 7"
                style={{ pathLength: p1 }}
              />
              {/* Cross guides */}
              <motion.line x1="120" y1="155" x2="300" y2="155"
                stroke="#a07850" strokeWidth="1" strokeDasharray="6 5"
                style={{ pathLength: p1 }}
              />
              <motion.line x1="210" y1="65" x2="210" y2="245"
                stroke="#a07850" strokeWidth="1" strokeDasharray="6 5"
                style={{ pathLength: p1 }}
              />
              {/* Body oval */}
              <motion.ellipse cx="210" cy="335" rx="68" ry="82"
                stroke="#a07850" strokeWidth="1.5" strokeDasharray="8 6"
                style={{ pathLength: p1 }}
              />
              {/* Arm guides */}
              <motion.line x1="142" y1="280" x2="88"  y2="348"
                stroke="#a07850" strokeWidth="1.5" strokeDasharray="6 5"
                style={{ pathLength: p1 }}
              />
              <motion.line x1="278" y1="280" x2="336" y2="348"
                stroke="#a07850" strokeWidth="1.5" strokeDasharray="6 5"
                style={{ pathLength: p1 }}
              />
              {/* Leg guides */}
              <motion.line x1="180" y1="360" x2="175" y2="440"
                stroke="#a07850" strokeWidth="1.2" strokeDasharray="5 4"
                style={{ pathLength: p1 }}
              />
              <motion.line x1="240" y1="360" x2="245" y2="440"
                stroke="#a07850" strokeWidth="1.2" strokeDasharray="5 4"
                style={{ pathLength: p1 }}
              />
            </g>

            {/* ═══════════════════════════════════════════════
                STAGE 2 — CLEAN OUTLINE
                Crisp ink strokes, dark ink color
            ═══════════════════════════════════════════════ */}
            <g fill="none" stroke="#2c2421" strokeLinecap="round" strokeLinejoin="round">
              {/* Head shape */}
              <motion.path d="M 138,155 C 138,108 168,72 210,72 C 252,72 282,108 282,155 C 282,202 252,238 210,238 C 168,238 138,202 138,155 Z"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              {/* Hair arc */}
              <motion.path d="M 140,138 C 138,100 160,68 210,66 C 260,64 282,100 280,138"
                strokeWidth="3.2" style={{ pathLength: p2 }} />
              {/* Hair tufts */}
              <motion.path d="M 162,75 C 156,58 166,50 175,58 C 179,63 176,70 169,74"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              <motion.path d="M 258,75 C 264,58 254,50 245,58 C 241,63 244,70 251,74"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Ears */}
              <motion.path d="M 139,148 C 126,148 120,165 129,175 C 135,181 141,174 139,163"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              <motion.path d="M 281,148 C 294,148 300,165 291,175 C 285,181 279,174 281,163"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Left eye */}
              <motion.path d="M 175,148 C 175,137 186,131 194,135 C 202,139 202,152 194,156 C 186,160 175,158 175,148 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Right eye */}
              <motion.path d="M 222,148 C 222,137 233,131 241,135 C 249,139 249,152 241,156 C 233,160 222,158 222,148 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Eyebrows */}
              <motion.path d="M 173,128 C 180,123 190,121 198,124"
                strokeWidth="2" strokeLinecap="round" style={{ pathLength: p2 }} />
              <motion.path d="M 218,124 C 226,121 236,123 244,128"
                strokeWidth="2" strokeLinecap="round" style={{ pathLength: p2 }} />
              {/* Nose */}
              <motion.path d="M 206,174 C 206,180 210,182 214,180 C 218,178 218,172 214,172"
                strokeWidth="1.8" style={{ pathLength: p2 }} />
              {/* Smile */}
              <motion.path d="M 188,198 C 196,208 224,208 232,198"
                strokeWidth="2.8" strokeLinecap="round" style={{ pathLength: p2 }} />
              {/* Neck */}
              <motion.path d="M 196,236 L 194,256  M 224,236 L 226,256"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Shirt / body */}
              <motion.path d="M 166,256 C 146,252 128,263 122,285 L 110,365 L 310,365 L 298,285 C 292,263 274,252 254,256 Z"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              {/* Collar */}
              <motion.path d="M 188,258 C 196,268 224,268 232,258"
                strokeWidth="2.2" strokeLinecap="round" style={{ pathLength: p2 }} />
              {/* Center seam */}
              <motion.path d="M 210,258 L 210,328"
                strokeWidth="1.6" strokeDasharray="4 3" style={{ pathLength: p2 }} />
              {/* Left arm */}
              <motion.path d="M 122,278 C 100,292 84,316 80,344 C 78,358 84,370 96,370"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              {/* Right arm */}
              <motion.path d="M 298,278 C 320,292 336,316 340,344 C 342,358 336,372 324,372"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              {/* Left hand */}
              <motion.path d="M 92,368 C 83,362 82,348 93,344 C 104,340 112,348 108,360 C 105,368 96,372 92,368 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Right hand */}
              <motion.path d="M 328,370 C 319,364 318,350 329,346 C 340,342 348,350 344,362 C 341,370 332,374 328,370 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              {/* Paintbrush handle */}
              <motion.path d="M 336,362 L 392,278"
                strokeWidth="3.2" strokeLinecap="round" style={{ pathLength: p2 }} />
              {/* Brush ferrule */}
              <motion.path d="M 386,284 L 398,280 L 392,272"
                strokeWidth="2" style={{ pathLength: p2 }} />
              {/* Legs */}
              <motion.path d="M 154,363 L 148,442 L 192,442 L 194,363"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              <motion.path d="M 226,363 L 228,442 L 272,442 L 266,363"
                strokeWidth="2.8" style={{ pathLength: p2 }} />
              {/* Shoes */}
              <motion.path d="M 140,440 C 130,440 124,450 130,458 L 196,458 C 202,450 198,440 190,440 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
              <motion.path d="M 228,440 C 224,450 226,458 232,458 L 278,458 C 284,450 280,440 272,440 Z"
                strokeWidth="2.2" style={{ pathLength: p2 }} />
            </g>

            {/* ═══════════════════════════════════════════════
                STAGE 3 — COLOR FILLS (fillOpacity animated)
            ═══════════════════════════════════════════════ */}
            {/* Skin: head */}
            <motion.path
              d="M 138,155 C 138,108 168,72 210,72 C 252,72 282,108 282,155 C 282,202 252,238 210,238 C 168,238 138,202 138,155 Z"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }}
            />
            {/* Skin: ears */}
            <motion.path d="M 139,148 C 126,148 120,165 129,175 C 135,181 141,174 139,163 Z"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }} />
            <motion.path d="M 281,148 C 294,148 300,165 291,175 C 285,181 279,174 281,163 Z"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Skin: hands */}
            <motion.path d="M 92,368 C 83,362 82,348 93,344 C 104,340 112,348 108,360 C 105,368 96,372 92,368 Z"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }} />
            <motion.path d="M 328,370 C 319,364 318,350 329,346 C 340,342 348,350 344,362 C 341,370 332,374 328,370 Z"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Skin: neck */}
            <motion.rect x="193" y="236" width="34" height="23"
              fill="#FDDBB4" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Hair */}
            <motion.path
              d="M 138,155 C 138,108 168,72 210,72 C 252,72 282,108 282,140 L 282,125 C 278,88 252,64 210,64 C 168,64 142,88 138,125 Z"
              fill="#6B3A2A" stroke="none" style={{ fillOpacity: p3 }}
            />
            {/* Shirt teal */}
            <motion.path
              d="M 166,256 C 146,252 128,263 122,285 L 110,365 L 310,365 L 298,285 C 292,263 274,252 254,256 Z"
              fill="#1a9391" stroke="none" style={{ fillOpacity: p3 }}
            />
            {/* Sleeve teal (left) */}
            <motion.path
              d="M 122,278 C 100,292 84,316 80,344 C 78,358 84,370 96,370 L 96,362 C 87,362 84,354 86,344 C 90,320 104,298 124,285 Z"
              fill="#1a9391" stroke="none" style={{ fillOpacity: p3 }}
            />
            {/* Sleeve teal (right) */}
            <motion.path
              d="M 298,278 C 320,292 336,316 340,344 C 342,358 336,372 324,372 L 324,364 C 333,364 336,356 334,344 C 330,320 316,298 296,285 Z"
              fill="#1a9391" stroke="none" style={{ fillOpacity: p3 }}
            />
            {/* Pants */}
            <motion.path d="M 154,363 L 148,442 L 192,442 L 194,363 Z"
              fill="#2c2421" stroke="none" style={{ fillOpacity: p3 }} />
            <motion.path d="M 226,363 L 228,442 L 272,442 L 266,363 Z"
              fill="#2c2421" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Shoes */}
            <motion.path d="M 140,440 C 130,440 124,450 130,458 L 196,458 C 202,450 198,440 190,440 Z"
              fill="#1a1a2e" stroke="none" style={{ fillOpacity: p3 }} />
            <motion.path d="M 228,440 C 224,450 226,458 232,458 L 278,458 C 284,450 280,440 272,440 Z"
              fill="#1a1a2e" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Eye whites */}
            <motion.path d="M 175,148 C 175,137 186,131 194,135 C 202,139 202,152 194,156 C 186,160 175,158 175,148 Z"
              fill="white" stroke="none" style={{ fillOpacity: p3 }} />
            <motion.path d="M 222,148 C 222,137 233,131 241,135 C 249,139 249,152 241,156 C 233,160 222,158 222,148 Z"
              fill="white" stroke="none" style={{ fillOpacity: p3 }} />
            {/* Pupils */}
            <motion.circle cx="188" cy="147" r="5.5" fill="#2c2421" stroke="none"
              style={{ fillOpacity: p3 }} />
            <motion.circle cx="235" cy="147" r="5.5" fill="#2c2421" stroke="none"
              style={{ fillOpacity: p3 }} />
            {/* Blush cheeks */}
            <motion.circle cx="162" cy="188" r="13" fill="#FFB3B3" stroke="none"
              style={{ fillOpacity: blushOpacity }} />
            <motion.circle cx="258" cy="188" r="13" fill="#FFB3B3" stroke="none"
              style={{ fillOpacity: blushOpacity }} />
            {/* Paintbrush wood */}
            <motion.line x1="336" y1="362" x2="392" y2="278"
              stroke="#C19A6B" strokeWidth="3.2" strokeLinecap="round"
              style={{ opacity: p3 }} />
            {/* Bristle paint (teal) */}
            <motion.path
              d="M 386,284 C 383,274 390,268 395,275 C 400,282 397,289 392,278"
              fill="#1a9391" stroke="none" style={{ fillOpacity: p3 }} />

            {/* ═══════════════════════════════════════════════
                STAGE 4 — FINAL: SPARKLES + HIGHLIGHTS
            ═══════════════════════════════════════════════ */}
            {/* Eye highlights */}
            <motion.circle cx="191" cy="143" r="2.5" fill="white" stroke="none"
              style={{ fillOpacity: p4 }} />
            <motion.circle cx="238" cy="143" r="2.5" fill="white" stroke="none"
              style={{ fillOpacity: p4 }} />

            {/* Sparkle stars — teal */}
            {[
              { x: 56,  y: 95,  r: 12 },
              { x: 370, y: 88,  r: 9  },
              { x: 46,  y: 215, r: 7  },
              { x: 376, y: 210, r: 11 },
              { x: 108, y: 44,  r: 8  },
              { x: 320, y: 40,  r: 10 },
              { x: 88,  y: 400, r: 6  },
              { x: 342, y: 395, r: 8  },
            ].map((s, i) => (
              <motion.g key={i} fill="#1a9391" style={{ opacity: p4 }}>
                <StarPath x={s.x} y={s.y} r={s.r} />
              </motion.g>
            ))}

            {/* Tiny dot sparkles — accent */}
            {[
              { x: 72,  y: 130 },
              { x: 354, y: 125 },
              { x: 68,  y: 260 },
              { x: 360, y: 268 },
            ].map((d, i) => (
              <motion.circle key={i} cx={d.x} cy={d.y} r="3.5"
                fill="#1a9391" opacity="0.5"
                style={{ scale: p4, transformOrigin: `${d.x}px ${d.y}px` }}
              />
            ))}

            {/* Paint streak from brush — final touch */}
            <motion.path
              d="M 368,270 C 372,258 382,252 388,262 C 394,272 390,282 384,278"
              stroke="#1a9391" strokeWidth="2.5" fill="none" strokeLinecap="round"
              style={{ pathLength: p4, opacity: brushStrokeOpacity }}
            />

            {/* Ink re-draw on top of fills (keeps outline crisp) */}
            <g fill="none" stroke="#2c2421" strokeLinecap="round" strokeLinejoin="round">
              <motion.path d="M 138,155 C 138,108 168,72 210,72 C 252,72 282,108 282,155 C 282,202 252,238 210,238 C 168,238 138,202 138,155 Z"
                strokeWidth="2.6" style={{ opacity: p3 }} />
              <motion.path d="M 166,256 C 146,252 128,263 122,285 L 110,365 L 310,365 L 298,285 C 292,263 274,252 254,256 Z"
                strokeWidth="2.6" style={{ opacity: p3 }} />
            </g>

          </svg>
        </div>

        {/* Scroll progress bar at bottom */}
        <div className="shrink-0 px-6 md:px-12 lg:px-24 pb-6 flex items-center gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-studio-ink/30">
            Scroll to draw
          </span>
          <div className="flex-1 h-px bg-studio-ink/8 relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-studio-accent origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <motion.span
            className="text-[10px] font-mono uppercase tracking-widest text-studio-accent"
            style={{
              opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]),
            }}
          >
            Final Art ✦
          </motion.span>
        </div>
      </div>
    </section>
  );
}
