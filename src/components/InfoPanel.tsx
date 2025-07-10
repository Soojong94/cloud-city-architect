
import React from 'react';
import { X } from 'lucide-react';

interface Project {
  title: string;
  description: string;
}

interface BuildingInfo {
  title: string;
  color: string;
  experience: string;
  projects: Project[];
  skills: string[];
}

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  buildingInfo: BuildingInfo | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ isOpen, onClose, buildingInfo }) => {
  if (!buildingInfo) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-500 ease-out w-full max-w-[500px] sm:w-[85%] md:w-[35%] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="h-full overflow-y-auto p-6 text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {buildingInfo.title}
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Colored divider */}
          <div 
            className="h-1 w-16 rounded mb-8"
            style={{ backgroundColor: buildingInfo.color }}
          />

          {/* Overview Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white/90">Overview</h2>
            <p className="text-white/80 leading-relaxed">
              {buildingInfo.experience}
            </p>
          </section>

          {/* Experience Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white/90">Experience & Expertise</h2>
            <p className="text-white/80 leading-relaxed">
              Extensive hands-on experience building scalable, secure, and cost-effective cloud solutions 
              for enterprises across various industries including finance, healthcare, and technology.
            </p>
          </section>

          {/* Key Projects */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white/90">Key Projects</h2>
            <div className="space-y-4">
              {buildingInfo.projects.map((project, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Technologies */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white/90">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {buildingInfo.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 hover:bg-white/20 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InfoPanel;
