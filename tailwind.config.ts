
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				portfolio: {
					purple: '#8B5CF6',
					darkPurple: '#1E1B4B',
					lightGray: '#F5F5F5',
					mediumGray: '#6B7280',
					teal: '#0EA5E9',
					pink: '#EC4899',
					amber: '#F59E0B',
					emerald: '#10B981',
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
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(20px)'
					}
				},
				'blob-1': {
					'0%': { transform: 'translateY(-50px) rotate(0deg) scale(1)' },
					'50%': { transform: 'translateY(50px) rotate(180deg) scale(1.2)' },
					'100%': { transform: 'translateY(-50px) rotate(360deg) scale(1)' },
				},
				'blob-2': {
					'0%': { transform: 'translateX(-50px) rotate(0deg) scale(0.9)' },
					'50%': { transform: 'translateX(50px) rotate(-180deg) scale(1.1)' },
					'100%': { transform: 'translateX(-50px) rotate(-360deg) scale(0.9)' },
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
					'100%': { transform: 'translateY(0px)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'blob-1': 'blob-1 15s infinite linear alternate',
				'blob-2': 'blob-2 10s infinite linear alternate',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
			},
			backgroundImage: {
				'hero-pattern': "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070')",
				'about-pattern': "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070')",
				'experience-pattern': "url('https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070')",
				'skills-pattern': "url('https://images.unsplash.com/photo-1607743386760-88f10eb85a79?q=80&w=2070')",
				'projects-pattern': "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070')",
				'contact-pattern': "url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
