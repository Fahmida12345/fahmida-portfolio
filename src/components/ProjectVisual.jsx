import { cn } from '../lib/cn'

const FRAME = { width: 400, height: 250 }

function Chrome({ accent = false }) {
  const stroke = 'var(--c-line-2)'
  const fill = 'var(--c-surface-2)'
  const dot = accent ? 'var(--c-accent)' : 'var(--c-line-2)'

  return (
    <>
      <rect x="0" y="0" width={FRAME.width} height={FRAME.height} fill={fill} />
      <line x1="0" y1="28" x2={FRAME.width} y2="28" stroke={stroke} strokeWidth="1" />
      <circle cx="18" cy="14" r="3.2" fill={dot} opacity={accent ? 0.9 : 1} />
      <circle cx="30" cy="14" r="3.2" fill={stroke} />
      <circle cx="42" cy="14" r="3.2" fill={stroke} />
      <rect
        x="62"
        y="8"
        width="120"
        height="12"
        rx="6"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
      />
      <rect x="70" y="12.5" width="52" height="3" rx="1.5" fill={stroke} />
    </>
  )
}

const strokeProps = {
  fill: 'none',
  stroke: 'var(--c-line-2)',
  strokeWidth: 1,
  strokeLinecap: 'round',
}

function Storefront() {
  return (
    <>
      <Chrome accent />
      <g>
        <rect x="20" y="48" width="130" height="8" rx="4" fill="var(--c-accent)" opacity="0.85" />
        <rect x="20" y="64" width="88" height="5" rx="2.5" fill="var(--c-line-2)" />
        <rect x="20" y="82" width="46" height="14" rx="4" fill="none" {...strokeProps} />
        <rect x="74" y="82" width="46" height="14" rx="4" fill="none" {...strokeProps} />

        {[0, 1, 2].map((column) =>
          [0, 1].map((row) => (
            <g key={`${column}-${row}`}>
              <rect
                x={186 + column * 66}
                y={48 + row * 74}
                width="56"
                height="40"
                rx="6"
                fill="none"
                {...strokeProps}
              />
              <rect
                x={192 + column * 66}
                y={58 + row * 74}
                width="20"
                height="6"
                rx="3"
                fill="var(--c-line-2)"
              />
              <rect
                x={192 + column * 66}
                y={70 + row * 74}
                width="34"
                height="4"
                rx="2"
                fill="var(--c-line-2)"
                opacity="0.7"
              />
            </g>
          )),
        )}

        <rect x="20" y="118" width="104" height="5" rx="2.5" fill="var(--c-line-2)" />
        <rect x="20" y="132" width="82" height="5" rx="2.5" fill="var(--c-line-2)" opacity="0.7" />
        <rect
          x="20"
          y="152"
          width="150"
          height="34"
          rx="8"
          fill="none"
          {...strokeProps}
        />
        <rect x="32" y="167" width="60" height="5" rx="2.5" fill="var(--c-accent)" opacity="0.6" />
        <circle cx="152" cy="169" r="6" fill="none" stroke="var(--c-accent)" strokeWidth="1" />
        <path d="M156 173l5 5" stroke="var(--c-accent)" strokeWidth="1" strokeLinecap="round" />

        <rect
          x="186"
          y="196"
          width="190"
          height="34"
          rx="8"
          fill="var(--c-accent)"
          opacity="0.1"
          stroke="var(--c-accent)"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <rect x="204" y="211" width="72" height="5" rx="2.5" fill="var(--c-accent)" opacity="0.75" />
      </g>
    </>
  )
}

function Catalog() {
  return (
    <>
      <Chrome />
      <g>
        <rect x="20" y="46" width="96" height="7" rx="3.5" fill="var(--c-line-2)" />
        <rect x="20" y="66" width="360" height="1" fill="var(--c-line-2)" />

        {[0, 1, 2, 3].map((column) => (
          <g key={column}>
            <rect
              x={20 + column * 92}
              y="80"
              width="80"
              height="70"
              rx="8"
              fill="none"
              {...strokeProps}
            />
            <circle cx={60 + column * 92} cy="106" r="11" fill="var(--c-line-2)" opacity="0.5" />
            <rect x={32 + column * 92} y="126" width="46" height="5" rx="2.5" fill="var(--c-line-2)" />
            <rect
              x={32 + column * 92}
              y="138"
              width="30"
              height="4"
              rx="2"
              fill="var(--c-line-2)"
              opacity="0.6"
            />
          </g>
        ))}

        <rect x="20" y="168" width="360" height="52" rx="8" fill="none" {...strokeProps} />
        <rect x="36" y="184" width="70" height="6" rx="3" fill="var(--c-accent)" opacity="0.7" />
        <rect x="36" y="198" width="120" height="4" rx="2" fill="var(--c-line-2)" opacity="0.6" />
        <rect x="300" y="184" width="64" height="22" rx="6" fill="none" {...strokeProps} />
      </g>
    </>
  )
}

