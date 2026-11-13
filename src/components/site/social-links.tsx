"use client";

interface SocialLinkItem {
  id: string;
  name: string;
  href: string;
  hoverColor: string;
  svg: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com", // Placeholder: client can map custom profile link later
    hoverColor: "hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/10",
    svg: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://facebook.com", // Placeholder: client can map custom profile link later
    hoverColor: "hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10",
    svg: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    href: "https://twitter.com", // Placeholder: client can map custom profile link later
    hoverColor: "hover:border-gold-400 hover:text-gold-300 hover:bg-gold-500/10",
    svg: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com", // Placeholder: client can map custom profile link later
    hoverColor: "hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
    svg: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://youtube.com", // Placeholder: client can map custom profile link later
    hoverColor: "hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[#FF0000]/10",
    svg: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function SocialMediaLinks({
  className = "",
  iconSize = "h-4 w-4",
  buttonSize = "h-9 w-9",
}: {
  className?: string;
  iconSize?: string;
  buttonSize?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Follow AVRELLE AGRO on ${item.name} (Placeholder link)`}
          aria-label={`AVRELLE AGRO on ${item.name}`}
          className={`flex ${buttonSize} items-center justify-center rounded-lg border border-ivory-100/20 bg-forest-950/60 text-ivory-100/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.hoverColor}`}
        >
          {item.svg({ className: iconSize })}
        </a>
      ))}
    </div>
  );
}
