import React from 'react';
import svgPaths from '../../imports/svg-zoqzzslaep';

export type ViewType = 'view-home' | 'view-record' | 'view-tasks' | 'view-profile';

interface BottomNavProps {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
}

// Colors
const ACTIVE_COLOR = "#E6B7B3";
const INACTIVE_COLOR = "#D6D0CC";
const ACCENT_ORANGE = "#E8C9A8";
const ACCENT_ORANGE_2 = "#E8C9A8"; // For profile eyes

// Icon Components
function HomeIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[26px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 26">
        <g>
          <path d={svgPaths.p240d1980} stroke={ACCENT_ORANGE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58517" />
          <path d={svgPaths.p688cfd0} stroke={color} strokeLinecap="round" strokeWidth="1.625" />
        </g>
      </svg>
    </div>
  );
}

function RecordIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p136e2480} stroke={ACCENT_ORANGE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46324" />
          <path d={svgPaths.p31216100} stroke={color} strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function TasksIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <path d={svgPaths.p34c630c0} stroke={ACCENT_ORANGE} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46324" />
          <path d={svgPaths.p19f6ce50} stroke={color} strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative rounded-[inherit] size-[24px]">
        {/* Hair/Head */}
        <div className="absolute inset-[11.72%_7.61%_11.29%_8.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
            <path d={svgPaths.p185c5a00} fill={color} />
          </svg>
        </div>
        {/* Face Outline */}
        <div className="absolute inset-[32.37%_21.54%_13.42%_22.42%]">
           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13">
             <path d={svgPaths.pc533100} fill={color} />
           </svg>
        </div>
        {/* Eye L */}
        <div className="absolute inset-[53.57%_55.78%_39.06%_36.85%]">
           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d={svgPaths.p324bae80} fill={ACCENT_ORANGE_2} />
           </svg>
        </div>
        {/* Eye R */}
        <div className="absolute inset-[53.57%_35.99%_39.06%_56.64%]">
           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
             <path d={svgPaths.p151a91f0} fill={ACCENT_ORANGE_2} />
           </svg>
        </div>
      </div>
    </div>
  );
}

// Helper for Nav Button
interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ label, icon, isActive, onClick }: NavItemProps) {
  const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
  
  return (
    <button 
      onClick={onClick}
      className="basis-0 grow h-[67px] min-h-px min-w-px relative shrink-0 bg-transparent border-none p-0 cursor-pointer group"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[67px] items-center pb-[12px] pt-[10.8px] px-0 relative w-full">
        {/* Render Icon with correct color */}
        {/* Since we passed the component usage in parent, we might need to pass color down. 
            Actually, let's pass the component itself or render it here. 
            The icon prop is already an element, so we can't easily change props.
            Let's refactor usage.
        */}
        {icon}
        
        {/* Text */}
        <div className="h-[15px] relative shrink-0 w-[20px]">
           <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[20px]">
             <p 
               className="absolute font-['Inter','Noto_Sans_JP',sans-serif] font-medium leading-[15px] left-[10.5px] not-italic text-[10px] text-center text-nowrap top-[0.5px] tracking-[0.1172px] translate-x-[-50%] whitespace-pre transition-colors"
               style={{ color }}
             >
               {label}
             </p>
           </div>
        </div>
      </div>
    </button>
  );
}

export function BottomNav({ currentView, onChangeView }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white box-border content-stretch flex items-start justify-between pb-0 pt-px px-0 w-full shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div aria-hidden="true" className="absolute border-t border-[#E5DED9] inset-0 pointer-events-none" />
      
      <NavItem 
        label="首頁" 
        isActive={currentView === 'view-home'}
        onClick={() => onChangeView('view-home')}
        icon={<HomeIcon color={currentView === 'view-home' ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />
      
      <NavItem 
        label="紀錄" 
        isActive={currentView === 'view-record'}
        onClick={() => onChangeView('view-record')}
        icon={<RecordIcon color={currentView === 'view-record' ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />

      <NavItem 
        label="任務" 
        isActive={currentView === 'view-tasks'}
        onClick={() => onChangeView('view-tasks')}
        icon={<TasksIcon color={currentView === 'view-tasks' ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />

      <NavItem 
        label="我" 
        isActive={currentView === 'view-profile'}
        onClick={() => onChangeView('view-profile')}
        icon={<ProfileIcon color={currentView === 'view-profile' ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />
    </div>
  );
}
