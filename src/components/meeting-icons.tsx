
'use client';
import { cn } from "@/lib/utils";

// Google Meet Icon Component
export const GoogleMeetIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.49 14.16L15.36 15.1C15.75 15.32 16.25 15.17 16.46 14.78L17.7 12.33C17.91 11.94 17.77 11.44 17.38 11.23L15.51 10.29L15.48 10.27C15.09 10.06 14.59 10.2 14.38 10.59L13.49 12.21L13.49 14.16Z" fill="#00832D"></path>
    <path d="M13.49 9.84L14.38 11.46C14.59 11.85 15.09 12 15.48 11.78L15.51 11.76L17.38 10.72C17.77 10.51 17.91 10.01 17.7 9.62L16.46 7.17C16.25 6.78 15.75 6.63 15.36 6.85L13.49 7.89V9.84Z" fill="#0066DA"></path>
    <path d="M13.49 7.89V14.16L14.38 12.54C14.59 12.15 15.09 11.91 15.48 12.13L15.51 12.15L15.48 11.89L15.51 11.76C15.09 11.91 14.59 11.85 14.38 11.46L13.49 9.84V7.89Z" fill="#0066DA"></path>
    <path d="M8.2,12.01l-1.92,1.1c-0.4,0.22-0.89-0.03-1.1-0.43l-1.3-2.28c-0.22-0.4,0.03-0.89,0.43-1.1L6.23,8.2C6.63,7.98,7.12,8.23,7.34,8.63L8.2,10.16V12.01z" fill="#EA4335"></path>
    <path d="M13.49 7.89L11.62 6.85C11.23 6.63 10.73 6.78 10.52 7.17L9.28 9.62C9.07 10.01 9.21 10.51 9.6 10.72L11.47 11.76L11.49 11.78C11.88 12 12.38 11.85 12.59 11.46L13.49 9.84V7.89Z" fill="#FFBA00"></path>
    <path d="M13.49 7.89V9.84L12.59 11.46C12.38 11.85 11.88 12 11.49 11.78L11.47 11.76L9.6 10.72C9.21 10.51 9.07 10.01 9.28 9.62L10.52 7.17C10.73 6.78 11.23 6.63 11.62 6.85L13.49 7.89Z" fill="#FBCB0A"></path>
    <path d="M8.2 12.01V10.16L7.34 8.63C7.12 8.23 6.63 7.98 6.23 8.2L4.28 9.31C3.88 9.53 3.66 10.02 3.88 10.42L5.18 12.7C5.4 13.1 5.89 13.35 6.28 13.13L8.2 12.01Z" fill="#EA4335"></path>
  </svg>
);

// Microsoft Teams Icon Component
export const MicrosoftTeamsIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.33 21.06c-4.63 0-8.38-3.76-8.38-8.38S6.7 4.31, 11.33 4.31s8.38 3.76, 8.38 8.38-3.76 8.37-8.38 8.37Zm0-15.02c-3.66 0-6.63 2.97-6.63 6.63s2.97 6.63, 6.63 6.63, 6.63-2.97, 6.63-6.63-2.97-6.63-6.63-6.63Z" fill="#464EB8"></path>
    <path d="M22.05 16.89h-5.26V9.92h5.26v6.97Zm-1.75-1.75V11.67h-1.75v3.47h1.75Z" fill="#464EB8"></path>
    <path d="M12.92 12.7a.88.88 0 1 1-1.76 0 .88.88 0 0 1 1.76 0Z" fill="#50E6FF"></path>
    <path d="M9.82 12.7a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0Z" fill="#50E6FF"></path>
    <path d="M16.51 12.7a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0Z" fill="#9292E0"></path>
  </svg>
);

// Zoom Icon Component
export const ZoomIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    className={cn("h-5 w-5", className)}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20.57,0H3.43A3.43,3.43,0,0,0,0,3.43V20.57A3.43,3.43,0,0,0,3.43,24H20.57A3.43,3.43,0,0,0,24,20.57V3.43A3.43,3.43,0,0,0,20.57,0Z" fill="#2D8CFF"></path>
    <path d="M10,7.31a.83.83,0,0,1,.84.82v4.83a.83.83,0,0,1-.84.82H5.66a.83.83,0,0,1-.84-.82V8.13a.83.83,0,0,1,.84-.82Zm8.51,4.41L15.34,14V7l3.17,2.28a.83.83,0,0,1,.44.75v1.2a.83.83,0,0,1-.44.75Z" fill="#fff"></path>
  </svg>
);

// Cisco Webex Icon Component
export const CiscoWebexIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg 
        className={cn("h-5 w-5", className)}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="12" cy="12" r="10" fill="#00A8D3"></circle>
        <path d="M12 5.5C8.41 5.5 5.5 8.41 5.5 12C5.5 15.59 8.41 18.5 12 18.5C15.59 18.5 18.5 15.59 18.5 12C18.5 8.41 15.59 5.5 12 5.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="white"></path>
        <path d="M12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5C13.38 14.5 14.5 13.38 14.5 12C14.5 10.62 13.38 9.5 12 9.5Z" fill="#75C300"></path>
    </svg>
);

    