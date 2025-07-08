import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			calendar: {
  				background: 'hsl(var(--calendar-background))',
  				day: {
  					current: 'hsl(var(--calendar-day-current))',
  					other: 'hsl(var(--calendar-day-other))',
  					selected: 'hsl(var(--calendar-day-selected))',
  					hover: 'hsl(var(--calendar-day-hover))',
  					header: 'hsl(var(--calendar-day-header))'
  				},
  				counter: 'hsl(var(--calendar-counter) / <alpha>)'
  			},
  			slot: {
  				available: {
  					DEFAULT: 'hsl(var(--slot-available))',
  					border: 'hsl(var(--slot-available-border))',
  					hover: 'hsl(var(--slot-available-hover))'
  				},
  				occupied: {
  					DEFAULT: 'hsl(var(--slot-occupied))',
  					border: 'hsl(var(--slot-occupied-border))',
  					hover: 'hsl(var(--slot-occupied-hover))'
  				}
  			},
  			status: {
  				confirmed: {
  					DEFAULT: 'hsl(var(--status-confirmed))',
  					foreground: 'hsl(var(--status-confirmed-foreground))',
  					border: 'hsl(var(--status-confirmed-border))'
  				},
  				pending: {
  					DEFAULT: 'hsl(var(--status-pending))',
  					foreground: 'hsl(var(--status-pending-foreground))',
  					border: 'hsl(var(--status-pending-border))'
  				},
  				cancelled: {
  					DEFAULT: 'hsl(var(--status-cancelled))',
  					foreground: 'hsl(var(--status-cancelled-foreground))',
  					border: 'hsl(var(--status-cancelled-border))'
  				},
  				completed: {
  					DEFAULT: 'hsl(var(--status-completed))',
  					foreground: 'hsl(var(--status-completed-foreground))',
  					border: 'hsl(var(--status-completed-border))'
  				}
  			},
  			appointment: {
  				consultation: 'hsl(var(--appointment-consultation))',
  				followup: 'hsl(var(--appointment-followup))',
  				emergency: 'hsl(var(--appointment-emergency))',
  				specialized: 'hsl(var(--appointment-specialized))',
  				pediatric: 'hsl(var(--appointment-pediatric))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