function Grid() {
  return (
    <>
      <Chrome />
      <g>
        <rect x="20" y="46" width="60" height="7" rx="3.5" fill="var(--c-line-2)" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((column) => (
            <rect
              key={`${row}-${column}`}
              x={20 + column * 92}
              y={68 + row * 58}
              width="80"
              height="46"
              rx="7"
              fill="none"
              {...strokeProps}
            />
          )),
        )}
        <rect x="20" y="46" width="0" height="0" />
        <rect x="292" y="46" width="88" height="7" rx="3.5" fill="var(--c-accent)" opacity="0.6" />
      </g>
    </>
  )
}

function Article() {
  return (
    <>
      <Chrome />
      <g>
        <rect x="20" y="46" width="150" height="9" rx="4.5" fill="var(--c-line-2)" />
        {[0, 1, 2, 3, 4, 5, 6].map((row) => (
          <rect
            key={row}
            x="20"
            y={72 + row * 16}
            width={row === 6 ? 96 : row % 3 === 2 ? 300 : 360}
            height="5"
            rx="2.5"
            fill="var(--c-line-2)"
            opacity={row === 6 ? 0.5 : 0.85}
          />
        ))}

        <rect x="20" y="196" width="360" height="1" fill="var(--c-line-2)" />
        {[0, 1].map((column) => (
          <g key={column}>
            <rect
              x={20 + column * 188}
              y="210"
              width="172"
              height="24"
              rx="7"
              fill="none"
              {...strokeProps}
            />
            <circle cx={40 + column * 188} cy="222" r="6" fill="var(--c-line-2)" opacity="0.5" />
            <rect x={54 + column * 188} y="219" width="52" height="4" rx="2" fill="var(--c-line-2)" />
          </g>
        ))}
      </g>
    </>
  )
}

function Search() {
  return (
    <>
      <Chrome />
      <g>
        <rect x="20" y="46" width="360" height="34" rx="10" fill="none" {...strokeProps} />
        <circle cx="44" cy="63" r="6" fill="none" stroke="var(--c-accent)" strokeWidth="1.2" />
        <path d="M48.5 67.5l5 5" stroke="var(--c-accent)" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="64" y="60" width="96" height="6" rx="3" fill="var(--c-line-2)" />

        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect
              x="20"
              y={100 + row * 44}
              width="360"
              height="34"
              rx="8"
              fill="none"
              {...strokeProps}
            />
            <rect
              x="32"
              y={110 + row * 44}
              width="52"
              height="14"
              rx="4"
              fill="var(--c-line-2)"
              opacity={row === 0 ? 0.55 : 0.35}
            />
            <rect x="98" y={113 + row * 44} width="120" height="5" rx="2.5" fill="var(--c-line-2)" />
            <rect
              x="98"
              y={124 + row * 44}
              width="80"
              height="4"
              rx="2"
              fill="var(--c-line-2)"
              opacity="0.55"
            />
            <rect
              x="330"
              y={112 + row * 44}
              width="38"
              height="10"
              rx="5"
              fill={row === 0 ? 'var(--c-accent)' : 'var(--c-line-2)'}
              opacity={row === 0 ? 0.7 : 0.4}
            />
          </g>
        ))}
      </g>
    </>
  )
}

const VARIANTS = {
  storefront: Storefront,
  catalog: Catalog,
  grid: Grid,
  article: Article,
  search: Search,
}

/**
 * Lightweight schematic thumbnails. These are drawn interface wireframes rather
 * than screenshots, so nothing on a card implies a capture that does not exist.
 */
export function ProjectVisual({ variant = 'storefront', accent = false, className, title }) {
  const Variant = VARIANTS[variant] ?? Storefront

  return (
    <svg
      viewBox={`0 0 ${FRAME.width} ${FRAME.height}`}
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title ? `${title} interface preview` : 'Project interface preview'}
    >
      <Variant accent={accent} />
    </svg>
  )
}