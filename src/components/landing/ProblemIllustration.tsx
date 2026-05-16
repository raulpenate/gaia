export function ProblemIllustration() {
  return (
    <svg
      className="h-auto w-full max-w-[400px]"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Weather app (faded) */}
      <g opacity="0.5">
        <rect
          x="10"
          y="20"
          width="170"
          height="200"
          rx="12"
          fill="white"
          stroke="#ddd"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="20"
          width="170"
          height="40"
          rx="12"
          fill="#e8f4f8"
        />
        <text
          x="95"
          y="50"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          Weather
        </text>
        <circle cx="95" cy="100" r="30" fill="#87ceeb" opacity="0.6" />
        <text
          x="95"
          y="160"
          textAnchor="middle"
          fontSize="12"
          fill="#666"
        >
          {"Looks up ↑"}
        </text>
      </g>

      {/* Arrow */}
      <text x="200" y="130" textAnchor="middle" fontSize="32" fill="#999">
        →
      </text>

      {/* SoilMedic (vibrant) */}
      <g>
        <rect
          x="220"
          y="20"
          width="170"
          height="200"
          rx="12"
          fill="white"
          stroke="#3dba6f"
          strokeWidth="2"
        />
        <rect
          x="220"
          y="20"
          width="170"
          height="40"
          rx="12"
          fill="#3dba6f"
        />
        <text
          x="305"
          y="50"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="white"
        >
          SoilMedic
        </text>

        {/* Soil layers */}
        <rect x="230" y="70" width="150" height="12" fill="#a89d95" />
        <rect x="230" y="82" width="150" height="12" fill="#7a6a5a" />
        <rect x="230" y="94" width="150" height="12" fill="#5a4a3a" />
        <rect x="230" y="106" width="150" height="12" fill="#3a2a1a" />

        <text
          x="305"
          y="155"
          textAnchor="middle"
          fontSize="12"
          fill="#3dba6f"
          fontWeight="bold"
        >
          Healthy
        </text>
        <text
          x="305"
          y="175"
          textAnchor="middle"
          fontSize="11"
          fill="#666"
        >
          {"Looks down ↓"}
        </text>
      </g>
    </svg>
  );
}
